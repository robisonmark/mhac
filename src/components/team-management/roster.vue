<template>
  <div class="hello">
    <header class="contentPad">
      <h2>Current Roster</h2>

      <div class="buttonCon">
        <div class="switch" v-if="edit === false"  @click="edit = !edit" :class="[edit === true ? 'selected' : '']">
          <font-awesome-icon :icon="edit === true ? ['fas', 'edit'] : ['far', 'edit']" class="icon"></font-awesome-icon>
          <span class="focused">Edit</span>
        </div>

        <div class="switch" v-if="edit" @click="save()">
          <font-awesome-icon :icon="saved === false ? ['fas', 'save'] : ['fas', 'check']" class="icon" v-if="!saving"></font-awesome-icon>
          <span class="focused" v-if="!saving">Save</span>
          <span v-else>saving...</span>

        </div>
      </div>
    </header>
    <div class="contentPad">
      <editTable :columns="columns" :config="config" :tabledata="roster" v-model="newPlayer" :edit="edit">
        <template slot="tbody" v-if="edit">
          <tr v-for="(player, index) in roster" :key="index">

            <td class="stat first">
              <input type="number" min="0" v-model.number="player.player_number" @input="addToUpdateList(1)" />
            </td>
            <td class="stat">
              <input type="text" v-model="player.first_name" />
            </td>
            <td class="stat">
              <input type="text" v-model="player.last_name" />
            </td>
            <td class="stat">
              <input type="text" v-model="player.position" />
            </td>
            <td class="stat">
              <template>{{age()}}</template>
            </td>
            <td class="stat">
              <input type="date" v-model="player.birth_date" />
            </td>
            <td class="stat">
              <input type="text" v-model="player.height" />
            </td>
            <td class="stat">
              <input type="text" v-model="player.season_roster" />
            </td>
          </tr>
        </template>
      </editTable>
    </div>
  </div>
</template>

<script>
// api
import { api } from '../../api/endpoints.js'
import { mapState } from 'vuex'
import _ from 'lodash'

// components
import editTable from '@/components/editTable'
// import selectbox from '../selectbox'

