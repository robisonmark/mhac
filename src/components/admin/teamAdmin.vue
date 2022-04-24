<template>
  <div>test</div>
</template>

<script>
export default {
  name: 'teamAdmin',
  data () {
    return {
      seasons: {},
      teams: {}

    }
  },
  computed: {
    fourteenUBoys () {
      return this.teams.filter(game => { return game.level === '14U Boys' })
    },
    sixteenUBoys () {
      return this.teams.filter(game => { return game.level === '16U Boys' })
    },
    eighteenUBoys () {
      return this.teams.filter(game => { return game.level === '18U Boys' })
    },
    eighteenUGirls () {
      return this.teams.filter(game => { return game.level === '18U Girls' })
    }

  }

}
</script>
<style scoped lang="less">

</style>
