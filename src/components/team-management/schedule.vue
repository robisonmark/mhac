<template>
  <div class="hello">
    <header class="contentPad">
      <h2>2019 - 2020 Schedule <selectbox id="levels" :options="seasons" :trackby="'level'" placeholder="Select Level" v-model="newGame.season"></selectbox></h2>
    </header>

    <div class="contentPad">
      <div class="" v-if="schedule.length === 0">Please Select a level to begin</div>
      <editTable v-else :columns="columns" :config="config" :tabledata="schedule" v-model="newGame">
        <template slot="thead">
          <tr>
            <th>Host</th>
            <th>Opponent</th>
            <th>Time</th>
            <th>Date</th>
            <th>Level</th>
          </tr>
        </template>

        <template slot="tbody">
          <tr v-for="(data, index) in schedule" :key="index">
            <td><span :class="{'vs': !data.host}" class="currentCustom">{{data.host ? 'vs' : '@'}}</span></td>
            <td>{{data.opponent.name}}</td>
            <td>{{data.game_time}}</td>
            <td>{{data.game_date}}</td>
            <td>{{data.schedule_id}}</td>
          </tr>

          <tr v-if="!addNew" @click="addTo">
            <td colspan="7" align="center" class="add-button">
              <template v-if="$route.name === 'roster'">Edit Roster</template>
              <template v-else>Add New Game to Schedule</template>
            </td>
            <!-- <td></td> -->
          </tr>

          <template v-else>
            <tr class="split-fields">
              <td class="input-con"><div tabindex="0" @click="homeAwayDisplay()" @keyup.space="homeAwayDisplay()" :class="{'vs': !newGame.host}" class="currentCustom">{{newGame.host ? 'vs' : '@'}}</div></td>
              <td class="input-con"><selectbox id="opponent" :options="selectOptions" :trackby="'team_name'" placeholder="" v-model="newGame.opponent"></selectbox></td>
              <td class="input-con"><input type="time" v-model="newGame.game_time" /></td>
              <td class="input-con"><input type="date" v-model="newGame.game_date" /></td>
              <td class="input-con"><span @click="save()" class="icons">SAVE</span></td>
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
          name: 'Level',
          icon: '',
          field_name: 'season',
          type: 'select',
          track_by: 'name'
        }
      ],
      config: {
        'page': 'schedule'
      },
      newGame: {
        'host': true,
        'opponent': '',
        'game_time': '',
        'game_date': '',
        'season': '',
        'neutral_site': ''
      },
      schedule: []
    }
  },
  mixins: [
    root,
    tablemix
  ],
  components: {
    'editTable': editTable,
    'selectbox': selectbox
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
        this.initSchedule(newValue.season.season_id, this.$route.params.slug)
      }

    }
  },
  created () {
    // this.initSchedule()

    // this.initNewGame()

    this.$root.$on('save', payload => {
      this.save()
    })
  },
  methods: {
    initSchedule (season, slug) {
      api.getSchedule(season, slug).then(response => {
        let gameArr = []
        response.data.forEach(game => {
          let gameObj = {
            'host': '',
            'opponent': '',
            'game_time': game.game_time,
            'game_date': game.game_date,
            'season': season
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
    initNewGame () {
      this.newGame = {
        'host': true,
        'opponent': '',
        'game_time': '',
        'game_date': '',
        'season': '',
        'neutral_site': ''
        // 'uuid': string,
      }
    },
    homeAwayDisplay (game) {
      this.newGame.host = !this.newGame.host
    },
    save () {
      let gameJson = {
        'home_team': '',
        'away_team': '',
        'time': this.newGame.game_time,
        'date': this.newGame.game_date,
        'season': this.newGame.season.id,
        'neutral_site': ''
      }
      console.log(this.newGame.host === true)
      if (this.newGame.host === true) {
        gameJson.away_team = this.newGame.opponent.id
        gameJson.home_team = this.$store.state.user.team_id
      } else {
        console.log(this.newGame.opponent.id)
        gameJson.away_team = this.$store.state.user.team_id
        gameJson.home_team = this.newGame.opponent.id
      }

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
