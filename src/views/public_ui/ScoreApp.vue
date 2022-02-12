<template>
  <v-app class="scoreapp">
    <v-container>
      <v-row>
        <v-col cols="3">
          <h3>Home</h3>
          <v-select v-model="home"
            :items="teams"
            label="home"
            item-text="team_name"
            item-value="slug"
            dense
            return-object
            @change="setHome"
          ></v-select>
        </v-col>
        <v-col>
          <v-select v-model="level"
            :items="levels"
            label="level"
            item-text="level_name"
            item-value="level_name"
            @change="setConfig"
          >
          </v-select>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="3">
          <h3>Away</h3>
          <v-select v-model="away"
            :items="teams"
            label="away"
            item-text="team_name"
            item-value="slug"
            dense
            return-object
            @change="setAway"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="home" cols="4">
          <v-row>
            <v-col align-self='center'>
              <v-btn elevation="2" @click="submitWebsocket('incrementHome', 1)" :style='{ backgroundColor: home_color}'>Score +1</v-btn>
            </v-col>
            <v-col align-self='center'>
              <v-btn elevation="2" @click="submitWebsocket('incrementHome', -1)" :style='{ backgroundColor: home_color}'>Score -1</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col align-self='center'>
              <v-btn elevation="2" @click="submitWebsocket('incrementHome', 2)" :style='{ backgroundColor: home_color}'>Score +2</v-btn>
            </v-col>
          </v-row>
          <v-row align-content="space-between">
            <v-col>
              <v-btn elevation="2" @click="submitWebsocket('incrementHome', 3)" :style='{ backgroundColor: home_color}'>Score +3</v-btn>
            </v-col>
            <v-col>
              <v-btn elevation="2" @click="submitWebsocket('decrementHomeTimeouts', 0)" :style='{ backgroundColor: home_color}'>Timeout</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn elevation="2" @click="submitWebsocket('incrementHomeFouls', 1)" :style='{ backgroundColor: home_color}'>Team Foul + </v-btn>
            </v-col>
            <v-col>
              <v-btn elevation="2" @click="submitWebsocket('decrementHomeFouls', 1)" :style='{ backgroundColor: home_color}'>Team Foul - </v-btn>
            </v-col>
            <v-col>
              Fouls: {{ home_fouls }}
            </v-col>
          </v-row>
        </v-col>
        <!-- <v-col></v-col> -->
        <v-col class="center">
          <v-row>
            <v-col cols="12">
              <v-btn elevation="2" block x-large @click="submitWebsocket('toggleClock', true)" :style="{backgroundColor: 'green'}">Toggle Clock</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col align-self='center'>
              <v-btn elevation="2" @click="submitWebsocket('setPossession', 'home')" :style='{ backgroundColor: home_color}'><font-awesome-icon :icon="['fas', 'arrow-left']" class="icon"></font-awesome-icon> Poss</v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col align-self='center'>
              <v-btn elevation="2" @click="submitWebsocket('setPossession', 'away')" :style='{ backgroundColor: away_color}'>Poss <font-awesome-icon :icon="['fas', 'arrow-right']" class="icon"></font-awesome-icon></v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn elevation="2" @click="submitWebsocket('incrementPeriod', 1)" :style="{backgroundColor: 'grey'}">Period +</v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
              <v-btn elevation="2" @click="submitWebsocket('decrementPeriod', -1)" :style="{backgroundColor: 'grey'}">Period -</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col align-self='center'>
              <v-btn elevation="2" @click="submitWebsocket('setHalf', !half)" :style='{ backgroundColor: "grey"}'>Half</v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col align-self='center'>
              <v-btn elevation="2" @click="submitWebsocket('setFinal', !final)" :style='{ backgroundColor: "grey"}'>Final</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <!-- <v-col></v-col> -->
        <v-col class="away" cols="4">
          <v-row>
            <v-col align-self='center'>
              <v-btn elevation="2" @click="submitWebsocket('incrementAway', -1)" :style='{ backgroundColor: away_color}'>Score -1</v-btn>
            </v-col>
            <v-col align-self='center'>
              <v-btn elevation="2" @click="submitWebsocket('incrementAway', 1)" :style='{ backgroundColor: away_color}'>Score +1</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col></v-col>
            <v-col align-self='center'>
              <v-btn elevation="2" @click="submitWebsocket('incrementAway', 2)" :style='{ backgroundColor: away_color}'>Score +2</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn elevation="2" @click="submitWebsocket('decrementAwayTimeouts', 0)" :style='{ backgroundColor: away_color}'>Timeout</v-btn>
            </v-col>
            <v-col>
              <v-btn elevation="2" @click="submitWebsocket('incrementAway', 3)" :style='{ backgroundColor: away_color}'>Score +3</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn elevation="2" @click="submitWebsocket('incrementAwayFouls', 1)" :style='{ backgroundColor: away_color}'>Team Foul + </v-btn>
            </v-col>
            <v-col>
              <v-btn elevation="2" @click="submitWebsocket('decrementAwayFouls', 1)" :style='{ backgroundColor: away_color}'>Team Foul - </v-btn>
            </v-col>
            <v-col>
              Fouls: {{ away_fouls }}
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-subheader>Reset Time</v-subheader>
        <v-col>
          <v-text-field v-model="time_remaining.minutes" label="Minutes"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="time_remaining.seconds" label="Seconds"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="time_remaining.tenths_seconds" label="Tenths"></v-text-field>
        </v-col>
        <v-btn @click="submitWebsocket('setTime', time_remaining)" :style='{ backgroundColor: "crimson"}'>Submit</v-btn>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <scoreboard></scoreboard>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// components
