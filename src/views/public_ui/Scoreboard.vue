<template>
  <div class="scoreboard" @keydown.space="timer">
    {{ home_team_slug }}
    <!-- <teamBlock location="home" v-model="home_team_slug" :score="home_score" :timeouts="home_timeouts"
      :bonus="away_fouls >= gameRules.fouls_bonus" :bonusPlus="home_fouls >= gameRules.fouls_double_bonus"
      :possession="nextPossession === 'home'"></teamBlock> -->

    <div class="gameStats">
      <div class="timeBlock">
        <div class="timeRemaining">
          <template v-if="time_remaining.minutes !== 0">{{ time_remaining.minutes }}:</template>{{
            displaySeconds(time_remaining.seconds)
          }}<template v-if="time_remaining.minutes === 0">.{{ time_remaining.tenth_seconds }}</template>
        </div>
        <div class="period" v-if="!final && !half">{{ period }}</div>
        <div class="period" v-if="!final && half">Half</div>
        <div class="period" v-if="final">Final</div>

        <img class="logo_mhac" src="/static/color-team-logos/mhaclogo.png"
          alt="Midsouth Home School Athletic Conference Logo" />
      </div>
    </div>
    {{ away_team_slug }}
    <!-- <teamBlock location="away" v-model="away_team_slug" :score="away_score" :timeouts="away_timeouts"
      :bonus="away_fouls >= gameRules.fouls_bonus" :bonusPlus="away_fouls >= gameRules.fouls_double_bonus"
      :possession="nextPossession === 'away'"></teamBlock> -->
  </div>
</template>

<script setup>
import team from '@/components/front-pages/live_video/scoreboard/team.vue';
import { computed, ref, watch } from 'vue';
import { useStore } from "vuex";

const store = useStore();
const teamBlock = team;

const home_team_slug = ref('');
const away_team_slug = ref('');
const home_fouls = ref(0);
const away_fouls = ref(0);
const home_score = ref(0);
const away_score = ref(0);
const home_timeouts = ref(5);
const away_timeouts = ref(4);
const gameRules = ref({
  periods: 4,
  timeouts_allowed: 5,
  penalties_allowed: 7,
  time_remaining: {
    minutes: 8,
    seconds: 0,
    tenth_seconds: 0
  },
  fouls_bonus: 7,
  fouls_double_bonus: 10
});
const isKeyDown = ref(false);
const keys = ref([]);
const time_remaining = ref({
  minutes: 8,
  seconds: 0,
  tenth_seconds: 0
});
const connection = ref(false);

const period = computed(() => {
  return getNumberWithOrdinal(store.state.scoreController.period);
});
const nextPossession = computed(() => {
  return store.state.scoreController.possession;
});
const timer_running = computed(() => {
  return store.state.scoreController.clock.running;
});
const webSocketURL = computed(() => {
  return store.getters.getWebsocket;
});
const half = computed(() => {
  return store.state.scoreController.half;
});
const final = computed(() => {
  return store.state.scoreController.final;
});

watch(gameRules, (newValue) => {
  home_timeouts.value = newValue.timeouts;
  away_timeouts.value = newValue.timeouts;
  time_remaining.value = newValue.time;
}, { deep: true });

watch(period, () => {
  time_remaining.value = {
    minutes: 0,
    seconds: 0,
    hundreds_seconds: 100
  };
  if (getNumberWithOrdinal(store.state.scoreController.period).contains('OT')) {
    time_remaining.value = gameRules.value.overtime;
  } else {
    time_remaining.value = gameRules.value.time;
  }
});

watch(half, () => {
  if (half.value === true) {
    const data = {
      action: 'resetFouls',
      value: gameRules.value.bonus_fouls
    };
    callStore(data);
  }
}, { deep: true });

watch(timer_running, () => {
  timer();
}, { deep: true });

watch(webSocketURL, () => {
  connectWebSocket();
});

function getNumberWithOrdinal(n) {
  if (n <= 4) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  } else {
    return `OT ${n - 4}`;
  }
}

function callStore(data) {
  store.dispatch(data.action, data.value);
}

function connectWebSocket() {
  console.log('Starting connection to WebSocket Server', store.getters.getWebsocket);
  connection.value = new WebSocket(store.getters.getWebsocket);
  connection.value.onmessage = (event) => messageReceived(event);
}

function messageReceived(data) {
  const message = JSON.parse(data.data);
  console.log('Message Recieved: ', message);
  callStore(message.data);
}

function timer() {
  if (timer_running.value) {
    runTimer();
  } else {
    stopTimer();
  }
}

function runTimer() {
  window.timerFunc = setInterval(() => {
    const timerRemaining = (time_remaining.value.tenth_seconds / 10) + (time_remaining.value.seconds / 60) + time_remaining.value.minutes;

    if (Object.entries(timerRemaining) === 0) {
      const data = {
        action: 'toggleClock',
        value: false
      };
      callStore(data);
    }

    if (timerRemaining > 0) {
      if (time_remaining.value.seconds === 0 && time_remaining.value.minutes > 0) {
        time_remaining.value.minutes -= 1;
        time_remaining.value.seconds = 59;
      }

      if (time_remaining.value.tenth_seconds === 0 && time_remaining.value.seconds > 0) {
        time_remaining.value.seconds -= 1;
        time_remaining.value.tenth_seconds = 10;
      }

      time_remaining.value.tenth_seconds -= 1;
    }
  }, 100);
}

function stopTimer() {
  clearInterval(window.timerFunc);
}

function displaySeconds(seconds) {
  if (seconds === 60 || seconds === 0) {
    return '00';
  } else if (seconds < 10) {
    return '0' + seconds.toString();
  } else {
    return seconds;
  }
}
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
</style>
