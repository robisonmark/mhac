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
          name: 'ID',
          icon: '',
          field_name: 'id',
          type: ''
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
          field_name: 'birth_date',
          type: 'text'
        },
        {
          name: 'Height',
          icon: '',
          field_name: 'height',
          type: 'text'
        },
        {
          name: 'Team',
          icon: '',
          field_name: 'team_id',
          type: 'text'
        }
      ],
      config: {
        'page': 'roster'
      },
      newPlayer: {
      },
      roster: [
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
      api.getPlayers('8b31d882-e233-11e9-a4c2-b827ebcfd443').then(response => {
        // console.log(response)
        this.roster = response.data
      })
    },
    initNewPlayer () {
      this.newPlayer = {
        'number': '',
        'first_name': '',
        'last_name': '',
        'id': '',
        'position': '',
        'age': '',
        'birth_date': '',
        'height': '',
        'team_id': ''
      }
    },
    save () {
      // console.log(this.newPlayer)
      this.newPlayer['team_id'] = '8b31d882-e233-11e9-a4c2-b827ebcfd443'
      let playerJson = this.newPlayer

      api.addPlayer(playerJson)
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })

      this.roster.push(this.newPlayer)
      this.initNewPlayer()
      this.$root.$emit('saved')
      this.$root.$off('save')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
