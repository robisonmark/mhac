<template>
  <div class="hello">
    <h2>Current Roster</h2>
    <editTable :columns="columns" :config="config" :tabledata="roster" v-model="newPlayer"></editTable>
  </div>
</template>

<script>
// api
import { api } from '../../api/endpoints.js'

// components
import editTable from '@/components/editTable'

export default {
  name: 'roster',
  data () {
    return {
      columns: [
        {
          name: 'Number',
          icon: '',
          field_name: 'number',
          type: 'text'
        },
        {
          name: 'First Name',
          icon: '',
          field_name: 'first_name',
          type: 'text'
        },
        {
          name: 'Last Name',
          icon: '',
          field_name: 'last_name',
          type: 'text'
        },
        {
          name: 'Position',
          icon: '',
          field_name: 'position',
          type: 'text'
        },
        {
          name: 'Age',
          icon: '',
          field_name: 'age',
          type: 'text'
        },
        {
          name: 'Birthdate',
          icon: '',
          field_name: 'birthday',
          type: 'text'
        },
        {
          name: 'Height',
          icon: '',
          field_name: 'height',
          type: 'text'
        }
      ],
      config: {
        'page': 'roster'
      },
      newPlayer: {
      },
      roster: [
        {
          number: 1,
          fname: 'Mark',
          lname: 'Robison',
          pos: 'SF',
          age: '32',
          bday: '04/12/1987',
          height: '5\'11"'
        }
      ]
    }
  },
  components: {
    'editTable': editTable
  },
  created () {
    this.initRoster()

    this.initNewPlayer()

    this.$root.$on('save', payload => {
      this.save()
    })
  },
  methods: {
    initRoster () {
      api.getPlayers('8b31d3fa-e233-11e9-a4c2-b827ebcfd443').then(response => {
        console.log(response)
      })
    },
    initNewPlayer () {
      this.newPlayer = {
        'number': '',
        'first_name': '',
        'last_name': '',
        'position': '',
        'age': '',
        'birthday': '',
        'height': ''
      }
    },
    save () {
      console.log(this.newPlayer)
      let playerJson = {
        ...this.newPlayer,
        'team_id': '8b31d3fa-e233-11e9-a4c2-b827ebcfd443'
      }
      api.updatePlayer('post', playerJson)
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })

      this.roster.push(this.newPlayer)
      this.initNewPlayer()
      this.$root.$emit('saved')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
