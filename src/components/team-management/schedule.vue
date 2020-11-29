<template>
  <div class="hello">
    <header class="contentPad">
      <h2>2020 - 2021 Schedule <selectbox id="levels" :options="seasons" :trackby="'level'" placeholder="Select Level" v-model="newGame.season"></selectbox></h2>
      <div class="buttonCon">
        <div class="switch" v-if="edit === false"  @click="edit = !edit" :class="[edit === true ? 'selected' : '']">
          <font-awesome-icon :icon="edit === true ? ['fas', 'edit'] : ['far', 'edit']" class="icon"></font-awesome-icon>
          <span class="focused">Edit</span>
        </div>

        <!-- <div class="switch" v-if="edit" @click="save()">
          <font-awesome-icon :icon="saved === false ? ['fas', 'save'] : ['fas', 'check']" class="icon" v-if="!saving"></font-awesome-icon>
          <span class="focused" v-if="!saving">Save</span>
          <span v-else>saving...</span>

        </div> -->
      </div>
    </header>

    <div class="contentPad">
      <editTable  :columns="columns" :config="config" :tabledata="schedule" v-model="newGame" :edit="edit">
        <!-- <template slot="thead">
          <tr>
            <th>Host</th>
            <th>Opponent</th>
            <th>Time</th>
            <th>Date</th>
            <th>Level</th>
          </tr>
        </template> -->

        <template slot="tbody" v-if="!edit">
          <tr v-for="(data, index) in schedule" :key="index">
            <td><span :class="{'vs': !data.host}" class="currentCustom">{{data.host ? 'vs' : '@'}}</span></td>
            <td>{{data.opponent.team_name}}</td>
            <td>{{data.game_time}}</td>
            <td>{{data.game_date}}</td>
            <td>{{data.opponent.level_name}}</td>
            <td></td>
            <!-- <td @click="toggleModal(data)"><font-awesome-icon  :icon="['far', 'edit']" class="icon" ></font-awesome-icon></td> -->
            <td @click="deleteGame(data, index)"><font-awesome-icon :icon="['far', 'trash-alt']" class="icon"></font-awesome-icon></td>
          </tr>

          <tr v-if="!newGame.season.season_id">
            <td colspan="7" align="center" class="add-button">Please Select a level to begin adding games
            </td>
          </tr>

            <tr v-else-if="!addNew" @click="addTo">
              <td colspan="7" align="center" class="add-button">
                <template v-if="$route.name === 'roster'">Edit Roster</template>
                <template v-else>Add New Game to Schedule</template>
              </td>
            </tr>
          </template>
          <template slot="tbody" v-if="edit">
            <tr v-for="(data, index) in schedule" :key="index">
              <td class="input-con">
                <div tabindex="0" @click="homeAwayDisplay()" @keyup.space="homeAwayDisplay()" :class="{'vs': !data.host}" class="currentCustom">{{data.host ? 'vs' : '@'}}</div>
              </td>
              <td class="input-con">
                <selectbox id="opponent" :options="selectOptions" :trackby="'team_name'" placeholder="" v-model="data.opponent">
                </selectbox>
              </td>
              <td class="input-con">
                  <input type="time" v-model="data.game_time" />
                </td>
              <td class="input-con">
                <input type="date" v-model="data.game_date" />
              </td>
              <td @click="save()">
                 <font-awesome-icon :icon="['fas', 'save']" class="icon"></font-awesome-icon>
              </td>
              <!-- <td colspan=3 @click="save()"><font-awesome-icon :icon="saved === false ? ['fas', 'save'] : ['fas', 'check']" class="icon" v-if="!saving"></font-awesome-icon></td> -->
            </tr>

             <tr >
            <!-- <tr > -->
              <td class="input-con">
                <div tabindex="0" @click="homeAwayDisplay()" @keyup.space="homeAwayDisplay()" :class="{'vs': !newGame.host}" class="currentCustom">{{newGame.host ? 'vs' : '@'}}</div>
              </td>
              <td class="input-con">
                <selectbox id="opponent" :options="selectOptions" :trackby="'team_name'" placeholder="" v-model="newGame.opponent">
                </selectbox>
              </td>
              <td class="input-con">
                  <input type="time" v-model="newGame.game_time" />
                </td>
              <td class="input-con">
                <input type="date" v-model="newGame.game_date" />
              </td>
              <td @click="save()">
                 <font-awesome-icon :icon="['fas', 'save']" class="icon"></font-awesome-icon>
              </td>
              <!-- <td colspan=3 @click="save()"><font-awesome-icon :icon="saved === false ? ['fas', 'save'] : ['fas', 'check']" class="icon" v-if="!saving"></font-awesome-icon></td> -->
            </tr>
          </template>
        <!-- </template> -->
      </editTable>
    </div>

  </div>
</template>

<script>
// api
import { api } from '../../api/endpoints.js'

// components
import editTable from '@/components/editTable'
// import modal from '@/components/modal'
import selectbox from '../selectbox'

// helpers
import { mapState } from 'vuex'

// mixins
import { root } from '@/mixins/root'
import { tablemix } from '@/mixins/table'

// third party
// import Multiselect from 'vue-multiselect'

