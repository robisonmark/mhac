<template>
    <table>
        <tr v-for="(standing, idx) in currentStandings" :key="idx">
            <td> {{standing}}</td>
        </tr>
    </table>
</template>

<script>
import { api } from '@/api/endpoints'
import { sortBy } from 'lodash'

export default {
  name: 'manageStandings',
  data () {
    return {
      currentStandings: {}
    }
  },
  created () {
    // console.log(this.$store.state.seasons)
    this.initStandings('')
    // this.initYear()
  },
  methods: {
    initStandings (id) {
      id = id.length > 1 ? id : ''
      api.getStandings(id).then(response => {
        console.log(response)
        this.noStandings = false
        // response.data.forEach(result => {
        //   if (result.games_behind !== '') {
        //     result.games_behind = Math.round(result.games_behind)
        //   }
        // })

        this.currentStandings = sortBy(response.data, [function (o) { return o.games_behind }])
        // this.currentStandings = response.data

        if (this.season.length === 0) {
          this.season = this.$store.state.seasons.find(function (level) {
            if (level.level === '18U Boys') {
              return level
            }
          })
        }
      }).catch(err => {
        if (err.response.data === 'No season found') {
          this.noStandings = true
        }
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>
