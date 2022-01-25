<template>
  <div class="scoreapp">
    <button class="set_game_rules">Set Game Rules Modal</button>
    <div class="home_team">
      <div class="score_window">{{home_score}}</div>
      <div class="button_row">
        <button class="point_one">+1</button>
        <button class="point_two">+2</button>
        <button class="point_three">+3</button>
        <button class="timeout">Timeout</button>
        <button class="foul">Team Foul</button>
      </div>
    </div>
    <div class="game_info_block">
      <div class="timer">{{time_remaining.minutes}} : {{time_remaining.seconds}}</div>
      <div class="period">{{period}}</div>
      <button class="period">Period +1</button>
      <button class="clock">Advance Clock</button>
      <button class="clock_reset">Reset Clock</button>
    </div>
    <div class="away_team">
      <div class="score_window">{{away_score}}</div>
      <div class="button_row">
        <button class="point_one">+1</button>
        <button class="point_two">+2</button>
        <button class="point_three">+3</button>
        <button class="timeout">Timeout</button>
        <button class="foul">Foul +1</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scoreboard',
  data () {
    return {
      away_score: 0,
      away_timeouts: 5,

      game_rules: {
        periods: 4,
        timeouts_allowed: 5,
        penalties_allowed: 7,
        time_remaining: {
          minutes: 9,
          seconds: 0,
          hundreds_seconds: 100
        }
      },

      home_score: 0,
      home_timeouts: 5,

      isKeyDown: false,

      keys: [],

      period: 1,
      time_remaining: {
        minutes: 9,
        seconds: 0,
        hundreds_seconds: 100
      },
      timer_running: false
    }
  },

  components: {
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
