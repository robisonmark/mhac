<template>
  <v-app class="scoreapp">
    <v-container>
      <v-row>
        <v-col cols="3">
          <h3>Home</h3>
          <!-- <v-select v-model="home" :items="teams" label="home" item-text="team_name" item-value="slug" dense return-object
            @change="setHome"></v-select> -->
          <Selectbox :options="teams" :trackby="'slug'" :placeholder="'Select Team'" :label="'team_name'" v-model=home>
          </Selectbox>

        </v-col>
        <v-col>
          <!-- <v-select v-model="level" :items="levels" label="level_name" item-text="level_name" item-value="id" -->
          <!-- @change="setConfig"></v-select> -->
          <Selectbox :options="levels" :trackby="'id'" :placeholder="'Select Level'" :label="'level_name'" v-model=level>
          </Selectbox>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="3">
          <h3>Away</h3>
          <!-- <v-select v-model="away" :items="teams" label="away" item-text="team_name" item-value="slug" dense return-object
            @change="setAway"></v-select> -->
          <Selectbox :options="teams" :trackby="'slug'" :placeholder="'Select Team'" :label="'team_name'" v-model=away>
          </Selectbox>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="home" cols="4">
          <v-row>
            <v-col align-self='center'>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('incrementHome', 1)"
                :style='{ backgroundColor: home_color }'>Score +1</v-btn>
            </v-col>
            <v-col align-self='center'>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('incrementHome', -1)"
                :style='{ backgroundColor: home_color }'>Score -1</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col align-self='center'>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('incrementHome', 2)"
                :style='{ backgroundColor: home_color }'>Score +2</v-btn>
            </v-col>
          </v-row>
          <v-row align-content="space-between">
            <v-col>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('incrementHome', 3)"
                :style='{ backgroundColor: home_color }'>Score +3</v-btn>
            </v-col>
            <v-col>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('decrementHomeTimeouts', 0)"
                :style='{ backgroundColor: home_color }'>Timeout</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('incrementHomeFouls', 1)"
                :style='{ backgroundColor: home_color }'>Team Foul + </v-btn>
            </v-col>
            <v-col>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('decrementHomeFouls', 1)"
                :style='{ backgroundColor: home_color }'>Team Foul - </v-btn>
            </v-col>
            <v-col>
              Fouls: {{ home_fouls }}
            </v-col>
          </v-row>
        </v-col>
        <v-col class="center">
          <v-row>
            <v-col cols="12">
              <v-btn elevation="2" block x-large @click.prevent.stop="submitWebsocket('toggleClock', true)"
                :style="{ backgroundColor: 'green' }">Toggle Clock</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col align-self='center'>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('setPossession', 'home')"
                :style='{ backgroundColor: home_color }'><font-awesome-icon :icon="['fas', 'arrow-left']"
                  class="icon"></font-awesome-icon> Poss</v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col align-self='center'>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('setPossession', 'away')"
                :style='{ backgroundColor: away_color }'>Poss <font-awesome-icon :icon="['fas', 'arrow-right']"
                  class="icon"></font-awesome-icon></v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('incrementPeriod', 1)"
                :style="{ backgroundColor: 'grey' }">Period +</v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('decrementPeriod', -1)"
                :style="{ backgroundColor: 'grey' }">Period -</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col align-self='center'>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('setHalf', !half)"
                :style='{ backgroundColor: "grey" }'>Half</v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col align-self='center'>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('setFinal', !final)"
                :style='{ backgroundColor: "grey" }'>Final</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="away" cols="4">

          <v-row>
            <v-col align-self='center'>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('incrementAway', -1)"
                :style='{ backgroundColor: away_color }'>Score -1</v-btn>
            </v-col>
            <v-col align-self='center'>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('incrementAway', 1)"
                :style='{ backgroundColor: away_color }'>Score +1</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col></v-col>
            <v-col align-self='center'>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('incrementAway', 2)"
                :style='{ backgroundColor: away_color }'>Score +2</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('decrementAwayTimeouts', 0)"
                :style='{ backgroundColor: away_color }'>Timeout</v-btn>
            </v-col>
            <v-col>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('incrementAway', 3)"
                :style='{ backgroundColor: away_color }'>Score +3</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('incrementAwayFouls', 1)"
                :style='{ backgroundColor: away_color }'>Team Foul + </v-btn>
            </v-col>
            <v-col>
              <v-btn elevation="2" @click.prevent.stop="submitWebsocket('decrementAwayFouls', 1)"
                :style='{ backgroundColor: away_color }'>Team Foul - </v-btn>
            </v-col>
            <v-col>
              Fouls: {{ away_fouls }}
            </v-col>
          </v-row>

        </v-col>
      </v-row>
    </v-container>
    <!-- Scoreboard component -->
    <v-container>
      <v-row>
        <scoreboard></scoreboard>
      </v-row>
    </v-container>
    <v-container>
      <!-- Reset/Correct section -->
      <h3>Reset/Correct</h3>
      <v-row>
        <v-col>
          <v-subheader>Reset Time</v-subheader>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click.prevent.stop="submitWebsocket('toggleClockDisplay', time_remaining)"
            :style='{ backgroundColor: "crimson", color: "white" }'>Toggle Clock Display</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field v-model="time_remaining.minutes" label="Minutes"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="time_remaining.seconds" label="Seconds"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="time_remaining.tenth_seconds" label="Tenths"></v-text-field>
        </v-col>
        <v-btn @click.stop.prevent="submitWebsocket('setTime', time_remaining)"
          :style='{ backgroundColor: "crimson" }'>Submit</v-btn>
      </v-row>
      <v-row>
        <v-col>
          <v-subheader>Reset Score</v-subheader>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field type="number" v-model="home_score_override" label="Home Score"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field type="number" v-model="away_score_override" label="Away Score"></v-text-field>
        </v-col>
        <v-btn @click.stop.prevent="resetScore" :style='{ backgroundColor: "crimson" }'>Submit</v-btn>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import scoreboard from '@/views/public_ui/Scoreboard';
