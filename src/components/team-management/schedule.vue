<template>
  <div class="hello">
    <h2>2019 - 2020 Schedule</h2>
    <editTable :columns="columns" :config="config" :tabledata="schedule" v-model="newGame"></editTable>
  </div>
</template>

<script>
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
          field_name: 'home_team',
          type: 'text'
        },
        {
          name: 'Opponent',
          icon: '',
          field_name: 'opponent',
          type: 'text'
        },
        {
          name: 'Time',
          icon: '',
          field_name: 'time',
          type: 'text'
        },
        {
          name: 'Date',
          icon: '',
          field_name: 'date',
          type: 'text'
        },
        {
          name: 'Level',
          icon: '',
          field_name: 'division',
          type: 'text'
        }
      ],
      config: {
        'page': 'schedule'
      },
      newGame: {
      },
      schedule: [
        {
          'home_team': '@',
          'opponent': 'Tn Heat',
          'time': '7:00pm',
          'date': '12/02/19',
          'division': 'Boys 18u Basketball'
        }
      ]
    }
  },
  components: {
    'editTable': editTable
  },
  created () {
    this.initNewGame()

    this.$root.$on('save', payload => {
      this.save()
    })
  },
  methods: {
    initNewGame () {
      this.newGame = {
        'home_team': '',
        'opponent': '',
        'time': '',
        'date': '',
        'division': ''
        // 'uuid': string,
      }
    },
    save () {
      console.log(this.newGame)
      // needs a uuid call
      // below goes into the .then
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
