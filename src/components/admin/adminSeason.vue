<template>
  <div class="">
    <header class="contentPad">
      <!-- <h2>{{this.$config.seasonYear}} Schedule <selectbox id="levels" :options="seasons" :trackby="'level'" placeholder="Select Level" v-model="newGame.season"></selectbox></h2> -->
      <div class="buttonCon">
        <div class="switch" v-if="edit === false"  @click="edit = !edit" :class="[edit === true ? 'selected' : '']">
          <font-awesome-icon :icon="edit === true ? ['fas', 'edit'] : ['far', 'edit']" class="icon"></font-awesome-icon>
          <span class="focused">Edit</span>
        </div>

        <div class="switch" v-if="edit" @click="edit = !edit">
          <font-awesome-icon :icon="['fas', 'check']" class="icon"></font-awesome-icon>
          <span class="focused">Done Editing</span>

        </div>
      </div>
    </header>

  <div class="contentPad">
    <editTable  :columns="columns" :config="config" :tabledata="seasons" v-model="new_season" :edit="edit">
      <template slot="tbody">
      </template>
      <template slot="tbody" v-if=" edit === true">
        <td class="input-con">
          <selectbox
            id="level"
            :options="levels"
            :trackby="'name'"
            placeholder="Select Level"
            v-model="new_season.level"
          ></selectbox>
        </td>
        <td class="input-con">
          <input type='text' v-model="new_season.season_name">
        </td>
        <td class="input-con">
          <input type='date' v-model="new_season.season_start_date">
        </td>
        <td class="input-con">
          <input type='date' v-model="new_season.roster_submission_deadline">
        </td>
        <td class="input-con">
          <input type='date' v-model="new_season.tournament_start_date">
        </td>
        <td class="input-con">
          <input type='text' v-model="new_season.year">
        </td>
        <td class="input-con">
          <input type='text' v-model="new_season.slug">
        </td>
        <td class="input-con">
          <input type='checkbox' v-model="new_season.archive">
        </td>
      </template>
      <template v-if="edit === false">
        Current Season: {{ currentSeason }}
      </template>
    </editTable>
  </div>

  </div>
</template>

<script>
import { api } from '@/api/endpoints'
// import _ from 'lodash'
import selectbox from '../selectbox'
import editTable from '@/components/editTable'

export default {
  name: 'adminSeasons',
  data () {
    return {
      years: [],
      currentSeason: [],
      edit: false,
      new_season: {
        level: {},
        season_name: '',
        season_start_date: '',
        roster_submission_deadline: '',
        tournament_start_date: '',
        sport: '',
        year: '',
        slug: '',
        archive: false
      },
      // seasons: [],
      columns: [
        {
          name: 'Level',
          icon: '',
          field_name: 'level',
          type: 'select'
        },
        {
          name: 'Season Name',
          icon: '',
          field_name: 'season_name',
          type: 'text'
        },
        {
          name: 'Season Start Date',
          icon: '',
          field_name: 'season_start_date',
          type: 'date'
        },
        {
          name: 'Roster Submission Deadline',
          icon: '',
          field_name: 'roster_submission_deadline',
          type: 'date'
        },
        {
          name: 'Tournament Start Date',
          icon: '',
          field_name: 'tournament_start_date',
          type: 'date'
        },
        {
          name: 'Year',
          icon: '',
          field_name: 'year',
          type: 'text'
        },
        {
          name: 'Slug',
          icon: '',
          field_name: 'slug',
          type: 'text'
        },
        {
          name: 'Archive',
          icon: '',
          field_name: 'archive',
          type: 'checkbox'
        }
      ],
      config: {
        page: 'season'
      }
    }
  },
  components: {
    selectbox: selectbox,
    editTable: editTable
  },
  computed: {
    seasons () {
      return this.$store.state.seasons
    },
    levels () {
      return this.$store.state.levels
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
