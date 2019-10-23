<template>
  <div class="hello">
    <h2>Stats</h2>
    <div class="" v-if="!gameSelected">
      <!-- add to edit table just rename columns -->
      <table id="table">
        <thead id="table-head-fixed">
          <tr>
            <th></th>
            <th>Date</th>
            <th>Opponent</th>
            <th>Missing Stats</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="game in pastGames" :key="game.id" :class="{ 'missing':  !game.missing_stats }" @click="enterStats(game.id)">
            <td></td>
            <td>{{game.date}}</td>
            <td>{{game.opponent}}</td>
            <td>{{game.missing_stats}}</td>
            <td><font-awesome-icon :icon="['far', 'eye']" class="icon"></font-awesome-icon></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="gameSelected && boxscore">
      <table class="scoreTable">
        <thead>
          <tr>
            <th></th>
            <th class="text-center">Q1</th>
            <th class="text-center">Q2</th>
            <th class="text-center">Q3</th>
            <th class="text-center">Q4</th>
            <th class="finalScore text-center">Final</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{gameScore.homeTeam.name}}</td>
            <td><input type="number" v-model.number="gameScore.homeTeam.q1" />
            <td><input type="number" v-model.number="gameScore.homeTeam.q2" />
            <td><input type="number" v-model.number="gameScore.homeTeam.q3" />
            <td><input type="number" v-model.number="gameScore.homeTeam.q4" />
            <td class="finalScore text-center">{{gameScore.homeTeam.q1 + gameScore.homeTeam.q2 + gameScore.homeTeam.q3 + gameScore.homeTeam.q4}}</td>
          </tr>
          <tr>
            <td>{{gameScore.awayTeam.name}}</td>
            <td><input type="number" v-model.number="gameScore.awayTeam.q1" />
            <td><input type="number" v-model.number="gameScore.awayTeam.q2" />
            <td><input type="number" v-model.number="gameScore.awayTeam.q3" />
            <td><input type="number" v-model.number="gameScore.awayTeam.q4" />
            <td class="finalScore text-center">{{gameScore.awayTeam.q1 + gameScore.awayTeam.q2 + gameScore.awayTeam.q3 + gameScore.awayTeam.q4}}</td>
          </tr>
        </tbody>
      </table>
      <div class="button">
        Player Stats
      </div>
    </div>
    <div v-else>
      <editTable :columns="columns" :config="config" :tabledata="stats" v-model="newGameStats"></editTable>
    </div>
  </div>
</template>

<script>
// components
import editTable from '@/components/editTable'