export default {
  name: 'schedule',
  data () {
    return {
      modalTitle: 'Test',
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
          type: 'select',
          track_by: 'team_name'
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
          name: '',
          icon: '',
          field_name: 'actions',
          type: 'actions'
        }
        // {
        //   name: 'Level',
        //   icon: '',
        //   field_name: 'level_name',
        //   type: '',
        //   track_by: 'level_name'
        // }
      ],
      config: {
        page: 'schedule'
      },
      newGame: {
        host: true,
        opponent: '',
        game_time: '',
        game_date: '',
        season: '',
        neutral_site: ''
      },
      saved: false,
      schedule: [],
      gameUpdateList: [],
      edit: false
    }
  },
  mixins: [
    root,
    tablemix
  ],
  components: {
    editTable: editTable,
    selectbox: selectbox
    // modal: modal
  },
  computed: {
    seasons () {
      return this.$store.state.seasons
    },
    // selectOptions () {
    //   return getSeasonTeams(this.newGame.season.season_id).filter(team => {
    //     if (team.id !== this.$store.state.user.team_id) {
    //       return team
    //     }
    //   })
    // },
    // getSeasonTeams (season_id) {
    //   api.getSeasonTeams(season_id=season_id)
    //     .then(response => {
    //       return response.data
    //     })
    // },

    selectOptions () {
      return this.$store.state.teamAssocLvl.filter(team => {
        console.log(team.team_id !== this.$store.state.user.team_id, team, this.$store.state.user.team_id)
        // console.log(this.newGame.season.season_id, team.season_id)
        
          if ( this.newGame.season.season_id === team.season_id){
              if (team.team_id !== this.$store.state.user.team_id) {
            return team
          }
        }
      
      })
    },
    ...mapState(['slug'])
  },
  watch: {
    'newGame.season': {
      deep: true,
      handler (newValue, oldValue) {
        this.initSchedule(newValue.season_id, this.$route.params.slug)
      }
    },
    '$route.params.slug': {
      handler(newValue){
        this.initSchedule(undefined, newValue)
      }
    },

  },
  created () {
    this.$root.$on('save', payload => {
      this.save()
    })
    this.initSchedule(undefined, this.$route.params.slug)
    this.$root.$on('toggleModal', () => { this.showModal = !this.showModal })
  },
  methods: {
    initSchedule (season, slug) {
      api.getSchedule(season, slug).then(response => {
        const gameArr = []
        response.data.forEach(game => {
          // console.log(game)
          const gameObj = {
            game_id: game.game_id,
            host: true,
            opponent: {},
            game_time: game.game_time,
            game_date: game.game_date,
            season: season
          }

          if (game.home_team.slug === this.$store.getters.user.slug) {
            gameObj.host = true
            gameObj.opponent = game.away_team
          // } else if (game.away_team.slug === this.$store.getters.user.slug) {
          } else {
            gameObj.host = false
            gameObj.opponent = game.home_team
          }

          gameArr.push(gameObj)
        })
        this.schedule = gameArr
      })
    },
    initNewGame (currSeason = '') {
      this.season = currSeason
      this.newGame = {
        host: true,
        opponent: '',
        game_time: '',
        game_date: '',
        season: this.season,
        neutral_site: false
        // 'uuid': string,
      }
    },
    homeAwayDisplay (game) {
      this.newGame.host = !this.newGame.host
    },
    async getSeasonTeamId (slug) {
      let teamId = ''
      await api.getSeasonTeams(slug, this.newGame.season.season_id)
        .then(response => {
          // console.log(response.data)
          teamId = response.data.team_id
        })
      return teamId
    },
    async save (addAnother = false) {
      const gameJson = {
        home_team: '',
        away_team: '',
        time: this.newGame.game_time,
        date: this.newGame.game_date,
        season: this.newGame.season.season_id,
        // TODO: Change to make this dynamic
        neutral_site: false
      }

      if (this.newGame.host === true) {
        gameJson.away_team = await this.getSeasonTeamId(this.newGame.opponent.slug)
        gameJson.home_team = await this.getSeasonTeamId(this.$store.state.user.slug)
      } else {
        gameJson.away_team = await this.getSeasonTeamId(this.$store.state.user.slug)
        gameJson.home_team = await this.getSeasonTeamId(this.newGame.opponent.slug)
      }

      api.addGame(gameJson)
        .then(response => {
          console.log(response)
          this.initNewGame(this.newGame.season.season_id)
        })
        .catch(err => {
          console.log(err)
        })

      this.schedule.push(this.newGame)
      // console.log('save pressed')
      // this.initNewGame(this.newGame.season.season_id)
      // this.$root.$emit('saved')
    },
    remove_game () {
      console.log('delete pressed')
    },
    toggleModal (id) {
      console.log('toggleModal', id)
      this.showModal = !this.showModal
    },
    deleteGame (data, id) {
      // console.log(id, this.schedule[id])
      api.removeGame({ game_id: this.schedule[id].game_id }).then(response => {
      // api.removeGame(this.schedule[id].game_id).then(response => {
        this.schedule.splice(id, 1)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
  .buttonCon {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    // height: 3rem;
  }
}

// h2:after {
//   content: '';
//   display: block;
//   height: 40px;
//   /* width: 100%; */
//   width: calc(100% + 2.4rem);
//   border-top: 1.5px solid @teamColor;
//   border-right: 2px solid @teamColor;
//   border-left: 2px solid transparent;
//   position: relative;
//   -webkit-transform: skewX(-45deg);
//   transform: skewX(-45deg);
//   left: -23px;
//   margin-top: .6rem;
// }
table {
  // margin-top: -40px;
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
    z-index: 5;
  }
}

#levels {
  width: 200px;
  vertical-align: middle;
  margin-left: 32px;
}
</style>
