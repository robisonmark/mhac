<template>
  <div class="hello">
    <h2>2019 - 2020 Schedule</h2>
    <editTable :columns="columns" :config="config" :tabledata="schedule" v-model="newGame"></editTable>
  </div>
</template>

<script>
// api
import { api } from '../../api/endpoints.js'

// components
import editTable from '@/components/editTable'

export default {
  name: 'schedule',
  data () {
    return {
      columns: [
        {
          name: 'Host',
          icon: '',
          field_name: 'host',
          type: 'customSelect'
        },
        {
          name: 'Opponent',
          icon: '',
          field_name: 'opponent',
          type: 'select'
        },
        {
          name: 'Time',
          icon: '',
          field_name: 'game_time',
          type: 'time'
        },
        {
          name: 'Date',
          icon: '',
          field_name: 'game_date',
          type: 'date'
        },
        {
          name: 'Level',
          icon: '',
          field_name: 'division',
          type: 'select'
        }
      ],
      config: {
        'page': 'schedule'
      },
      newGame: {
      },
      schedule: [
        {
          'host': '@',
          'opponent': 'Tennessee Heat',
          'game_time': '7:00pm',
          'game_date': '12/02/19',
          'division': 'Boys 18u Basketball'
        }
      ]
    }
  },
  components: {
    'editTable': editTable
  },
  computed: {

  },
  created () {
    this.initSchedule()

    this.initNewGame()

    this.$root.$on('save', payload => {
      this.save()
    })
  },
  methods: {
    initSchedule () {
      api.getSchedule('0182b606-ee31-11e9-b8a6-b827ebcfd443').then(response => {
        console.log(response)
        // this.schedule = response.data
      })
    },
    initNewGame () {
      this.newGame = {
        'home_team': '',
        'away_team': '',
        'game_time': '',
        'game_date': '',
        'season': '',
        'neutral_site': ''
        // 'uuid': string,
      }
    },
    save () {
      console.log(this.newGame)
      let gameJson = this.newGame

      api.addGame(gameJson)
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })

      this.schedule.push(this.newGame)
      this.initNewGame()
      this.$root.$emit('saved')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
