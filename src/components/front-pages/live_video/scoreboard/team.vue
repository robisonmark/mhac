<template>
  <div class="wrapper">
    <div :id='`canvas_${location}`' :class='`team_block team_block-${location}`' :style='{ backgroundColor: team_color }'>
      <div :class='`team_logo team_logo_${location}`' :style='{ backgroundColor: secondary_color }'>
        <img :src="logo" :class='`${location}`' />
      </div>
      <div class="team_name team_name_wrapper">
        <div :class='`team_name team_name_${location}`' :style='{ color: secondary_color }'>{{team_name}}</div>
      </div>
      <scoreBlock :location="location" v-model="score" :style='{ color: "#fff" }'></scoreBlock>
    </div>
    <div :class='`team_stats team_stats_${location}`' :style='{ backgroundColor: team_color }'>
      <div>
        <div class="timeout_bubble" v-for="(timeout, key) in timeouts" :key="key">
        </div>
      </div>
      <div v-if="bonus" class="bonus">Bonus<template v-if="bonusPlus">+</template></div>
      <div v-if="possession" :class="`possession possession_${location}`">
        <img :src="`/static/scoreboard/poss_${location}.svg`"  />
      </div>
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
    'possession',
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
    overflow: hidden;

    &-home {
      // padding-right: 10px;
    }

    &-away {
      flex-flow: row-reverse;
      // padding-left: 10px;
    }
  }

  .team_logo {
    display: flex;
    flex-flow: row;
    justify-content: center;
    display: flex;
    flex-flow: column;
    justify-content: center;
    background-color: #000;
    height: 100%;
    width: 82.5px;

    &_home {
      transform: skewX(45deg);
      padding-left: 10px;
    }
    &_away {
      transform: skewX(-45deg);
      padding-right: 10px;
    }

    img {
      // width: 100%;
      // height: 35px;
      display: flex;
      flex-flow: row;
      justify-content: center;
      width: 100%;
      &.away {
        transform: skewX(45deg);
      }
      &.home  {
        transform: skewX(-45deg);
      }
    }
  }

  .team_name {
    font-family: 'Teko', sans-serif;

    font-size: 1.5rem;
    line-height: .8;
    display: flex;
    flex-grow: 1;
    padding-left: 5px;
    padding-right: 5px;

    -webkit-text-stroke:1px #121212;

    &_home {
      justify-content: flex-end;
      text-align: right;
    }

    &_away {
      justify-content: flex-start;
    }

    &_wrapper {
      flex-grow: 1;
      width: 125px;
    }
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
      font-size: 15px;
      color: #fff;
      font-family: 'Teko', sans-serif;
      flex-grow: 1;
      padding: 5px;
      line-height: 1;
      height: 100%;
      text-align: right;
    }

    &_away {
      flex-flow: row-reverse;
      .bonus {
        text-align: left;
      }
    }
  }

  .possession {
    font-family: 'Teko', sans-serif;
    width: 14px;
    // background-color: #fff;
    padding: 3px;
    position: relative;
    height: 100%;
    line-height: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      height: 13px;
      width: auto;
    }

    // &:after,
    // &:before {
    //   content: "";
    //   position: absolute;
    //   width: 3px;
    //   height: 50%;
    // }
    // &:before {
    //   top: 0px;
    // }
    // &:after {
    //   bottom: 0px;
    // }

    // &_home {
    //   &:after,
    //   &:before {
    //     right: 100%;
    //   }

    //   &:before {
    //     background: linear-gradient(to top left, #fff 50%, transparent 51%);
    //   }
    //   &:after {
    //     background: linear-gradient(to bottom left, #fff 50%, transparent 51%);
    //   }
    // }

    // &_away {
    //   &:after,
    //   &:before {
    //     left: 100%;
    //   }

    //   &:before {
    //     background: linear-gradient(to top right, #fff 50%, transparent 51%);
    //   }
    //   &:after {
    //     background: linear-gradient(to bottom right, #fff 50%, transparent 51%);
    //   }
    // }
  }
</style>
