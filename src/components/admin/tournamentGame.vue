<template>
  <tr>
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
      <input type="int" v-model="game.matchup.team1Seed" />
    </td>
    <td class="input-con">
      <input type="int" v-model="game.matchup.team2Seed" />
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
    <td @click="save(newGame)">
      <font-awesome-icon :icon="['fas', 'save']" class="icon"></font-awesome-icon>
    </td>
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
    };
  },
  props: ["game"],
  components: {
    selectbox: selectbox,
  },
  computed: {
    seasons () {
      return this.$store.state.seasons
    }
  },
  methods: {
    save () {

    },
    lookupTeam (val) {
      console.log(val)
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