import { useStore } from 'vuex';
import Selectbox from '@/components/selectbox.vue';

import OBSWebSocket from 'obs-websocket-js';


const store = useStore();
const router = useRouter();

const home = ref({ slug: '' });
const away = ref({ slug: '' });
const level = ref({});
const away_score_override = ref(0);
const home_score_override = ref(0);
const keys = ref([]);
const time_remaining = ref({ minutes: 7, seconds: 0, tenth_seconds: 0 });
const timer_running = ref(false);

const obs = new OBSWebSocket();
obs.connect('ws://localhost:4455');


const levels = ref(store.getters.levels);

const away_color = computed(() => `#${away.value.main_color}`);
const home_color = computed(() => `#${home.value.main_color}`);

const webSocketURL = computed(() => store.getters.getWebsocket);
const game_config = computed(() => store.getters.getGameConfig);
const home_fouls = computed(() => store.getters.homeFouls);
const away_fouls = computed(() => store.getters.awayFouls);
const away_score = computed({
  get: () => store.getters.away_score,
  set: (newValue) => (away_score_override.value = Number(newValue)),
});
const home_score = computed({
  get: () => store.getters.home_score,
  set: (newValue) => (home_score_override.value = newValue),
});
// const period = computed({
//   get: () => store.getters.period,
//   // set: (newValue) => (home_score_override.value = newValue),
// });

const connectWebSocket = () => {
  console.log('Starting connection to WebSocket Server', store.getters.getWebsocket);
  obs.connect(url = store.getters.getWebsocket);
};

const submitWebsocket = (action, value) => {
  // console.log('action: ', action)
  //console.log('value:', value)
  obs.call('BroadcastCustomEvent', {
    "eventData": {
      "action": action, "value": value
    }
  });
};

// const messageSend = (data) => {
//   console.log(JSON.stringify(data));
//   connection.send(JSON.stringify(data));
// };


const resetScore = () => {
  console.log('resetScore');
  if (Number(home_score.value) !== Number(home_score_override.value)) {
    submitWebsocket('setHome', Number(home_score_override.value));
  }
  if (Number(away_score.value) !== Number(away_score_override.value)) {
    submitWebsocket('setAway', Number(away_score_override.value));
  }
};

const timer = () => {
  if (timer_running.value) {
    stopTimer();
  } else {
    runTimer();
  }
  timer_running.value = !timer_running.value;
};

const runTimer = () => {
  const timerFunc = setInterval(() => {
    const timerRemaining = time_remaining.value.hundreds_seconds * 1000 + time_remaining.value.seconds * 60 + time_remaining.value.minutes;
    if (timerRemaining > 0) {
      time_remaining.value.hundreds_seconds -= 1;
    }

    if (time_remaining.value.hundreds_seconds === 0) {
      time_remaining.value.seconds -= 1;
      time_remaining.value.hundreds_seconds = 100;
    }

    if (time_remaining.value.seconds === 0) {
      time_remaining.value.minutes -= 1;
      time_remaining.value.seconds = 59;
    }

    if (Object.entries(timerRemaining) === 0) {
      clearInterval(timerFunc);
    }
  }, 10);
};

const stopTimer = () => {
  clearInterval(Window.timerFunc);
};

const fetchData = async () => {
  await store.dispatch('setSeasonTeams');
  await store.dispatch('setTeams');
  await store.dispatch('setWebSocket');
  await store.dispatch('setLevels');
};

fetchData();

// const teams = ref(store.getters.seasonTeams);
const teams = computed(() => {
  let teamList = [];
  console.log('level: ', level.value.level_name)
  if (!level.value.level_name) {
    teamList = store.getters.seasonTeams;
  } else {
    teamList = store.getters.seasonTeams.filter(team => team.level_name === level.value.level_name)
  }
  return teamList
});

watch(level, (newValue, oldValue) => {
  // teams.value = store.getters.seasonTeams.filter(team => team.level_name === newValue.level_name)
  const shortLevelName = newValue.level_name.split(' ')[0];
  submitWebsocket('setGameConfig', shortLevelName);
});

watch(home, (newValue, oldValue) => {
  submitWebsocket('setHomeTeam', newValue.slug)
});

watch(away, (newValue, oldValue) => {
  submitWebsocket('setAwayTeam', newValue.slug)
});


router.beforeEach(() => {
  connectWebSocket();
});
</script>

<style>
.v-btn__content {
  color: #eee !important;
}
</style>
<style lang="less" scoped>
@import (css) url('https://cdn.jsdelivr.net/npm/vuetify@1.x/dist/vuetify.min.css');

:deep(.v-btn__content) {
  color: #eee !important;
}

.container {
  padding: 24px !important; // vuetify overide
}

.scoreboard {
  display: flex;
  width: 100%;
  justify-content: center;
}

.gameStats {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .score {
    display: flex;
    justify-content: center;
  }

  .timeBlock {
    display: flex;
    justify-content: center;
  }
}
</style>