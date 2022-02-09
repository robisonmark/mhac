<template>
  <div class="wrapper">
    <div :id='`canvas_${location}`' :class='`team_block team_block-${location}`' :style='{ backgroundColor: team_color }'>
      <div class="team_logo">
        <img :src="logo" />
      </div>
      <div class="team_name" :style='{ color: secondary_color }'>{{team_name}}</div>
      <scoreBlock :location="location" v-model="score"></scoreBlock>
    </div>
    <div :class='`team_stats team_stats_${location}`' :style='{ backgroundColor: team_color }'>
      <div>
        <div class="timeout_bubble" v-for="(timeout, key) in timeouts" :key="key">
        </div>
      </div>

      <div v-if="bonus" class="bonus">Bonus<template v-if="bonusPlus">+</template></div>
    </div>
  </div>
</template>

<script>
import score from '@/components/front-pages/live_video/scoreboard/score'

export default {
  name: 'team',
  data () {
    return {
      // team_color: '#ffffff'
    }
  },

  props: [
    'bonus',
    'bonusPlus',
    'location',
    'score',
    'timeouts',
    'value'
  ],

  components: {
    scoreBlock: score
  },

  async beforeCreate () {
    await this.$store.dispatch('setTeams')
  },

  // created () {
  //   if (this.$store.getters.teams) {
  //     this.team_color = `#${this.$store.getters.teams.filter(team => team.slug === this.value)[0].main_color}`
  //   } else {
  //     this.$store.dispatch('setTeams').then(team => {
  //       console.log(team)
  //     })
  //   }
  // },

  computed: {
    team () {
      return this.$store.getters.teams.length > 0 ? this.$store.getters.teams.filter(team => team.slug === this.value)[0] : {}
    },
    team_color () {
      return this.$store.getters.teams.length > 0 ? `#${this.$store.getters.teams.filter(team => team.slug === this.value)[0].main_color}` : '#ffffff'
    },
    team_name () {
      return this.$store.getters.teams.length > 0 ? this.$store.getters.teams.filter(team => team.slug === this.value)[0].team_name : ''
    },
    secondary_color () {
      return this.$store.getters.teams.length > 0 ? `#${this.$store.getters.teams.filter(team => team.slug === this.value)[0].secondary_color}` : '#ffffff'
    },
    logo () {
      return this.$store.getters.teams.length > 0 ? `/static/color-team-logos/${this.$store.getters.teams.filter(team => team.slug === this.value)[0].logo_color}` : ''
    }
  },

  mounted () {
    // TODO remove the doc.getElementById
    // var c = document.getElementById('canvas_home')
    // var ctx = c.getContext('2d')
    // ctx.moveTo(30, 0)
    // ctx.lineTo(170, 0)
    // ctx.lineTo(200, 200)
    // ctx.lineTo(0, 200)
    // ctx.fillStyle = '#FF0000'
    // ctx.fill()
  }
}
</script>

<style lang="less">
  @import (css) url('https://fonts.googleapis.com/css2?family=Teko&display=swap');
  .team_block {
    display: flex;
    flex-flow: row;
    width: 300px;
    height: 50px;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;

    &-home {
      // transform: perspective(10px) rotateX(1deg);
      // .team_logo img {
      //   transform: skewX(45deg);
      // }
    }

    &-away {
      flex-flow: row-reverse;
    }
  }

  .team_logo {
    display: flex;
    flex-flow: row;
    justify-content: center;
    height: 35px;
    img {
      width: 100%;
    }
  }

  .team_name {
    font-family: 'Teko', sans-serif;

    font-size: 1.5rem;
    line-height: .8;
  }

  .team_stats {
    padding-left: 10px;
    padding-right: 10px;
    filter: brightness(85%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row;
    height: 18px;
    position: relative;

    .timeout_bubble {
      height: 8px;
      width: 8px;
      margin: 2px;
      background-color: #fff;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      &:first-child {
        margin-left: 0;
      }
    }

    .bonus {
      font-size: 12px;
      color: #fff;
    }

    &_away {
      flex-flow: row-reverse;
    }
  }
</style>