export default {
  name: 'stats',
  data () {
    return {
      boxscore: false,
      gameSelected: false,
      pastGames: [
        {
          'uuid': '4e091c9a-728d-4600-9b2c-cd826d3b3802',
          'date': '11/01/2019',
          'opponent': 'Tennessee Heat',
          'missing_stats': true
        },
        {
          'uuid': '83253524-8a39-4bea-b55f-fe7a6161080f',
          'date': '11/02/2019',
          'opponent': 'Western Kentucky Trailblazers',
          'missing_stats': false
        }
      ],
      columns: [
        {
          name: '#',
          icon: '',
          field_name: 'number',
          type: 'text'
        },
        {
          name: 'Last Name',
          icon: '',
          field_name: 'last_name',
          type: 'text'
        },
        {
          name: 'GS',
          icon: '',
          field_name: 'gs',
          type: 'checkbox'
        },
        {
          name: 'FGM',
          icon: '',
          field_name: 'fg_m',
          type: 'number'
        },
        {
          name: 'FGA',
          icon: '',
          field_name: 'fg_a',
          type: 'number'
        },
        {
          name: '3PTM',
          icon: '',
          field_name: '3pt_m',
          type: 'number'
        },
        {
          name: '3PTA',
          icon: '',
          field_name: '3pt_a',
          type: 'number'
        },
        {
          name: 'FTM',
          icon: '',
          field_name: 'ft_m',
          type: 'number'
        },
        {
          name: 'FTA',
          icon: '',
          field_name: 'ft_a',
          type: 'number'
        },
        {
          name: 'RB OF',
          icon: '',
          field_name: 'rb_off',
          type: 'number'
        },
        {
          name: 'RB DE',
          icon: '',
          field_name: 'rb_def',
          type: 'number'
        },
        {
          name: 'A',
          icon: '',
          field_name: 'a',
          type: 'number'
        },
        {
          name: 'TO',
          icon: '',
          field_name: 'to',
          type: 'number'
        },
        {
          name: 'BLK',
          icon: '',
          field_name: 'blk',
          type: 'number'
        },
        {
          name: 'STL',
          icon: '',
          field_name: 'stl',
          type: 'number'
        }
      ],
      config: {
        'page': 'stats'
      },
      newGameStats: {
        'game_id': ''
      },
      stats: [
        {
          'number': 3,
          'last_name': 'O\'neal',
          'gs': true,
          'fg_m': 4,
          'fg_a': 5,
          '3pt_m': 0,
          '3pt_a': 0,
          'ft_m': 10,
          'ft_a': 18,
          'rb_off': 3,
          'rb_def': 10,
          'a': 2,
          'to': 0,
          'blk': 1,
          'stl': 2
        }
      ],
      roster: [
        {
          birth_date: '1987-12-04',
          first_name: 'Test_Player_2',
          height: 'None',
          id: 'd0e75004-a386-4954-9ae4-ec00ba95bbd1',
          last_name: 'test',
          person_type: 'None',
          team_id: '8b31d882-e233-11e9-a4c2-b827ebcfd443'
        },
        {
          birth_date: '1987-12-04',
          first_name: 'Test_Coach_2',
          height: 'None',
          id: 'a143e349-1d2c-43a5-b953-261425c04f8c',
          last_name: 'test',
          person_type: '2',
          team_id: '8b31d882-e233-11e9-a4c2-b827ebcfd443'
        },
        {
          birth_date: '1987-12-04',
          first_name: 'Test_Coach_2',
          height: 'None',
          id: '07774cbd-14e7-48c4-943c-7c1762a02309',
          last_name: 'test',
          person_type: '2',
          team_id: '8b31d882-e233-11e9-a4c2-b827ebcfd443'
        },
        {
          birth_date: '1987-12-04',
          first_name: 'Test_Coach_2',
          height: 'None',
          id: 'fba2f4f5-417c-4306-8999-808c0f251e2c',
          last_name: 'test',
          person_type: '1',
          team_id: '8b31d882-e233-11e9-a4c2-b827ebcfd443'
        },
        {
          birth_date: '1987-12-04',
          first_name: 'Test_Coach_2',
          height: 'None',
          id: '4d3d8200-68f3-431d-8e52-5b89da30ea63',
          last_name: 'test',
          person_type: '2',
          team_id: '8b31d882-e233-11e9-a4c2-b827ebcfd443'
        },
        {
          birth_date: '1987-12-04',
          first_name: 'Test_Coach_2',
          height: 'None',
          id: 'cc57ae28-cc20-4e61-8cc6-99478ca91866',
          last_name: 'test',
          person_type: '2',
          team_id: '8b31d882-e233-11e9-a4c2-b827ebcfd443'
        },
        {
          birth_date: '1987-12-04',
          first_name: 'Test_Coach_75',
          height: 'None',
          id: '00905a2b-fbce-4871-ab65-3c6719b426bc',
          last_name: 'test',
          person_type: '2',
          team_id: '8b31d882-e233-11e9-a4c2-b827ebcfd443'
        }
      ],
      gameScore: {
        homeTeam: {
          name: 'This',
          q1: '',
          q2: '',
          q3: '',
          q4: '',
          final: ''
        },
        awayTeam: {
          name: 'That',
          q1: '',
          q2: '',
          q3: '',
          q4: '',
          final: ''
        }
      }
    }
  },
  components: {
    'editTable': editTable
  },
  methods: {
    enterStats (gameId) {
      this.newGameStats.game_id = gameId
      this.initNewGameStats()

      this.gameSelected = true
      // add logic to check home team
      this.boxscore = true
    },
    initNewGameStats () {
      let teamInfo = {
        'team_uuid': '',
        'team_stats': [
        ]
      }

      this.roster.forEach(player => {
        let playerStat = {
          'player_uuid': player.id,
          'stats': {
            'g': '',
            'gs': false,
            'fg_m': '',
            'fg_a': '',
            '3pt_m': '',
            '3pt_a': '',
            'ft_m': '',
            'ft_a': '',
            'rb_off': '',
            'rb_def': '',
            'a': '',
            'to': '',
            'blk': ''
          }
        }
        teamInfo.team_stats.push(playerStat)
      })

      this.newGameStats = {
        ...this.newGameStats,
        ...teamInfo
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h2:after {
  content: '';
  display: block;
  height: 40px;
  /* width: 100%; */
  width: calc(100% + 2.4rem);
  border-top: 1.5px solid #B42625;
  border-right: 2px solid #B42625;
  border-left: 2px solid transparent;
  position: relative;
  -webkit-transform: skewX(-45deg);
  transform: skewX(-45deg);
  left: -23px;
  margin-top: .6rem;
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
  }
}
.scoreTable {
  // max-width: 400px;
  border-collapse: collapse;
  tr {
    border-bottom: 0;
  }
  td {
    padding: 0;
    -webkit-border-horizontal-spacing: 0px;
    -webkit-border-vertical-spacing: 0px;
    input {
      padding: 0;
      height: 50px;
      box-sizing: border-box;
    }
  }
}
</style>
