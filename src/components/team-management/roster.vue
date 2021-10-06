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
              <input type="number" min="0" v-model="player.player_number" @input="addToUpdateList(player)" />
            </td>
            <td class="stat">
              <input type="text" v-model="player.first_name" @input="addToUpdateList(player)" />
            </td>
            <td class="stat">
              <input type="text" v-model="player.last_name" @input="addToUpdateList(player)" />
            </td>
            <td class="stat">
              <input type="text" v-model="player.position" @input="addToUpdateList(player)" />
            </td>
            <td class="stat">
              <template>{{age(player.birth_date)}}</template>
            </td>
            <td class="stat">
              <input type="date" v-model="player.birth_date"  @input="addToUpdateList(player)" />
            </td>
            <td class="stat">
              <input type="text" v-model="player.height.feet" @input="addToUpdateList(player)" />
            </td>
            <td class="stat">
              <input type="text" v-model="player.height.inches" @input="addToUpdateList(player)" />
            </td>
            <td class="stat">
              <multiselect
                v-model="player.season_roster"
                label="level_name"
                track-by="team_id"
                :options="$store.getters.teamLevels"
                :closeOnSelect="false"
                :optionHeight="10"
                :multiple="true"
                :taggable="true"
                @input="addToUpdateList(player)">
              </multiselect>
            </td>
          </tr>
          <tr>
            <td class="stat first">
              <input type="number" min="0" v-model="newPlayer.player_number"  />
            </td>
            <td class="stat">
              <input type="text" v-model="newPlayer.first_name" />
            </td>
            <td class="stat">
              <input type="text" v-model="newPlayer.last_name" />
            </td>
            <td class="stat">
              <input type="text" v-model="newPlayer.position" />
            </td>
            <td class="stat">
              <template>{{age(newPlayer.birth_date)}}</template>
            </td>
            <td class="stat">
              <input type="date" v-model="newPlayer.birth_date" />
            </td>
            <td class="stat">
              <input type="text" v-model="newPlayer.height.feet" />
            </td>
            <td class="stat">
              <input type="text" v-model="newPlayer.height.inches" />
            </td>
            <td class="stat">
              <multiselect v-model="newPlayer.season_roster" label="level_name" track-by="team_id" :options="$store.getters.teamLevels" :closeOnSelect="false"  :optionHeight="10" :multiple="true" :taggable="true"></multiselect>
            </td>
          </tr>
        </template>

        <!-- <template slot="tbody" v-else>
          <td><font-awesome-icon :icon="['far', 'eye']" class="icon"></font-awesome-icon></td>
        </template> -->
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

// third party
import Multiselect from 'vue-multiselect'

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
          name: 'Feet',
          icon: '',
          field_name: 'feet',
          type: 'int'
        },
        {
          name: 'Inches',
          icon: '',
          field_name: 'inches',
          type: 'int'
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
      updated: [],
      added: []
    }
  },
  components: {
    editTable: editTable,
    Multiselect
  },
  computed: {
    seasons () {
      return this.$store.state.seasons
    },
    teamAssocLvl () {
      return this.$store.state.teamAssocLvl.season_team_ids
    },
    user: {
      get: function () {
        return this.$store.getters.user
      },

      set: function (newValue) {
        this.initRoster()
      }
    },
    ...mapState(['slug'])
  },
  watch: {
    newPlayer: {
      deep: true,
      handler (newValue) {
        const idx = this.added.indexOf(newValue)
        if (idx >= 0) {
          this.added[idx] = newValue
        } else {
          this.added.push(newValue)
        }
      }
    },
    rosterLvl: {
      deep: true,
      handler (newValue, oldValue) {
        this.initLeveledRoster(newValue.season_team_id)
      }
    },
    '$route.params.slug': {
      handler (id) {
        this.initRoster()
      }
    },
    slug: 'initRoster'
    // 'roster.height': {
    //   deep: true,
    //   handler (newValue, oldValue) {
    //     console.log(newValue)
    //     this.updated.push(newValue)
    //   }
    // }
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
      if (this.$route.params.slug) {
        api.getAdminPlayers(this.$route.params.slug).then(response => {
          this.roster = response.data
          this.fullRoster = _.cloneDeep(this.roster)
          // console.log(JSON.stringify(this.roster))
        })
      }
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
        id: null,
        position: '',
        birth_date: '',
        height: {
          feet: '',
          inches: ''
        },
        team: this.$store.state.user.team_id,
        season_roster: [],
        person_type: 1
      }
      return this.newPlayer
    },
    age (Birthday) {
      Birthday = new Date(Birthday + 'T00:00:00')
      var ageDifMs = Date.now() - Birthday.getTime()
      var ageDate = new Date(ageDifMs) // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970)
    },
    addToUpdateList (id) {
      console.log('addtolist')
      let add = true
      let i = 0
      for (i = 0; i < this.updated.length; i++) {
        if (this.updated[i] === id) {
          add = false
        }
      }
      if (add) {
        this.updated.push(id)
      }
    },
    updatePlayers () {
      console.log('updatePlayers')
      this.updated.forEach(index => {
        console.log(index)
        // const playerId = this.roster[index].id
        // console.log(playerId)
        // api.updatePlayer(playerId, this.roster[index])
        //   .then(response => {
        //     console.log(response)
        //   })
      })
    },
    save () {
      console.log(this.updated)
      if (this.updated.length > 0) {
        this.updated.forEach(player => {
          // console.log("UpdatePlayer", player)
          player.team_id = this.$store.state.user.team_id
          const playerJson = player
          api.updatePlayer(player.id, playerJson)
            .then(response => {
              console.log(response)
            })
            .catch(err => {
              console.log(err)
            })
        })
      }

      console.log('added', this.added)
      if (this.added.length > 1 || this.added[0].player_number !== '') {
        this.added.forEach(player => {
        // console.log("save", this.newPlayer !== this.initNewPlayer(), this.newPlayer, this.initNewPlayer())
          player.team_id = this.$store.state.user.team_id
          const playerJson = player
          console.log(JSON.stringify(playerJson))
          // this.newPlayer.birth_date = new Date(this.newPlayer.birth_date)

          api.addPlayer(playerJson)
            .then(response => {
              console.log(response)
            })
            .catch(err => {
              console.log(err)
            })

        // this.$root.$emit('saved')
        // this.$root.$off('save')
        })
        this.roster.push(this.newPlayer)
        this.initNewPlayer()
      }
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