export default {
  name: 'roster',
  data () {
    return {
      columns: [
        {
          name: 'Number',
          icon: '',
          field_name: 'player_number',
          type: 'number'
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
          type: 'date'
        },
        {
          name: 'Height',
          icon: '',
          field_name: 'height',
          type: 'text'
        },
        {
          name: 'Levels',
          icon: '',
          field_name: 'season_roster',
          type: 'multiselect',
          track_by: 'level_name',
          model: 'season_roster'
        }
      ],
      config: {
        page: 'roster'
      },
      edit: false,
      fullRoster: [],
      newPlayer: {
      },
      roster: [
      ],
      rosterLvl: '',
      saved: false,
      saving: false,
      updated: []
    }
  },
  components: {
    editTable: editTable
    // selectbox: selectbox
  },
  watch: {
    newPlayer: {
      deep: true,
      handler (newValue) {
        const idx = this.updated.indexOf(newValue)
        if (idx >= 0) {
          this.updated[idx] = newValue
        } else {
          this.updated.push(newValue)
        }
      }
    },
    user (newValue, oldValue) {
      this.initRoster()
    },
    rosterLvl: {
      deep: true,
      handler (newValue, oldValue) {
        this.initLeveledRoster(newValue.season_team_id)
      }
    }
    // 'roster.height': {
    //   deep: true,
    //   handler (newValue, oldValue) {
    //     console.log(newValue)
    //     this.updated.push(newValue)
    //   }
    // }
  },
  computed: {
    seasons () {
      return this.$store.state.seasons
    },
    teamAssocLvl () {
      return this.$store.state.teamAssocLvl.season_team_ids
    },
    ...mapState(['user'])
  },
  created () {
    this.initRoster()

    this.initNewPlayer()

    this.$root.$on('save', payload => {
      this.save()
    })

    this.$root.$on('changeEdit', () => { this.edit = !this.edit })
  },
  methods: {
    initRoster () {
      api.getPlayers(this.$store.state.user.slug).then(response => {
        this.roster = response.data
        console.log(this.roster)
        this.fullRoster = _.cloneDeep(this.roster)
      })
    },
    initLeveledRoster (lvlId) {
      api.getRoster(lvlId).then(response => {
        const rosterArr = []
        this.fullRoster.forEach(player => {
          response.data.forEach(lvlPlayer => {
            if (player.id === lvlPlayer.player_id) {
              rosterArr.push(player)
            }
          })
        })

        this.roster = rosterArr
      })
    },
    initNewPlayer () {
      this.newPlayer = {
        player_number: '',
        first_name: '',
        last_name: '',
        id: '',
        position: '',
        birth_date: '',
        height: '',
        team: this.$store.state.user.team_id,
        season_roster: [],
        person_type: 1
      }
      return this.newPlayer
    },
    age () {
      return 'Fix'
    },
    addToUpdateList (id) {
      console.log('addtolist')
      this.updated.push(id)
    },
    updatePlayers () {
      console.log('updatePlayers')
      this.updated.forEach(index => {
        console.log(index)
        const playerId = this.roster[index].id
        console.log(playerId)
        // api.updatePlayer(playerId, this.roster[index])
        //   .then(response => {
        //     console.log(response)
        //   })
      })
    },
    save () {
      this.newPlayer.team_id = this.$store.state.user.team_id
      const playerJson = this.newPlayer
      console.log(JSON.stringify(playerJson))
      // this.newPlayer.birth_date = new Date(this.newPlayer.birth_date)

      api.addPlayer(playerJson)
        .then(response => {
          console.log(response)
        })
        .catch(err => {
          console.log(err)
        })

      this.roster.push(this.newPlayer)
      this.initNewPlayer()
      // this.$root.$emit('saved')
      // this.$root.$off('save')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@teamColor: var(--bg-color);
header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  padding-top: 1rem;
  margin-bottom: .5rem;
  position: sticky;
    top: 0;
    z-index: 2;
    left: 0;
    background: #CFCDCD;
  h2 {
    display: inline-block;
  }
  .buttonCon {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    // height: 3rem;
  }
}

table {
  margin-top: -40px;
  width: 100%;
  border-collapse: collapse;
  // border-spacing: 0 5px;
  position: relative;
  z-index: 1;

  th, tr {
    text-align: left;
    .number {
      text-align: center;
    }
  }

  thead {
    tr {
      height: 40px;
    }
    th {
      font-weight: 200;
      line-height: 1;
      white-space: nowrap;
      &.pad-right {
        padding-right: 1rem;
      }
    }
    // &:before {
    //   content: '';
    //   display: block;
    //   height: 40px;
    //   width: calc(100% + 45px);
    //   // width: calc(100% + 15px);
    //   // border-top: 1px solid var(--bg-color);
    //   // border-right: 1px solid var(--bg-color);
    //   border-top: 1.5px solid #B42625;
    //   border-right: 2px solid #B42625;
    //   border-left: 2px solid transparent;
    //   position: absolute;
    //   -webkit-transform: skewX(-45deg);
    //   transform: skewX(-45deg);
    //   left: -23px;
    // }
  }

  tbody {
    tr {
      background-color: #fff;
      height: 50px;
      border-bottom: 5px solid #CFCDCD;
      .add-button {
        cursor: pointer;
      }

      &.split-fields{
        td {
          border-right: 5px solid #CFCDCD;
          input[type="text"] {
            height: 50px;
            border: 0;
            outline: none;
          }
          &:last-child{
            border-right: 0px;
            // background-color: #CFCDCD;
          }
        }
      }

      // tr last child
      &:last-child {
        border-bottom: 0px;
        // background-color: #CFCDCD;
      }

      &.missing {
        background-color: #F0E9E9;
      }
    }
  }
  td {
    padding-left: 1rem;
    padding-right: 1rem;
    position: relative;
    &:last-child{
      border-right: 0px;
      // background-color: #CFCDCD;
    }
    &.align-no-pad {
      padding-left: 0;
    }
  }
}

table{
  margin-top: 0;
  &:before {
    content: '';
    display: block;
    height: 40px;
    width: 100%;
    width: calc(100% + 2.4rem);
    border-top: 1.5px solid @teamColor;
    border-right: 2px solid @teamColor;
    border-left: 2px solid transparent;
    position: absolute;
    -webkit-transform: skewX(-45deg);
    transform: skewX(-45deg);
    /* left: -23px; */
    /* margin-top: 0.6rem; */
    top: 0;
    right: -20px;
  }
}

.stat{
  // td {
  border-right: 5px solid #CFCDCD;
  text-align: center;
  padding: 0;
  min-width: 50px;
  input {
    font-weight: 400;
    height: 50px;
    border: 0;
    outline: none;
    text-align: center;
  }
  &.first{
    border-left: 5px solid #CFCDCD;
    // background-color: #CFCDCD;
  }
  &:last-child{
    border-right: 0px;
    // background-color: #CFCDCD;
  }
}

#levels {
  width: 200px;
  vertical-align: middle;
  margin-left: 32px;
}
</style>
