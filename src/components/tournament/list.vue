<template>
  <div class="tournamentSchedule">
    <table v-for="(level, index) in games" :key="index">
      <thead>
        <tr class="levelHead">
          <td colspan="6">{{index}}</td>
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
        <tr v-for="(game, index) in level" :key="index">
          <td>{{game.game}}</td>
          <td>{{game.date}}</td>
          <td>{{game.time}}</td>
          <td >
            <template v-if="(game.matchup.team1 !== null || game.matchup.team2 !== null) && game.display">
              <span :class="[game.matchup.scoreTeam1 && game.matchup.team1 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team1"></span>
              vs.
              <span :class="[game.matchup.scoreTeam1 && game.matchup.team2 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team2"></span>
            </template>
            <template v-else>
              <span > {{game.game_description}} </span>
            </template>
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

    <!-- <table>
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
            <template v-if="(game.matchup.team1 !== null || game.matchup.team2 !== null) && game.display">
              <span :class="[game.matchup.scoreTeam1 && game.matchup.team1 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team1"></span>
              vs.
              <span :class="[game.matchup.scoreTeam1 && game.matchup.team2 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team2"></span>
            </template>
            <template v-else>
              <span > {{game.game_description}} </span>
            </template>
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
            <template v-if="(game.matchup.team1 !== null || game.matchup.team2 !== null) && game.display">
              <span :class="[game.matchup.scoreTeam1 && game.matchup.team1 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team1"></span>
              vs.
              <span :class="[game.matchup.scoreTeam1 && game.matchup.team2 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team2"></span>
            </template>
            <template v-else>
              <span > {{game.game_description}} </span>
            </template>
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
            <template v-if="(game.matchup.team1 !== null || game.matchup.team2 !== null) && game.display">
              <span :class="[game.matchup.scoreTeam1 && game.matchup.team1 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team1"></span>
              vs.
              <span :class="[game.matchup.scoreTeam1 && game.matchup.team2 === results(game.matchup) ? 'winner' : '']" v-html="game.matchup.team2"></span>
            </template>
            <template v-else>
              <span > {{game.game_description}} </span>
            </template>
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
    </table> -->
  </div>
</template>

<script>
export default {
  name: 'TournamentList',
  data () {
    return {
    }
  },

  props: ['games'],

  computed: {
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

<style scoped lang="less">
.tournamentSchedule {
  // margin-top: 4rem;
}

table {
  width: 100%;
  margin-bottom: 2rem;
  td, th {
    padding: .3rem .75rem;
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

</style>
