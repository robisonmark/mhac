<template>
  <div class="hello">
    <header class="contentPad">
      <h2>{{this.$config.seasonYear}} Schedule <selectbox id="levels" :options="seasons" :trackby="'level'" placeholder="Select Level" v-model="newGame.season"></selectbox></h2>
      <div class="buttonCon">
        <div class="switch" v-if="edit === false"  @click="edit = !edit" :class="[edit === true ? 'selected' : '']">
          <font-awesome-icon :icon="edit === true ? ['fas', 'edit'] : ['far', 'edit']" class="icon"></font-awesome-icon>
          <span class="focused">Edit</span>
        </div>

        <div class="switch" v-if="edit" @click="edit = !edit">
          <font-awesome-icon :icon="['fas', 'check']" class="icon"></font-awesome-icon>
          <span class="focused">Done Editing</span>

        </div>
      </div>
    </header>

    <div class="contentPad">
      <editTable  :columns="columns" :config="config" :tabledata="schedule" v-model="newGame" :edit="edit">
        <template slot="tbody" v-if="!edit">
          <tr v-for="(data, index) in schedule" :key="index">
            <td><span :class="{'vs': !data.host}" class="currentCustom">{{data.host ? 'vs' : '@'}}</span></td>
            <td>{{data.opponent.team_name}}</td>
            <td>{{data.game_time}}</td>
            <td>{{data.game_date}}</td>
            <td>{{data.opponent.level_name}}</td>
            <!-- <td></td> -->
            <!-- <td @click="toggleModal(data)"><font-awesome-icon  :icon="['far', 'edit']" class="icon" ></font-awesome-icon></td> -->
            <td @click="deleteGame(data, index)"><font-awesome-icon :icon="['far', 'trash-alt']" class="icon"></font-awesome-icon></td>
          </tr>

          <tr v-if="!newGame.season.season_id">
            <td colspan="7" align="center" class="add-button">Please select a level to begin adding games
            </td>
          </tr>

          <tr v-else-if="!addNew" @click="addTo">
            <td colspan="7" align="center" class="add-button">
              <template v-if="$route.name === 'roster'">Edit Roster</template>
              <template v-else>Add New Game to Schedule</template>
            </td>
          </tr>

          <tr v-else-if="addNew">
            <td class="input-con">
              <div tabindex="0" @click="homeAwayDisplay(newGame)" @keyup.space="homeAwayDisplay(newGame)" :class="{'vs': !newGame.host}" class="currentCustom">{{newGame.host ? 'vs' : '@'}}</div>
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
            <td class="input-con">
              <selectbox id="levels" :options="seasons" :trackby="'level'" placeholder="Select Level" v-model="newGame.season"></selectbox>
            </td>
            <td @click="save(newGame)">
                <font-awesome-icon :icon="['fas', 'save']" class="icon"></font-awesome-icon>
            </td>
          </tr>
        </template>

        <template slot="tbody" v-if="edit">
          <tr v-for="(data, index) in schedule" :key="index">
            <td class="input-con">
              <div tabindex="0" @click="homeAwayDisplay(data)" @keyup.space="homeAwayDisplay(data)" :class="{'vs': !data.host}" class="currentCustom">{{data.host ? 'vs' : '@'}}</div>
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
            <td class="input-con">
              <selectbox id="levels" :options="seasons" :trackby="'level'" placeholder="Select Level" v-model="data.season"></selectbox>
            </td>
            <td @click="save(data)">
                <font-awesome-icon :icon="['fas', 'save']" class="icon"></font-awesome-icon>
            </td>
            <!-- <td class="input-con">
              <input type="date" v-model="data.game_date" />
            </td>
            <td>
                <font-awesome-icon :icon="['fas', 'save']" class="icon"></font-awesome-icon>
            </td> -->
            <!-- <td colspan=3 @click="save()"><font-awesome-icon :icon="saved === false ? ['fas', 'save'] : ['fas', 'check']" class="icon" v-if="!saving"></font-awesome-icon></td> -->
          </tr>

          <tr >
            <!-- <tr > -->
            <td class="input-con">
              <div tabindex="0" @click="homeAwayDisplay(newGame)" @keyup.space="homeAwayDisplay(newGame)" :class="{'vs': !newGame.host}" class="currentCustom">{{newGame.host ? 'vs' : '@'}}</div>
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
            <td class="input-con">
              <selectbox id="levels" :options="seasons" :trackby="'level'" placeholder="Select Level" v-model="newGame.season"></selectbox>
            </td>
            <td @click="save(newGame)">
                <font-awesome-icon :icon="['fas', 'save']" class="icon"></font-awesome-icon>
            </td>
            <!-- <td class="input-con">
              <input type="date" v-model="newGame.game_date" />
            </td>
            <td>
                <font-awesome-icon :icon="['fas', 'save']" class="icon"></font-awesome-icon>
            </td> -->
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
      // update to getter and setter
      return this.$store.getters.seasonTeams.filter(team => {
        console.log(this.newGame.season, team.level_name)
        if (team.id !== this.$store.state.user.team_id && team.level_name === this.newGame.season.level) {
          return team
        }
        else if (team.id !== this.$store.state.user.team_id) {
          
          return team
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
      handler (newValue) {
        this.initSchedule(undefined, newValue)
      }
    }

  },
  created () {
    this.$root.$on('save', payload => {
      this.save()
    })

    this.initSchedule(undefined, this.$route.params.slug)

    this.$root.$on('toggleModal', () => { this.showModal = !this.showModal })
  },
  methods: {
    addNewGame () {
      this.schedule.push(this.newGame)
    },

    deleteGame (data, id) {
      api.removeGame({ game_id: this.schedule[id].game_id }).then(response => {
        this.schedule.splice(id, 1)
      })
    },

    async getSeasonTeamId (slug, gameSeason) {
      if (gameSeason === undefined) {
        gameSeason = this.newGame.season.season_id
      }
      // move this to vuex ?
      let teamId = ''
      await api.getSeasonTeams(slug, gameSeason)
        .then(response => {
          teamId = response.data.team_id
        })
      return teamId
    },

    homeAwayDisplay (game) {
      game.host = !game.host
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

    initSchedule (season, slug) {
      api.getSchedule(season, slug).then(response => {
        const gameArr = []
        response.data.forEach(game => {
          const gameObj = {
            game_id: game.game_id,
            host: true,
            opponent: {},
            game_time: game.game_time,
            game_date: game.game_date,
            season: game.season
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

    remove_game () {
      console.log('delete pressed')
    },

    async save (game = {}) {
      const gameJson = {
        home_team: '',
        away_team: '',
        time: game.game_time,
        date: game.game_date,
        season: game.season.season_id,
        // TODO: Change to make this dynamic
        neutral_site: false
      }

      if (game.host === true) {
        gameJson.away_team = await this.getSeasonTeamId(game.opponent.slug, game.season.season_id)
        gameJson.home_team = await this.getSeasonTeamId(this.$store.state.user.slug, game.season.season_id)
      } else {
        gameJson.away_team = await this.getSeasonTeamId(this.$store.state.user.slug, game.season.season_id)
        gameJson.home_team = await this.getSeasonTeamId(game.opponent.slug, game.season.season_id)
      }

      // console.log('gameJson', gameJson, game.opponent.slug, this.$store.state.user.slug)
      if (this.edit && game.game_id) {
        gameJson.game_id = game.game_id
        api.updateGame(gameJson)
          .then(response => {
            // this.initNewGame(this.newGame.season.season_id)
          })
          .catch(err => {
            console.log(err)
            this.initNewGame(this.newGame.season.season_id)
          })

        // this.schedule.push(this.newGame)
      } else {
        api.addGame(gameJson)
          .then(response => {
            this.initNewGame(this.newGame.season.season_id)
          })
          .catch(err => {
            console.log(err)
          })

        this.schedule.push(this.newGame)
      }
    },

    toggleModal (id) {
      console.log('toggleModal', id)
      this.showModal = !this.showModal
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
