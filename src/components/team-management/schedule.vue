<template>
  <div class="hello">
    <header class="contentPad">
      <h2>2020 - 2021 Schedule <selectbox id="levels" :options="seasons" :trackby="'level'" placeholder="Select Level" v-model="newGame.season"></selectbox></h2>
    </header>

    <div class="contentPad">
      <div class="" v-if="!newGame.season.season_id">Please Select a level to begin</div>
      <editTable v-else :columns="columns" :config="config" :tabledata="schedule" v-model="newGame">
        <template slot="thead">
          <tr>
            <th>Host</th>
            <th>Opponent</th>
            <th>Time</th>
            <th>Date</th>
            <th></th>
          </tr>
        </template>

        <template slot="tbody">
          <tr v-for="(data, index) in schedule" :key="index">
            <td><span :class="{'vs': !data.host}" class="currentCustom">{{data.host ? 'vs' : '@'}}</span></td>
            <td>{{data.opponent.team_name}}</td>
            <td>{{data.game_time}}</td>
            <td>{{data.game_date}}</td>
            <!-- <td>{{data.opponent.level_name}}</td> -->
            <td><font-awesome-icon :icon="edit === true ? ['fas', 'edit'] : ['far', 'edit']" class="icon"></font-awesome-icon></td>
            <td><font-awesome-icon :icon="['far', 'trash-alt']" class="icon"></font-awesome-icon></td>
          </tr>

          <tr v-if="!addNew" @click="addTo">
            <td colspan="7" align="center" class="add-button">
              <template v-if="$route.name === 'roster'">Edit Roster</template>
              <template v-else>Add New Game to Schedule</template>
            </td>
          </tr>

          <template v-else>
            <tr class="split-fields">
              <td class="input-con"><div tabindex="0" @click="homeAwayDisplay()" @keyup.space="homeAwayDisplay()" :class="{'vs': !newGame.host}" class="currentCustom">{{newGame.host ? 'vs' : '@'}}</div></td>
              <td class="input-con"><selectbox id="opponent" :options="selectOptions" :trackby="'team_name'" placeholder="" v-model="newGame.opponent"></selectbox></td>
              <td class="input-con"><input type="time" v-model="newGame.game_time" /></td>
              <td class="input-con"><input type="date" v-model="newGame.game_date" /></td>
              <!-- <td class="input-con"><input type="date" v-model="newGame.level" /></td> -->
              <td @click="save()"><font-awesome-icon :icon="saved === false ? ['fas', 'save'] : ['fas', 'check']" class="icon" v-if="!saving"></font-awesome-icon></td>
              <!-- <td class="input-con"><span @click="save(addAnother=true)" class="icons">Save and add another</span></td> -->
            </tr>
          </template>
        </template>
      </editTable>
    </div>

  </div>
</template>

<script>
// api
import { api } from '../../api/endpoints.js'

// components
import editTable from '@/components/editTable'
import selectbox from '../selectbox'

// mixins
import { root } from '@/mixins/root'
import { tablemix } from '@/mixins/table'

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
          type: 'select',
          track_by: 'name'
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
          field_name: 'season',
          type: '',
          track_by: 'name'
        }
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
      schedule: []
    }
  },
  mixins: [
    root,
    tablemix
  ],
  components: {
    editTable: editTable,
    selectbox: selectbox
  },
  computed: {
    seasons () {
      return this.$store.state.seasons
    },
    selectOptions () {
      return this.$store.state.teams.filter(team => {
        if (team.id !== this.$store.state.user.team_id) {
          return team
        }
      })
    }
  },
  watch: {
    newGame: {
      deep: true,
      handler (newValue, oldValue) {
        // this.initSchedule(newValue.season.season_id, this.$route.params.slug)
      }

    }
  },
  created () {
    this.$root.$on('save', payload => {
      this.save()
    })
  },
  methods: {
    initSchedule (season, slug) {
      api.getSchedule(season, slug).then(response => {
        const gameArr = []
        response.data.forEach(game => {
          // console.log(game)
          const gameObj = {
            host: game.home_team,
            opponent: game.away_team,
            game_time: game.game_time,
            game_date: game.game_date,
            season: season
          }

          if (game.home_team.slug === this.$store.state.user.slug) {
            gameObj.host = true
            gameObj.opponent = game.away_team
          } else if (game.away_team.slug === this.$store.state.user.slug) {
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
          console.log(response.data)
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
        })
        .catch(err => {
          console.log(err)
        })

      this.schedule.push(this.newGame)
      // console.log('save pressed')
      this.initNewGame(this.newGame.season.season_id)
      // this.$root.$emit('saved')
      
    },
    remove_game () {
      console.log('delete pressed')
    },
    edit () {
      console.log('edit pressed')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@teamColor: var(--bg-color);
h2:after {
  content: '';
  display: block;
  height: 40px;
  /* width: 100%; */
  width: calc(100% + 2.4rem);
  border-top: 1.5px solid @teamColor;
  border-right: 2px solid @teamColor;
  border-left: 2px solid transparent;
  position: relative;
  -webkit-transform: skewX(-45deg);
  transform: skewX(-45deg);
  left: -23px;
  margin-top: .6rem;
}
table {
  margin-top: -40px;
}

#levels {
  width: 200px;
  vertical-align: middle;
  margin-left: 32px;
}
</style>
