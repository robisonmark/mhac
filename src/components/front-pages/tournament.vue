<template>
   <div class="container">
     <div class="page-styles">
      <h2>MHAC Conference Tournament Information - 2020</h2>
      <h5><a href="/static/docs/MHAC Conference 2020 Tournament.pdf" class="download" download>Download Tournament Packet</a></h5>
      <p>The 2019-2020 MHAC Conference Tournament will be beginning Thursday Feburary 6th at <a href="https://welch.edu/">Welch College</a> in Gallatin, Tennessee. Games begin at 8:00am CST at the <a href="https://goo.gl/maps/tBuQfnHmC19ZZste9">Welch College Gym</a>.  Please <a href="/static/docs/MHAC Conference 2020 Tournament.pdf" class="download" download>download the tournament packet</a> for more information.</p>
      <p>Because of our initial growth we are using a second gym the first day where the initial 14u games will be played.  It is First Baptist Church Hendersonville.  <a href="https://goo.gl/maps/jkkQnVX1KjcR7VpH9">106 Bluegrass Commons Blvd, Hendersonville, TN 37075</a>.  The 14u families will report to that gym directly Thursday morning.</p>

      <br />

      <p>The concession stand will be open at 7:45 each morning and will remain open until we leave each night. All proceeds help to offset the cost of using the gym at Welch College. <a href="/static/docs/MHAC Concessions.pdf" class="download" download>Click here to download the concession menu.</a></p>
      <div class="tournamentSchedule">
        <table>
          <thead>
            <tr class="levelHead">
              <td colspan="6">14U Boys</td>
            <tr>
            <tr>
              <th>Game #</th>
              <th>Date</th>
              <th>Time</th>
              <th>Matchup</th>
              <th class="final">Final Score</th>
              <th class="text-right"><font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in fourteenUBoys" :key="index">
              <td>{{game.game}}</td>
              <td>{{game.date}}</td>
              <td>{{game.time}}</td>
              <td>
                <span :class="[game.matchup.scoreTeam1 && game.matchup.team1 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team1"></span>
                vs.
                <span :class="[game.matchup.scoreTeam1 && game.matchup.team2 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team2"></span>
              </td>
              <td class="final">
                <template v-if="game.matchup.scoreTeam1">
                  {{game.matchup.scoreTeam1}} - {{game.matchup.scoreTeam2}}
                  <div>{{results(game.matchup)}}</div>
                </template>
                <template v-else>
                  --
                </template>
              </td>
              <td class="text-right"><a :href="'https://maps.google.com/?q=' + game.location.address">{{game.location.name}}</a></td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr class="levelHead">
              <td colspan="6">16U Boys</td>
            <tr>
            <tr>
              <th>Game #</th>
              <th>Date</th>
              <th>Time</th>
              <th>Matchup</th>
              <th class="final">Final Score</th>
              <th class="text-right"><font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in sixteenUBoys" :key="index">
              <td>{{game.game}}</td>
              <td>{{game.date}}</td>
              <td>{{game.time}}</td>
              <td>
                <span :class="[game.matchup.scoreTeam1 && game.matchup.team1 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team1"></span>
                vs.
                <span :class="[game.matchup.scoreTeam1 && game.matchup.team2 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team2"></span>
              </td>
              <td class="final">
                <template v-if="game.matchup.scoreTeam1">
                  {{game.matchup.scoreTeam1}} - {{game.matchup.scoreTeam2}}
                  <div>{{results(game.matchup)}}</div>
                </template>
                <template v-else>
                  --
                </template>
              </td>
              <td class="text-right"><a :href="'https://maps.google.com/?q=' + game.location.address">{{game.location.name}}</a></td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr class="levelHead">
              <td colspan="6">18U Boys</td>
            <tr>
            <tr>
              <th>Game #</th>
              <th>Date</th>
              <th>Time</th>
              <th>Matchup</th>
              <th class="final">Final Score</th>
              <th class="text-right"><font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in eighteenUBoys" :key="index">
              <td>{{game.game}}</td>
              <td>{{game.date}}</td>
              <td>{{game.time}}</td>
              <td>
                <span :class="[game.matchup.scoreTeam1 && game.matchup.team1 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team1"></span>
                vs.
                <span :class="[game.matchup.scoreTeam1 && game.matchup.team2 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team2"></span>
              </td>
              <td class="final">
                <template v-if="game.matchup.scoreTeam1">
                  {{game.matchup.scoreTeam1}} - {{game.matchup.scoreTeam2}}
                  <div>{{results(game.matchup)}}</div>
                </template>
                <template v-else>
                  --
                </template>
              </td>
              <td class="text-right"><a :href="'https://maps.google.com/?q=' + game.location.address">{{game.location.name}}</a></td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr class="levelHead">
              <td colspan="6">18U Girls</td>
            <tr>
            <tr>
              <th>Game #</th>
              <th>Date</th>
              <th>Time</th>
              <th>Matchup</th>
              <th class="final">Final Score</th>
              <th class="text-right"><font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in eighteenUGirls" :key="index">
              <td>{{game.game}}</td>
              <td>{{game.date}}</td>
              <td>{{game.time}}</td>
              <td>
                <span :class="[game.matchup.scoreTeam1 && game.matchup.team1 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team1"></span>
                vs.
                <span :class="[game.matchup.scoreTeam1 && game.matchup.team2 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team2"></span>
              </td>
              <td class="final">
                <template v-if="game.matchup.scoreTeam1">
                  {{game.matchup.scoreTeam1}} - {{game.matchup.scoreTeam2}}
                  <div>{{results(game.matchup)}}</div>
                </template>
                <template v-else>
                  --
                </template>
              </td>
              <td class="text-right"><a :href="'https://maps.google.com/?q=' + game.location.address">{{game.location.name}}</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="sponsors">
      </div>
    </div>
  </div>
