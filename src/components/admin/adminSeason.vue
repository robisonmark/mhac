<template>
  <div class="">
    <template v-if=" edit === true">
      <td class="input-con">
        "Levels Dropdown or all levels"
        <selectbox
          id="levels"
          :options="seasons"
          :trackby="'level'"
          placeholder="Select Level"
          v-model="new_season.level"
        ></selectbox>
      </td>
      <td class="input-con">
        "season_name str input"
      </td>
      <td class="input-con">
        "date picker season_start_date"
        <input type='date' v-model="new_season.season_start_date">
      </td>
      <td class="input-con">
        "date picker roster submission deadline "
      </td>
      <td class="input-con">
        "date picker tournamentdate"
      </td>
      <td class="input-con">
        "year dropdown"
      </td>
      <td class="input-con">
        "slug if individual level otherwise auto generate in the pattern season_name_level_name_sport_name"
      </td>
    </template>
    <template v-if="edit === false">
      Current Season: {{ currentSeason }}
    </template>

  </div>
</template>

<script>
import { api } from '@/api/endpoints'
// import _ from 'lodash'
import selectbox from '../selectbox'

export default {
  name: 'adminSeasons',
  data () {
    return {
      years: [],
      currentSeason: [],
      edit: true,
      new_season: {
        level: '',
        season_name: '',
        season_start_date: '',
        roster_submission_deadline: '',
        tournament_start_date: '',
        sport: '',
        year: '',
        slug: ''
      }
    }
  },
  components: {
    selectbox: selectbox
  },
  computed: {
    seasons () {
      return this.$store.state.seasons
    }
  },
  created () {
    this.getCurrentSeason()
  },
  methods: {
    getCurrentSeason () {
      api.getCurrentSeasons().then(response => {
        this.currentSeason = response.data
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "../../assets/less/utils/variables.less";
@import "../../assets/less/utils/breakpoints.less";

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
  flex-grow: 0.5;
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
    content: "";
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

@media @phone {
}
</style>
