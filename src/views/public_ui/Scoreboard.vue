<template>
  <div class="scoreboard" @keydown.space="timer">
    <teamBlock location="home" v-model="home_team_slug" :score="home_score" :timeouts="home_timeouts"
      :bonus="away_fouls >= gameRules.fouls_bonus" :bonusPlus="home_fouls >= gameRules.fouls_double_bonus"
      :possession="nextPossession === 'home'"></teamBlock>

    <div class="gameStats">
      <div class="timeBlock">
        <div class="timeRemaining" :class="{ hidden: isHidden }">
          {{ time_remaining }}
          <!-- <template v-if="time_remaining.minutes !== 0">{{ time_remaining.minutes }}:</template>{{
            displaySeconds(time_remaining.seconds)
          }}<template v-if="time_remaining.minutes === 0">.{{ time_remaining.tenth_seconds }}</template> -->
        </div>
        <div class="period" v-if="!final && !half">{{ period }}</div>
        <div class="period" v-if="!final && half">Half</div>
        <div class="period" v-if="final">Final</div>

        <img class="logo_mhac" src="/static/color-team-logos/mhaclogo.png"
          alt="Midsouth Home School Athletic Conference Logo" />
      </div>
    </div>
    <teamBlock location="away" v-model="away_team_slug" :score="away_score" :timeouts="away_timeouts"
      :bonus="away_fouls >= gameRules.fouls_bonus" :bonusPlus="away_fouls >= gameRules.fouls_double_bonus"
      :possession="nextPossession === 'away'"></teamBlock>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import team from '@/components/front-pages/live_video/scoreboard/team';
const teamBlock = team;
const store = useStore();

// Reactive data
const isKeyDown = ref(false);
const keys = ref([]);
const time_remaining = ref({
  minutes: 8,
  seconds: 0,
  tenth_seconds: 0
});
let connection = null;


const getNumberWithOrdinal = (n) => {
  if (n <= 4) {
    var s = ['th', 'st', 'nd', 'rd'];
    var v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  } else {
    return `OT ${n - 4}`;
  }
};

// Computed properties
const away_team_slug = () => {
  if (store.state.scoreController.away_team_slug) {
    return store.state.scoreController.away_team_slug
  }
  return 'tennessee_heat'
};
const home_team_slug = () => {
  if (store.state.scoreController.home_team_slug) {
    return store.state.scoreController.home_team_slug
  }
  return 'nasvhille_central_christian'
};
const away_fouls = () => store.state.scoreController.fouls.away;
const away_score = () => store.state.scoreController.score.away;
const home_fouls = () => store.state.scoreController.fouls.home;
const homeScore = () => store.state.scoreController.score.home;
const homeTimeouts = () => store.state.scoreController.timeouts.home;
const awayTimeouts = () => store.state.scoreController.timeouts.away;
const period = () => getNumberWithOrdinal(store.state.scoreController.period);
const nextPossession = () => store.state.scoreController.possession;
const timerRunning = () => store.state.scoreController.clock.running;
const webSocketURL = () => store.getters.getWebsocket;
const half = () => store.state.scoreController.half;
const final = () => store.state.scoreController.final;
const gameRules = () => store.getters.getGameConfig;

// Watchers
watch(gameRules, (newValue) => {
  homeTimeouts.value = newValue.timeouts;
  awayTimeouts.value = newValue.timeouts;
  timeRemaining.value = newValue.time;
}, { deep: true });

watch(period, () => {
  timeRemaining.value = {
    minutes: 0,
    seconds: 0,
    hundreds_seconds: 100
  };
  if (getNumberWithOrdinal(store.state.scoreController.period).includes('OT')) {
    timeRemaining.value = gameRules.value.overtime;
  } else {
    timeRemaining.value = gameRules.value.time;
  }
  callStore({
    action: 'setTime',
    value: timeRemaining.value
  });
  if (getNumberWithOrdinal(store.state.scoreController.period) === 'OT 1') {
    const data = {
      action: 'resetFouls',
      value: gameRules.value.bonus_fouls
    };
    callStore(data);
  }
}, { deep: true });

watch(half, (newValue) => {
  if (newValue === true) {
    const data = {
      action: 'resetFouls',
      value: gameRules.value.bonus_fouls
    };
    callStore(data);
  }
}, { deep: true });

watch(timerRunning, () => {
  timer();
}, { deep: true });

watch(webSocketURL, () => {
  connectWebSocket();
});

// Event listeners
window.addEventListener('keydown', (event) => {
  isKeyDown.value = true;
  keys.value.push(event.code);
  if (event.code === 'Space') {
    timer();
  }
  if (['Numpad1', 'NumpadAdd'].every(v => keys.value.includes(v))) {
    homeScore.value += keys.value.filter(key => key === 'Numpad1').length;
  }
  if (['Numpad1', 'NumpadSubtract'].every(v => keys.value.includes(v))) {
    if (homeScore.value > 0) {
      homeScore.value -= 1;
    }
  }
});

window.addEventListener('keyup', () => {
  isKeyDown.value = false;
  keys.value.length = 0;
});

// Methods
const connectWebSocket = () => {
  console.log('Starting connection to WebSocket Server', store.getters.getWebsocket);
  connection = new WebSocket(store.getters.getWebsocket);
  connection.onmessage = (event) => messageReceived(event);
};



const callStore = (data) => {
  store.dispatch(data.action, data.value);
};

const messageReceived = (data) => {
  const message = JSON.parse(data.data);
  console.log('Message Received: ', message);
  callStore(message.data);
};

const resetTimer = () => {
  // TODO: set to time or restart
};

const timer = () => {
  if (timerRunning.value) {
    runTimer();
  } else {
    stopTimer();
  }
};

const runTimer = () => {
  const timerFunc = setInterval(() => {
    const timerRemaining = (timeRemaining.value.tenth_seconds / 10) + (timeRemaining.value.seconds / 60) + timeRemaining.value.minutes;

    if (Object.entries(timerRemaining) === 0) {
      const data = {
        action: 'toggleClock',
        value: false
      };
      callStore(data);
    }

    if (timerRemaining > 0) {
      if (timeRemaining.value.seconds === 0 && timeRemaining.value.minutes > 0) {
        timeRemaining.value.minutes -= 1;
        timeRemaining.value.seconds = 59;
      }

      if (timeRemaining.value.tenth_seconds === 0 && timeRemaining.value.seconds > 0) {
        timeRemaining.value.seconds -= 1;
        timeRemaining.value.tenth_seconds = 10;
      }

      timeRemaining.value.tenth_seconds -= 1;
    }
  }, 100);
};

const stopTimer = () => {
  clearInterval(window.timerFunc);
};

const displaySeconds = (seconds) => {
  if (seconds === 60 || seconds === 0) {
    return '00';
  } else if (seconds < 10) {
    return '0' + seconds.toString();
  } else {
    return seconds;
  }
};
</script>

<style scoped lang="less">
@import (css) url('https://fonts.googleapis.com/css2?family=Teko&display=swap');

html,
body {
  overflow: hidden;
}

.scoreboard {
  display: flex;
  width: 100%;
  justify-content: center;
  overflow: hidden;
}

.gameStats {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 65px;
  background-color: #fff;

  .timeBlock {
    font-family: 'Teko', sans-serif;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    font-size: 1.7rem;
    margin: 0.5rem 1rem;
    line-height: .7;
    text-align: center;
    letter-spacing: 1px;

    .timeRemaining {
      font-size: 2.2rem;
    }
  }
}

.period {
  white-space: nowrap;
}

.logo_mhac {
  width: 50px;
}

.hidden {
  visibility: hidden;
}
</style>
