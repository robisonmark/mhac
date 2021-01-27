<template>
  <tr>
    <template v-if="edit === true || new_game === true">
      <td class="input-con">
        <input type="int" v-model="game.game" />
      </td>
      <td class="input-con">
        <input type="date" v-model="game.date" />
      </td>
      <td class="input-con">
        <input type="time" v-model="game.time" />
      </td>
      <td class="input-con">
        <input type='text' v-model="game.game_description"/>
      </td>
      <td class="input-con">
        <input type="int" v-model="game.matchup.team1Seed" />
      </td>
      <td class="input-con">
        {{game.matchup.team1}}
      </td> 
      <td class="input-con">
        <input type="int" v-model="game.matchup.team2Seed" />
      </td>
      <td class="input-con">
        {{game.matchup.team2}}
      </td> 
      <td class="input-con">
        <input type="int" v-model="game.matchup.team1Score" />
      </td>
      <td class="input-con">
        <input type="int" v-model="game.matchup.team2Score" />
      </td>
      <td class="input-con">
        <input type="int" v-model="game.matchup.winner_to" />
      </td>
      <td class="input-con">
        <input type="int" v-model="game.matchup.loser_to" />
      </td>
      <td class="input-con">
        <selectbox
          id="levels"
          :options="seasons"
          :trackby="'level'"
          placeholder="Select Level"
          v-model="game.seasons"
        ></selectbox>
      </td>
      <td>
        <font-awesome-icon :icon="['fas', 'save']" class="icon" @click="edit ? save(game): addGame(game)"></font-awesome-icon>
        <!-- <font-awesome-icon :icon="['fas', 'redo']" class="icon" @click="undo(game)"></font-awesome-icon> -->
      </td>
    </template>
    <template v-if="!edit && !new_game">
      <td class="input-con">
        {{game.game}}
      </td>
      <td class="input-con">
        {{game.date}}
      </td>
      <td class="input-con">
        {{game.time}}
      </td>
      <td class="input-con">
        {{game.game_description}}
      </td>
      <td class="input-con">
        {{game.matchup.team1Seed}}
      </td>
      <td class="input-con">
        {{game.matchup.team1}}
      </td> 
      <td class="input-con">
        {{game.matchup.team2Seed}}
      </td>
      <td class="input-con">
        {{game.matchup.team2}}
      </td> 
      <td class="input-con">
        {{game.matchup.team1Score}}
      </td>
      <td class="input-con">
        {{game.matchup.team2Score}}
      </td>
      <td class="input-con">
        {{game.matchup.winner_to}}
      </td>
      <td class="input-con">
        {{game.matchup.loser_to}}
      </td>
      <td class="input-con">
        {{game.seasons.level}}
      </td>
      <td>
        <font-awesome-icon :icon="['far', 'edit']" class="icon" @click="toggleEdit"></font-awesome-icon>
      </td>

    </template>
  </tr>
</template>

<script>
import { api } from '@/api/endpoints';
import selectbox from "../selectbox";

// mixins
import { root } from '@/mixins/root';


export default {
  name: "tournamentGame",
  data() {
    return {
      edit: false
    };
  },
  props: ["game", "new_game"],
  components: {
    selectbox: selectbox,
  },
  computed: {
    seasons () {
      return this.$store.state.seasons
    }
  },
  methods: {
    toggleEdit () {
      console.log("Edit")
      this.$root.$emit('toggleEdit')
      this.edit = !this.edit
    },
    addGame (game){
      console.log("AddGame")
      this.$emit('add-game', game)
      this.$root.$emit('newGame')
    },
    save (game) {
      console.log(game)
      this.toggleEdit()

    },
    lookupTeam (val) {
      if (val !== null) {
        console.log(val)
        api.getTeamByStandings(this.game.seasons.season_id, val).then(response => {
          console.log(response.data.team_name)
          this.game.matchup.team1 = response.data.team_name
        })
      }
    }
  },
  watch: {
    'game.matchup.team1Seed': {
      handler (newValue) {
        this.lookupTeam(newValue)
      }
    },
    'game.matchup.team2Seed': {
      handler (newValue) {
        this.lookupTeam(newValue)
      }
    },
    'game.seasons': {
      handler (newValue) {
        this.lookupTeam(newValue)
      }
    },
  }
};
</script>

<style scoped lang="less">
@import '../../assets/less/utils/variables.less';
@import '../../assets/less/utils/breakpoints.less'; 

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

</style>