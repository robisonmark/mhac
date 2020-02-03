<template>
   <div class="container">
     <div class="page-styles">
      <h2>MHAC Conference Tournament Information - 2020</h2>
      <h5><a href="/static/docs/MHAC Conference 2020 Tournament.pdf" class="download" download>Download Tournament Packet</a></h5>
      <p>The 2019-2020 MHAC Conference Tournament will be being Thursday Feburary 6th at <a href="https://welch.edu/">Welch College</a> in Gallatin, Tennessee. Games being at 8:00am CST at the <a href="https://goo.gl/maps/tBuQfnHmC19ZZste9">Welch College Gym</a>.  Please <a href="/static/docs/MHAC Conference 2020 Tournament.pdf" class="download" download>download the tournament packet</a> for more information.</p>
      <p>Because of our initial growth we are using a second gym the first day where the initial 14u games will be played.  It is First Baptist Church Hendersonville.  <a href="https://goo.gl/maps/jkkQnVX1KjcR7VpH9">106 Bluegrass Commons Blvd, Hendersonville, TN 37075</a>.  The 14u families will report to that gym directly Thursday morning.</p>
      <div class="tournamentSchedule">
        <table>
          <thead>
            <tr class="levelHead">
              <td colspan="5">14U Boys</td>
            <tr>
            <tr>
              <th>Game #</th>
              <th>Date</th>
              <th>Time</th>
              <th>Matchup</th>
              <th class="text-right"><font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in fourteenUBoys" :key="index">
              <td>{{game.game}}</td>
              <td>{{game.date}}</td>
              <td>{{game.time}}</td>
              <td>{{game.matchup.team1}} vs. {{game.matchup.team2}}</td>
              <td class="text-right"><a :href="'https://maps.google.com/?q=' + game.location.address">{{game.location.name}}</a></td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr class="levelHead">
              <td colspan="5">16U Boys</td>
            <tr>
            <tr>
              <th>Game #</th>
              <th>Date</th>
              <th>Time</th>
              <th>Matchup</th>
              <th class="text-right"><font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in sixteenUBoys" :key="index">
              <td>{{game.game}}</td>
              <td>{{game.date}}</td>
              <td>{{game.time}}</td>
              <td>{{game.matchup.team1}} vs. {{game.matchup.team2}}</td>
              <td class="text-right"><a :href="'https://maps.google.com/?q=' + game.location.address">{{game.location.name}}</a></td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr class="levelHead">
              <td colspan="5">18U Boys</td>
            <tr>
            <tr>
              <th>Game #</th>
              <th>Date</th>
              <th>Time</th>
              <th>Matchup</th>
              <th class="text-right"><font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in eighteenUBoys" :key="index">
              <td>{{game.game}}</td>
              <td>{{game.date}}</td>
              <td>{{game.time}}</td>
              <td>{{game.matchup.team1}} vs. {{game.matchup.team2}}</td>
              <td class="text-right"><a :href="'https://maps.google.com/?q=' + game.location.address">{{game.location.name}}</a></td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr class="levelHead">
              <td colspan="5">18U Girls</td>
            <tr>
            <tr>
              <th>Game #</th>
              <th>Date</th>
              <th>Time</th>
              <th>Matchup</th>
              <th class="text-right"><font-awesome-icon :icon="['fas', 'map-marker-alt']"></font-awesome-icon> Location</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in eighteenUGirls" :key="index">
              <td>{{game.game}}</td>
              <td>{{game.date}}</td>
              <td>{{game.time}}</td>
              <td>{{game.matchup.team1}} vs. {{game.matchup.team2}}</td>
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
            team1: 'Seed 5',
            team2: 'Seed 4'
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
            team1: 'Seed 6',
            team2: 'Seed 3'
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
            team1: 'Seed 7',
            team2: 'Seed 2'
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
            team1: 'Seed 8',
            team2: 'Seed 1'
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
            team1: 'Seed 5',
            team2: 'Seed 4'
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
            team1: 'Seed 6',
            team2: 'Seed 3'
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
            team1: 'Seed 7',
            team2: 'Seed 2'
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
            team1: 'Seed 8',
            team2: 'Seed 1'
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
            team1: 'Seed 5',
            team2: 'Seed 4'
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
            team1: 'Seed 6',
            team2: 'Seed 3'
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
            team1: 'Seed 7',
            team2: 'Seed 2'
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
            team1: 'Seed 1',
            team2: 'Bye'
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
            team1: 'Loser Game 2',
            team2: 'Loser Game 3'
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
            team1: 'Loser Game 1',
            team2: 'Loser Game 4'
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
            team1: 'Winner Game 2',
            team2: 'Winner Game 3'
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
            team1: 'Winner Game 1',
            team2: 'Winner Game 2'
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
            team2: 'Winner Game 11'
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
            team2: '#1 Seed'
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
            team2: 'Seed 2'
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
            team2: 'Seed 1'
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
            team1: 'Loser Game 6',
            team2: 'Loser Game 7'
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
            team1: 'Loser Game 5',
            team2: 'Loser Game 8'
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
            team1: 'Winner Game 6',
            team2: 'Winner Game 7'
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
            team1: 'Winner Game 5',
            team2: 'Winner Game 8'
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
            team2: 'Loser Game 11'
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
            team2: 'Loser Game 20'
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
            team2: 'Winner Game 25'
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
            team2: 'Winner Game 16'
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
            team2: 'Winner Game 18'
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
            team2: 'Winner Game 20'
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
            team2: 'Winner Game 24'
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
.levelHead {
  padding:.75rem;
  background-color: rgba(39,132,195,1);
  color: #fff;
}
</style>
