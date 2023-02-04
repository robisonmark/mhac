<template>
  <div class="scoreboard" @keydown.space="timer">
    <teamBlock
      location="home"
      v-model="home_team_slug"
      :score="home_score"
      :timeouts="home_timeouts"
      :bonus="away_fouls >= gameRules.fouls_bonus"
      :bonusPlus="away_fouls >= gameRules.fouls_double_bonus"
      :possession="nextPossession === 'home'"
    ></teamBlock>

    <div class="gameStats">

      <div class="timeBlock">
        <div class="timeRemaining">
          <template v-if="time_remaining.minutes !== 0"
            >{{ time_remaining.minutes }}:</template
          >{{ displaySeconds(time_remaining.seconds)
          }}<template v-if="time_remaining.minutes === 0"
            >.{{ time_remaining.tenth_seconds }}</template
          >
        </div>
        <div class="period" v-if="!final && !half">{{ period }}</div>
        <div class="period" v-if="!final && half">Half</div>
        <div class="period" v-if="final">Final</div>

        <img
          class="logo_mhac"
          src="/static/color-team-logos/mhaclogo.png"
          alt="Midsouth Home School Athletic Conference Logo"
        />
      </div>
    </div>

    <teamBlock
      location="away"
      v-model="away_team_slug"
      :score="away_score"
      :timeouts="away_timeouts"
      :bonus="home_fouls >= gameRules.fouls_bonus"
      :bonusPlus="home_fouls >= gameRules.fouls_double_bonus"
      :possession="nextPossession === 'away'"
    ></teamBlock>
  </div>
</template>

<script>
import team from '@/components/front-pages/live_video/scoreboard/team'
import { cloneDeep } from 'lodash'
// import { clear } from 'console'
// import score from '@/components/front-pages/live_video/scoreboard/score'

