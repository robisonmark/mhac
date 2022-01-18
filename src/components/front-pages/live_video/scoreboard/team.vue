<template>
  <div :id='`canvas_${location}`' :class='`team_block team_block-${location}`' :style='{ backgroundColor: team_color }'>
    <div class="team_logo">
      <img :src="logo" />
    </div>
    {{value}}
  </div>
</template>

<script>
export default {
  name: 'team',
  data () {
    return {

    }
  },

  props: [
    'location',
    'value'
  ],

  computed: {
    team () {
      return this.$store.getters.teams.filter(team => team.slug === this.value)[0]
    },
    team_color () {
      return `#${this.team.main_color}`
    },
    logo () {
      return `/static/color-team-logos/${this.team.logo_color}`
    }
  },

  mounted () {
    // TODO remove the doc.getElementById
    var c = document.getElementById('canvas_home')
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
</style>