import scoreboard from '@/views/public_ui/Scoreboard'

// third party
import { cloneDeep } from 'lodash'

export default {
  name: 'scoreapp',
  data () {
    return {
      away: '',
      home: {
        main_color: '#fff'
      },
      away_score: 0,
      away_timeouts: 5,

      isKeyDown: false,

      home_score: 0,
      home_timeouts: 5,

      keys: [],

      level: '',

      period: 1,
      time_remaining: {
        minutes: 7,
        seconds: 0,
        tenths_seconds: 0
      },
      timer_running: false,
      connection: false
    }
  },

  components: {
    scoreboard: scoreboard
  },

  computed: {
    levels () {
      return this.$store.getters.levels
    },
    teams () {
      return this.$store.getters.teams.length > 0 ? this.$store.getters.teams : []
    },
    webSocketURL () {
      return this.$store.getters.getWebsocket
    },
    away_color () {
      return `#${this.away.main_color}`
    },
    home_color () {
      return `#${this.home.main_color}`
    },
    game_config () {
      return this.$store.getters.getGameConfig
    },
    home_fouls () {
      return this.$store.getters.homeFouls
    },
    away_fouls () {
      return this.$store.getters.awayFouls
    }
  },

  watch: {
    webSocketURL: {
      handler: function () {
        this.connectWebSocket()
      }
    }
    // time_remaining: {
    //   handler: function () {
    //     this.submitWebsocket('setTime', this.time_remaining)
    //   }
    // }

  },

  async beforeCreate () {
    await this.$store.dispatch('setTeams')
    await this.$store.dispatch('setWebSocket')
    await this.$store.dispatch('setLevels')
  },

  created () {

  },

  mounted () {
    const self = this
    window.addEventListener('keydown', function (event) {
      self.isKeyDown = true
      self.keys.push(event.code)
      if (event.code === 'Space') {
        self.timer()
      }
      if (['Numpad1', 'NumpadAdd'].every(v => self.keys.includes(v))) {
        console.log(self.keys.filter(key => key === 'Numpad1').length)
        self.home_score += self.keys.filter(key => key === 'Numpad1').length
      }
      if (['Numpad1', 'NumpadSubtract'].every(v => self.keys.includes(v))) {
        if (self.home_score > 0) {
          self.home_score -= 1
        }
      }
    })

    window.addEventListener('keyup', function (event) {
      self.isKeyDown = false
      self.keys.length = 0
    })

    // window.addEventListener('keyup', function (event) {
    //   if (event.code === 'Numpad1') {
    //     self.home_score += 1
    //   }
    // })
  },

  methods: {
    connectWebSocket () {
      console.log('Starting connection to WebSocket Server', this.$store.getters.getWebsocket)
      this.connection = new WebSocket(this.$store.getters.getWebsocket)
      this.connection.onopen = (event) => this.messageSend(event)
    },
    submitWebsocket (action, value) {
      const socketData = {
        'request-type': 'BroadcastCustomMessage',
        'message-id': '1234',
        realm: action,
        data: {
          action: action,
          value: value
        }
      }
      this.connection.send(JSON.stringify(socketData))
    },

    messageSend (data) {
      console.log(JSON.stringify(data))
      // console.log("Successfully connected to the echo websocket server...")
      this.connection.send(JSON.stringify(data))
    },

    setHome (data) {
      console.log(data.slug)
      this.submitWebsocket('setHomeTeam', data.slug)
    },

    setAway (data) {
      console.log(data.slug)
      this.submitWebsocket('setAwayTeam', data.slug)
    },
    // messageReceived (data) {
    //   const message = JSON.parse(data.data)
    //   // console.log('Message Recieved: ', message)
    // },
    addPeriod () {
      if (this.period < this.game_rules.periods) {
        this.period += 1
      }
    },
    changeScore (team, amount) {
      if (team === 'home') {
        this.home_score += amount
      } else {
        this.away_score += amount
      }
    },
    resetTimer () {
      // TODO: set to time or restart
      this.time_remaining = cloneDeep(this.game_rules.time_remaining)
    },
    timer () {
      if (this.timer_running) {
        this.stopTimer()
      } else {
        this.runTimer()
      }
      this.timer_running = !this.timer_running
    },
    runTimer () {
      const self = this
      Window.timerFunc = setInterval(function () {
        const timerRemaining = (self.time_remaining.hundreds_seconds * 1000) + (self.time_remaining.seconds * 60) + self.time_remaining.minutes
        if (timerRemaining > 0) {
          self.time_remaining.hundreds_seconds -= 1
        }

        if (self.time_remaining.hundreds_seconds === 0) {
          self.time_remaining.seconds -= 1
          self.time_remaining.hundreds_seconds = 100
        }

        if (self.time_remaining.seconds === 0) {
          self.time_remaining.minutes -= 1
          self.time_remaining.seconds = 59
        }

        if (Object.entries(timerRemaining) === 0) {
          clearInterval(Window.timerFunc)
        }
      }, 10)
    },
    stopTimer () {
      clearInterval(Window.timerFunc)
    },
    setConfig (levelName) {
      const shortLevelName = levelName.split(' ')[0]
      this.$store.dispatch('setGameConfig', shortLevelName)
    }
  }
}
</script>
<style>
  .v-btn__content {
    color: #eee !important;
  }
</style>
<style lang="less" scoped>
  @import (css) url('https://cdn.jsdelivr.net/npm/vuetify@1.x/dist/vuetify.min.css');

  /deep/ .v-btn__content {
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