export default {
  name: 'scoreboard',
  data () {
    return {

      isKeyDown: false,

      keys: [],

      // time_remaining: {
      //   minutes: 8,
      //   seconds: 0,
      //   tenth_seconds: 0
      // },
      // time_remaining_new: 8 * 60 * 10,
      counter: 0,
      connection: false
    }
  },

  components: {
    teamBlock: team
    // scoreBlock: score
  },

  computed: {
    // time_remaining_new: {
    //   get: function () {
    //     console.log("getter", this.time_remaining)

    //   },
    //   set: function (newValue) {
    //     console.log("setter", newValue)
    //     // return ((newValue.minutes * 60) +
    //     // newValue.seconds * 10) +
    //     // newValue.tenth_seconds
    //   }
    // },
    away_team_slug: {
      get: function () {
        return this.$store.state.scoreController.away_team_slug
      }
    },
    home_team_slug: {
      get: function () {
        return this.$store.state.scoreController.home_team_slug
      }
    },
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
      },
      set: function (newValue) {
        console.log(newValue)
      }
    },
    away_timeouts: {
      get: function () {
        return this.$store.state.scoreController.timeouts.away
      },
      set: function (newValue) {
        console.log(newValue)
      }
    },
    period: {
      get: function () {
        return this.getNumberWithOrdinal(
          this.$store.state.scoreController.period
        )
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
      },

      set: function (newValue) {
        console.log(newValue)
      }
    },
    time_remaining: {
      get: function () {
        return this.$store.state.scoreController.time_remaining
      },
      set: function (newValue) {
        this.$store.commit('setTime', newValue)
      }
    },
    webSocketURL () {
      return this.$store.getters.getWebsocket
    },
    half () {
      return this.$store.state.scoreController.half
    },
    final () {
      return this.$store.state.scoreController.final
    },
    gameRules: {
      get: function () {
        return this.$store.getters.getGameConfig
      },

      set: function (newValue) {
        this.home_timeouts = newValue.timeouts
        this.away_timeouts = newValue.timeouts
        this.time_remaining = newValue.time
      }
    }
  },

  watch: {
    gameRules: {
      handler: function (newValue) {
        this.home_timeouts = newValue.timeouts
        this.away_timeouts = newValue.timeouts
        this.time_remaining = newValue.time
      },
      deep: true
    },
    period: {
      handler: function () {
        const displayPeriod = this.getNumberWithOrdinal(this.$store.state.scoreController.period)

        if (displayPeriod.includes('OT')) {
          this.time_remaining = this.gameRules.overtime
        } else {
          const gameConfig = this.$store.getters.getGameConfig
          console.log('gameConfig', gameConfig)
          this.time_remaining = gameConfig.time
        }
        this.callStore({
          action: 'setTime',
          value: this.time_remaining
        })
        if (
          this.getNumberWithOrdinal(
            this.$store.state.scoreController.period
          ) === 'OT 1'
        ) {
          const data = {
            action: 'resetFouls',
            value: this.game_rules.bonus_fouls
          }
          this.callStore(data)
        }
      },
      deep: true
    },
    half: {
      handler: function (newValue) {
        if (this.half === true) {
          const data = {
            action: 'resetFouls',
            value: this.game_rules.bonus_fouls
          }
          this.callStore(data)
        }
      },
      deep: true
    },
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
  beforeCreate () {
    this.$store.dispatch('setWebSocket')
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
      if (['Numpad1', 'NumpadAdd'].every((v) => self.keys.includes(v))) {
        console.log(self.keys.filter((key) => key === 'Numpad1').length)
        self.home_score += self.keys.filter((key) => key === 'Numpad1').length
      }
      if (['Numpad1', 'NumpadSubtract'].every((v) => self.keys.includes(v))) {
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

    // computeTimeRmainingAsDecaSeconds(){
    //   return (
    //               (this.time_remaining.minutes * 60) +
    //               this.time_remaining.seconds) * 10 +
    //     this.time_remaining.tenth_seconds
    // },
    connectWebSocket () {
      console.log(
        'Starting connection to WebSocket Server Scoreboard',
        this.$store.getters.getWebsocket
      )
      console.log('Im here')
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
      this.$store.dispatch(data.action, data.value)
    },
    messageReceived (data) {
      const message = JSON.parse(data.data)
      console.log('Message Recieved: ', message)
      message?.data && this.callStore(message.data)
    },

    resetTimer () {
      // TODO: set to time or restart
    },
    timer () {
      if (this.timer_running) {
        this.runTimer()
      } else {
        this.stopTimer()
      }
      // this.timer_running = !this.timer_running
    },
    elapsedTime (startTime, currentTime) {
      // gets the milleseconds difference in the startTime epoch vs the current (inverval based time)
      return currentTime - startTime
    },
    timeRemainingMilliseconds (timeRemainingObject) {
      const minInMilli = timeRemainingObject.minutes * 60 * 1000
      const secInMilli = timeRemainingObject.seconds * 1000
      const tenthsInMilli = timeRemainingObject.tenth_seconds * 100
      return minInMilli + secInMilli + tenthsInMilli
    },
    convertMillisecondsToTimeObject (elapsedTime) {
      const milliToMinutes = Math.floor(elapsedTime / 60000)
      const milliToSec = (elapsedTime % 60000) / 1000
      const milliToDeca = (elapsedTime % 60000) % 10

      return { minutes: milliToMinutes, seconds: Math.floor(milliToSec), tenth_seconds: milliToDeca }
    },
    runTimer () {
      const self = this
      const originalTimeMilli = self.timeRemainingMilliseconds(cloneDeep(this.time_remaining))
      const startTime = Date.now()

      Window.timerFunc = setInterval(function () {
        const timeRemainingInMilliseconds = self.timeRemainingMilliseconds(self.time_remaining)
        if (timeRemainingInMilliseconds <= 0) {
          clearInterval(Window.timerFunc)
          self.time_remaining = { minutes: 0, seconds: 0, tenth_seconds: 0 }
          return
        }
        const currentTime = Date.now()
        const elapsedTime = currentTime - startTime

        const timeLeft = originalTimeMilli - elapsedTime
        self.time_remaining = self.convertMillisecondsToTimeObject(timeLeft)

        if (timeRemainingInMilliseconds <= 0) {
          const data = {
            action: 'toggleClock',
            value: false
          }
          self.callStore(data)
        }
      }, 100)
    },

    stopTimer () {
      clearInterval(Window.timerFunc)
    },
    displaySeconds (seconds) {
      if (seconds === 60 || seconds === 0) {
        return '00'
      } else if (seconds < 10) {
        return '0' + seconds.toString()
      } else {
        return seconds
      }
    }
  }
}
</script>

<style lang="less">
@import (css) url("https://fonts.googleapis.com/css2?family=Teko&display=swap");
::v-deep html,
::v-deep body {
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
  .score {
    display: flex;
    justify-content: center;
  }
  .timeBlock {
    font-family: "Teko", sans-serif;

    justify-content: center;
    align-items: center;
    flex-flow: column;
    font-size: 1.7rem;
    margin: 0.5rem 1rem;
    line-height: 0.7;
    text-align: center;
    letter-spacing: 1px;
  }

  .timeRemaining {
    font-size: 2.2rem;
  }
}
.period {
  white-space: nowrap;
}
.logo_mhac {
  width: 50px;
}
</style>
