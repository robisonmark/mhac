<template>
  <div class="scoreboard" @keydown.space="timer">
    <teamBlock location="home" v-model="home_team_slug" :score="home_score" :timeouts="home_timeouts" :bonus="home_fouls >= 5" :bonusPlus="home_fouls >= 10" :possession="nextPossession === 'home'"></teamBlock>

    <div class="gameStats">
      <!-- <div class="score">
        <scoreBlock location="home" v-model="home_score"></scoreBlock> |
        <scoreBlock location="away" v-model="away_score"></scoreBlock>
      </div> -->
      <div class="timeBlock">
        <div class="timeRemaining">
          <template v-if="time_remaining.minutes !== 0">{{time_remaining.minutes}}:</template>{{(time_remaining.seconds === 60 || time_remaining.seconds === 0) ? '00' : time_remaining.seconds }}<template v-if="time_remaining.minutes === 0">.{{time_remaining.hundreds_seconds}}</template>
        </div>
        <div class="period">{{period}}</div>
      </div>
    </div>

    <teamBlock location="away" v-model="away_team_slug" :score="away_score" :timeouts="away_timeouts" :bonus="away_fouls >= 5" :bonusPlus="away_fouls >= 10" :possession="nextPossession === 'away'"></teamBlock>
  </div>
</template>

<script>
import team from '@/components/front-pages/live_video/scoreboard/team'
// import score from '@/components/front-pages/live_video/scoreboard/score'

export default {
  name: 'scoreboard',
  data () {
    return {
      // away_fouls: 4,
      // away_score: 0,
      away_team_slug: 'tennessee_heat',
      // away_timeouts: 4,

      // home_fouls: 0,
      // home_score: 0,
      home_team_slug: 'daniel_1',
      // home_timeouts: 5,

      isKeyDown: false,

      keys: [],

      // period: 1,
      time_remaining: {
        minutes: 9,
        seconds: 0,
        hundreds_seconds: 100
      },
      // timer_running: false
      connection: false
    }
  },

  components: {
    teamBlock: team
    // scoreBlock: score
  },

  computed: {
    away_fouls: {
      get: function () {
        return this.$store.state.scoreController.fouls.away
      }
    },
    away_score: {
      get: function () {
        return this.$store.state.scoreController.score.away
      }
    },
    home_fouls: {
      get: function () {
        return this.$store.state.scoreController.fouls.home
      }
    },
    home_score: {
      get: function () {
        return this.$store.state.scoreController.score.home
      }
    },
    home_timeouts: {
      get: function () {
        return this.$store.state.scoreController.timeouts.home
      }
    },
    away_timeouts: {
      get: function () {
        return this.$store.state.scoreController.timeouts.away
      }
    },
    period: {
      get: function () {
        return this.getNumberWithOrdinal(this.$store.state.scoreController.period)
      }
    },
    nextPossession: {
      get: function () {
        return this.$store.state.scoreController.possession
      }
    },
    timer_running: {
      get: function () {
        return this.$store.state.scoreController.clock.running
      }
    },
    webSocketURL () {
        return this.$store.getters.getWebsocket
      }
  },

  watch: {
    timer_running: {
      handler: function () {
        this.timer()
      },
      deep: true
    },
    webSocketURL: {
       handler: function () {
        this.connectWebSocket()
      }
    }
  },
  beforeCreate() {
    this.$store.dispatch('setWebSocket')
  },

  created () {
    // this.$store.dispatch('setWebSocket')
    // console.log("here")
    // this.connection.onopen = (event) => this.messageSend(event)
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

  },

  methods: {
    connectWebSocket() {
      console.log('Starting connection to WebSocket Server', this.$store.getters.getWebsocket)
      this.connection = new WebSocket(this.$store.getters.getWebsocket)
      this.connection.onmessage = (event) => this.messageReceived(event)
    },
    getNumberWithOrdinal (n) {
      if (n <= 4) {
        var s = ['th', 'st', 'nd', 'rd']
        var v = n % 100
        return n + (s[(v - 20) % 10] || s[v] || s[0])
      } else {
        return `OT ${n - 4}`
      }
    },
    callStore (data) {
      console.log(data)
      this.$store.dispatch(data.action, data.value)
    },
    messageReceived (data) {
      const message = JSON.parse(data.data)
      console.log('Message Recieved: ', message)
      this.callStore(message.data)
    },

    resetTimer () {
      // TODO: set to time or restart
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
    }
  }
}
</script>

<style lang="less">
  @import (css) url('https://fonts.googleapis.com/css2?family=Teko&display=swap');
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
    width: 65px;
    .score {
      display: flex;
      justify-content: center;
    }
    .timeBlock {
      font-family: 'Teko', sans-serif;

      background-color: #fff;
      justify-content: center;
      align-items: center;
      flex-flow: column;
      font-size: 1.7rem;
      margin: 0.5rem 1rem;
      line-height: .7;
      text-align: center;
      letter-spacing: 1px;
    }
  }
  .period {
    white-space: nowrap;
  }
</style>