</template>

<script>
// import { api } from '../../api/endpoints.js'

export default {
  name: 'tournament2020',
  data () {
    return {
      games: [
        {
          game: '1',
          date: 'Feburary 6th',
          time: '10:00 am',
          matchup: {
            team1: 'Chattanooga Patriots',
            scoreTeam1: '17',
            team2: 'Tennessee Heat',
            scoreTeam2: '36'
          },
          location: {
            address: '106 Bluegrass Commons Blvd, Hendersonville, TN 37075',
            name: 'First Baptist Church'
          },
          level: '14U Boys'
        },
        {
          game: '2',
          date: 'Feburary 6th',
          time: '11:00 am',
          matchup: {
            team1: 'Covenant Christian Academy',
            scoreTeam1: '49',
            team2: 'Nashville Warriors',
            scoreTeam2: '23'
          },
          location: {
            address: '106 Bluegrass Commons Blvd, Hendersonville, TN 37075',
            name: 'First Baptist Church'
          },
          level: '14U Boys'
        },
        {
          game: '3',
          date: 'Feburary 6th',
          time: '12:00 pm',
          matchup: {
            team1: 'Hendersonville Royals',
            scoreTeam1: '35',
            team2: 'Daniel 1 Academy',
            scoreTeam2: '52'
          },
          location: {
            address: '106 Bluegrass Commons Blvd, Hendersonville, TN 37075',
            name: 'First Baptist Church'
          },
          level: '14U Boys'
        },
        {
          game: '4',
          date: 'Feburary 6th',
          time: '1:00 pm',
          matchup: {
            team1: 'Life Christian Academy',
            scoreTeam1: '',
            team2: 'Western Kentucky Trailblazers',
            scoreTeam2: ''
          },
          location: {
            address: '106 Bluegrass Commons Blvd, Hendersonville, TN 37075',
            name: 'First Baptist Church'
          },
          level: '14U Boys'
        },
        {
          game: '5',
          date: 'Feburary 6th',
          time: '8:00 am',
          matchup: {
            team1: 'Nashville Warriors',
            scoreTeam1: '33',
            team2: 'Chattanooga Patriots',
            scoreTeam2: '53'
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Boys'
        },
        {
          game: '6',
          date: 'Feburary 6th',
          time: '9:30 am',
          matchup: {
            team1: 'Tennessee Heat',
            scoreTeam1: '53',
            team2: 'Hendersonville Royals',
            scoreTeam2: '55'
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Boys'
        },
        {
          game: '7',
          date: 'Feburary 6th',
          time: '11:00 am',
          matchup: {
            team1: 'Covenant Christian Academy',
            scoreTeam1: '40',
            team2: 'Western Kentucky Trailblazers',
            scoreTeam2: '50'
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Boys'
        },
        {
          game: '8',
          date: 'Feburary 6th',
          time: '12:30 pm',
          matchup: {
            team1: 'Daniel 1 Academy',
            scoreTeam1: '',
            team2: 'Life Christian Academy',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Boys'
        },
        {
          game: '9',
          date: 'Feburary 6th',
          time: '2:00 pm',
          matchup: {
            team1: 'Daniel 1 Academy',
            scoreTeam1: '',
            team2: 'Hendersonville Royals',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '16U Boys'
        },
        {
          game: '10',
          date: 'Feburary 6th',
          time: '3:00 pm',
          matchup: {
            team1: 'Covenant Christian Academy',
            scoreTeam1: '',
            team2: 'Western Kentucky Trailblazers',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '16U Boys'
        },
        {
          game: '11',
          date: 'Feburary 6th',
          time: '4:00 pm',
          matchup: {
            team1: 'Life Christian Academy',
            scoreTeam1: '',
            team2: 'Chattanooga Patriots',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '16U Boys'
        },
        {
          game: '12',
          date: 'Feburary 6th',
          time: '12:30 pm',
          matchup: {
            team1: 'Western Kentucky Trailblazers',
            scoreTeam1: '',
            team2: 'Bye',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '16U Boys'
        },

        {
          game: '13',
          date: 'Feburary 7th',
          time: '8:00 am',
          matchup: {
            team1: 'Nashville Warriors',
            scoreTeam1: '',
            team2: 'Hendersonville Royals',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '14U Boys'
        },
        {
          game: '14',
          date: 'Feburary 7th',
          time: '9:00 am',
          matchup: {
            team1: 'Chattanooga Patriots',
            scoreTeam1: '',
            team2: 'Loser Game 4',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '14U Boys'
        },
        {
          game: '15',
          date: 'Feburary 7th',
          time: '10:00 am',
          matchup: {
            team1: 'Covenant Christian Academy',
            scoreTeam1: '',
            team2: 'Daniel 1 Academy',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '14U Boys'
        },
        {
          game: '16',
          date: 'Feburary 7th',
          time: '11:00 am',
          matchup: {
            team1: 'Tennessee Heat',
            scoreTeam1: '',
            team2: 'Covenant Christian Academy',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '14U Boys'
        },
        {
          game: '17',
          date: 'Feburary 7th',
          time: '12:00 pm',
          matchup: {
            team1: 'Winner Game 10',
            scoreTeam1: '',
            team2: 'Winner Game 11',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '16U Boys'
        },
        {
          game: '18',
          date: 'Feburary 7th',
          time: '1:00 pm',
          matchup: {
            team1: 'Winner Game 9',
            scoreTeam1: '',
            team2: '#1 Seed',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '16U Boys'
        },
        {
          game: '19',
          date: 'Feburary 7th',
          time: '2:00 pm',
          matchup: {
            team1: 'Seed 3',
            scoreTeam1: '',
            team2: 'Seed 2',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Girls'
        },
        {
          game: '20',
          date: 'Feburary 7th',
          time: '3:30 pm',
          matchup: {
            team1: 'Seed 4',
            scoreTeam1: '',
            team2: 'Seed 1',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Girls'
        },
        {
          game: '21',
          date: 'Feburary 7th',
          time: '5:00 pm',
          matchup: {
            team1: 'Tennessee Heat',
            scoreTeam1: '',
            team2: 'Covenant Christian Academy',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Boys'
        },
        {
          game: '22',
          date: 'Feburary 7th',
          time: '6:30 pm',
          matchup: {
            team1: 'Nashville Warriors',
            scoreTeam1: '',
            team2: 'Loser Game 8',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Boys'
        },
        {
          game: '23',
          date: 'Feburary 7th',
          time: '8:10 pm',
          matchup: {
            team1: 'Hendersonville Royals',
            scoreTeam1: '',
            team2: 'Western Kentucky Trailblazers',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Boys'
        },
        {
          game: '24',
          date: 'Feburary 7th',
          time: '9:40 pm',
          matchup: {
            team1: 'Chattanooga Patriots',
            scoreTeam1: '',
            team2: 'Winner Game 8',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Boys'
        },
        {
          game: '25',
          date: 'Feburary 8th',
          time: '8:00 am',
          matchup: {
            team1: 'Loser Game 10',
            scoreTeam1: '',
            team2: 'Loser Game 11',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '16U Boys'
        },
        {
          game: '26',
          date: 'Feburary 8th',
          time: '9:00 am',
          matchup: {
            team1: 'Loser Game 19',
            scoreTeam1: '',
            team2: 'Loser Game 20',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Girls'
        },
        {
          game: '27',
          date: 'Feburary 8th',
          time: '10:00 am',
          matchup: {
            team1: 'Loser Game 9',
            scoreTeam1: '',
            team2: 'Winner Game 25',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '16U Boys'
        },
        {
          game: '28',
          date: 'Feburary 8th',
          time: '12:00 pm',
          matchup: {
            team1: 'Winner Game 15',
            scoreTeam1: '',
            team2: 'Winner Game 16',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '14U Boys'
        },
        {
          game: '29',
          date: 'Feburary 8th',
          time: '2:00 pm',
          matchup: {
            team1: 'Winner Game 17',
            scoreTeam1: '',
            team2: 'Winner Game 18',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '16U Boys'
        },
        {
          game: '30',
          date: 'Feburary 8th',
          time: '4:00 pm',
          matchup: {
            team1: 'Winner Game 19',
            scoreTeam1: '',
            team2: 'Winner Game 20',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Girls'
        },
        {
          game: '31',
          date: 'Feburary 8th',
          time: '6:00 pm',
          matchup: {
            team1: 'Winner Game 23',
            scoreTeam1: '',
            team2: 'Winner Game 24',
            scoreTeam2: ''
          },
          location: {
            address: '1045 Bison Trail, Gallatin, TN 37066',
            name: 'Welch College Gym'
          },
          level: '18U Boys'
        }
      ]
    }
  },
  computed: {
    fourteenUBoys () {
      return this.games.filter(game => { return game.level === '14U Boys' })
    },
    sixteenUBoys () {
      return this.games.filter(game => { return game.level === '16U Boys' })
    },
    eighteenUBoys () {
      return this.games.filter(game => { return game.level === '18U Boys' })
    },
    eighteenUGirls () {
      return this.games.filter(game => { return game.level === '18U Girls' })
    }
  },
  created () {
  },
  methods: {
    results (matchup) {
      if (parseInt(matchup.scoreTeam1) > parseInt(matchup.scoreTeam2)) {
        return matchup.team1
      } else {
        return matchup.team2
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.page-styles{
  min-height: 100vh;
  background-color: #fff;
  padding: 2rem 1rem;
  // margin-right: 1rem;
  // margin-left: 1rem;
}
h5 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.tournamentSchedule {
  margin-top: 4rem;
}
table {
  width: 100%;
  margin-bottom: 2rem;
  td, th {
    padding: .3rem .5rem;
  }
  th {
    font-weight: 200;
  }
  tbody tr {
    border-bottom: 1px solid #CFCDCD;
    // padding:.75rem;
  }
}
.winner {
  font-weight: 600;
}
.final {
  text-align: right;
  div{
    font-style: italic;
  }
}
.levelHead {
  padding:.75rem;
  background-color: rgba(39,132,195,1);
  color: #fff;
}
</style>
