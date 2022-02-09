<template>
  <div class="scoreboard" @keydown.space="timer">
    <teamBlock location="home" v-model="home_team_slug" :score="home_score" :timeouts="home_timeouts" :bonus="home_fouls >= 5" :bonusPlus="home_fouls >= 10"></teamBlock>

    <div class="gameStats">
      <!-- <div class="score">
        <scoreBlock location="home" v-model="home_score"></scoreBlock> |
        <scoreBlock location="away" v-model="away_score"></scoreBlock>
      </div> -->
      <div class="timeBlock">
        <div class="quarter">
          Q {{quarter}} |
        </div>
        <div class="timeRemaining">
          <template v-if="time_remaining.minutes !== 0">{{time_remaining.minutes}}:</template>{{(time_remaining.seconds === 60 || time_remaining.seconds === 0) ? '00' : time_remaining.seconds }}<template v-if="time_remaining.minutes === 0">.{{time_remaining.hundreds_seconds}}</template>
        </div>
      </div>
    </div>

    <teamBlock location="away" v-model="away_team_slug" :score="away_score" :timeouts="away_timeouts" :bonus="away_fouls >= 5" :bonusPlus="away_fouls >= 10"></teamBlock>
  </div>
</template>

<script>
import team from '@/components/front-pages/live_video/scoreboard/team'
import score from '@/components/front-pages/live_video/scoreboard/score'

export default {
  name: 'scoreboard',
  data () {
    return {
      away_fouls: 4,
      away_team_slug: 'life_christian',
      away_timeouts: 4,

      home_fouls: 0,
      home_score: 0,
      home_team_slug: 'western_kentucky',
      home_timeouts: 5,

      isKeyDown: false,

      keys: [],

      quarter: 1,
      time_remaining: {
        minutes: 9,
        seconds: 0,
        hundreds_seconds: 100
      },
      timer_running: false
    }
  },
  
  created () {
    console.log('Starting connection to WebSocket Server')
    this.connection = new WebSocket(this.$store.state.scoreController.websocket)
    this.connection.onmessage = (event) => this.messageReceived(event)
    // this.connection.onopen = (event) => this.messageSend(event)
  },


  components: {
    // flair left
    teamBlock: team,
    scoreBlock: score
    // flair right
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
  computed: {
    away_score: {
      get: function () {
        console.log(this.$store.state.scoreController.score.away )//, this.$store.state.score.away)
        return this.$store.state.scoreController.score.away
      }
    }
  },
  methods: {
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
