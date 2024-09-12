<template>
  <div class="">
    <header class="contentPad">
      <div class="buttonCon">
        <div class="switch">

        </div>
      </div>
    </header>

    <div class="contentPad">
      <editTable :columns="columns" :config="config" :tabledata="tournamentGameData" v-model="tournamentGame" :edit="edit"
        @lookup="updateBracket">

        <!-- <template v-slot:tbody>
          <tournamentGame v-for="(data, index) in games" :game="data" :key="index" />
          <template v-if="newGame">
            <tournamentGame :game=newTournamentGame :new_game=true @add-game="addGame" />
          </template> -->
          <!-- <div>
            <font-awesome-icon :icon="['fas', 'plus']" class="icon" @click="newGame = !newGame"></font-awesome-icon>
            Add Tournament Game
          </div>

        </template> -->
      </editTable>
    </div>

    <div class="tournamentSchedule">
      <!-- <button @click="save()">
        Save
      </button> -->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Admin from '@/api/admin';
import editTable from '@/components/editTable';
// import tournamentGame from './tournamentGame.vue';
import _ from 'lodash';

const games = ref([]);
const oldBracket = ref([]);
const newGame = ref(false);
const tournamentGameData = reactive({
  logical_game_number: '',
  game: '',
  date: '',
  time: '',
  game_description: '',
  matchup: {
    // team1: '',
    // team1Seed: '',
    // team2: '',
    // team2Seed: '',
    // winner_to: '',
    // loser_to: ''
  },
  location: {
    address: '',
    name: ''
  },
  seasons: {},
  display: false
});
const columns = [
  {
    name: 'Game_Number',
    field_name: 'game',
    type: 'number'
  },
  {
    name: 'Date',
    field_name: 'date',
    type: 'date'
  },
  {
    name: 'Time',
    field_name: 'time',
    type: 'time'
  },
  {
    name: 'Description',
    field_name: 'Game Description',
    type: 'text'
  },
  {
    name: 'Home Seed',
    field_name: 'matchup.team1Seed',
    type: 'text'
  },
  {
    name: 'Home Team',
    field_name: 'matchup.team1',
    type: 'text'
  },
  {
    name: 'Away Seed',
    field_name: 'matchup.team2Seed',
    type: 'text'
  },
  {
    name: 'Away team',
    field_name: 'matchup.team2',
    type: 'text'
  },
  {
    name: 'Home Score',
    field_name: 'matchup.team1Score',
    type: 'number'
  },
  {
    name: 'Away Score',
    field_name: 'matchup.team2Score',
    type: 'number'
  },
  {
    name: 'Winner To Game',
    field_name: 'matchup.winners_to',
    type: 'text'
  },
  {
    name: 'Loser To Game',
    field_name: 'matchup.losers_to',
    type: 'text'
  },
  {
    name: 'Tournament Level',
    field_name: 'tournament',
    type: 'text'
  },
  {
    name: 'Display',
    field_name: 'display',
    type: 'boolean'
  }
]
const config = {
  page: 'tournament'
};
const edit = ref(false);
const activeTournaments = ref([]);
const newTournamentGame = reactive({
  logical_game_number: '',
  game: '',
  date: '',
  time: '',
  game_description: '',
  matchup: {
    // team1: '',
    // team1Seed: '',
    // team2: '',
    // team2Seed: '',
    // winner_to: '',
    // loser_to: ''
  },
  location: {
    address: '',
    name: ''
  },
  seasons: {},
  display: false
});
const tournament = ref([]);

const initTourney = () => {
  Admin.getTournamentInformation().then(response => {
    games.value = response.data.games;
  }).catch(err => {
    console.log(err);
  });
};

const updateBracket = (game) => {
  // if (game.matchup.scoreTeam1 !== '' && game.matchup.scoreTeam2 !== '') {
  //   // Handle bracket update logic
  // } else if (oldBracket.value.length > 0) {
  //   // Handle resetting bracket
  // }
};

const addGame = (game) => {
  games.value.push(game);
};

const results = (matchup) => {
  if (parseInt(matchup.scoreTeam1) > parseInt(matchup.scoreTeam2)) {
    return matchup.team1;
  } else {
    return matchup.team2;
  }
};

const newLookup = () => {
  // Implement your logic
};

const lookupTeam = (teamSeed, seasonId, team) => {
  // TODO: Figure out Use
  if (teamSeed !== null && this.game.seasons.season_id !== undefined) {
    Admin.getTeamByStandings(this.game.seasons.season_id, teamSeed).then(response => {
      if (team === 1) {
        this.game.matchup.team1 = response.data.team_name
      }
      if (team === 2) {
        this.game.matchup.team2 = response.data.team_name
      }
    })
  }
};


</script>


<style scoped lang="less">
@import '../../assets/less/utils/variables.less';
@import '../../assets/less/utils/breakpoints.less';

main {
  display: flex;
  flex-direction: row;
}

.round {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200px;
  list-style: none;
  padding: 0;
}

.round .spacer {
  flex-grow: 1;
}

.round .spacer:first-child,
.round .spacer:last-child {
  flex-grow: .5;
}

.round .game-spacer {
  flex-grow: 1;
}

/*
 *  General Styles
*/
body {
  font-family: sans-serif;
  font-size: small;
  padding: 10px;
  line-height: 1.4em;
}

li.game {
  padding-left: 20px;
}

li.game.winner {
  font-weight: bold;
}

li.game span {
  float: right;
  margin-right: 5px;
}

li.game-top {
  border-bottom: 1px solid #aaa;
}

li.game-spacer {
  border-right: 1px solid #aaa;
  min-height: 40px;
}

li.game-bottom {
  border-top: 1px solid #aaa;
}

table {

  // margin-top: -40px;
  &:before {
    content: '';
    display: block;
    height: 40px;
    width: 100%;
    width: calc(100% + 2.4rem);
    border-left: 2px solid transparent;
    position: absolute;
    -webkit-transform: skewX(-45deg);
    transform: skewX(-45deg);
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

@media @phone {}
</style>
