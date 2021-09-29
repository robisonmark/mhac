<template>
  <div class="">
    <header class="contentPad">
      <!-- <h2>{{this.$config.seasonYear}} Schedule <selectbox id="levels" :options="seasons" :trackby="'level'" placeholder="Select Level" v-model="newGame.season"></selectbox></h2> -->
      <div class="buttonCon">
        <div class="switch" v-if="edit === false"  @click="edit = !edit" :class="[edit === true ? 'selected' : '']">
          <font-awesome-icon :icon="edit === true ? ['fas', 'edit'] : ['far', 'edit']" class="icon"></font-awesome-icon>
          <span class="focused">Edit</span>
        </div>

        <!-- <div class="switch" v-if="edit" @click="edit = !edit">
          <font-awesome-icon :icon="['fas', 'check']" class="icon"></font-awesome-icon>
          <span class="focused">Done Editing</span>
        </div> -->
        <div class="switch" v-if="edit" @click="save()">
          <font-awesome-icon :icon="saved === false ? ['fas', 'save'] : ['fas', 'check']" class="icon" v-if="!saving"></font-awesome-icon>
          <span class="focused" v-if="!saving">Save</span>
          <span v-else>saving...</span>
        </div>
      </div>
    </header>

  <div class="contentPad">
    <editTable  :columns="columns" :config="config" :tabledata="seasons" v-model="new_season" :edit="edit">
      <template slot="tbody">
      </template>
      <template slot="tbody" v-if="edit">
        <tr v-for="(season, index) in seasons" :key="index">
          <td class="input-con">
            <multiselect
              v-model="season.level"
              label="name"
              track-by="id"
              :options="levels"
              :closeOnSelect="false"
              :optionHeight="10"
              :multiple="false"
              :taggable="true"
              :hideSelected="true"
            ></multiselect>
          </td>
          <td class="input-con">
            <input type='text' v-model="season.season_name">
          </td>
          <td class="input-con">
            <input type='date' v-model="season.season_start_date">
          </td>
          <td class="input-con">
            <input type='date' v-model="season.roster_submission_deadline">
          </td>
          <td class="input-con">
            <input type='date' v-model="season.tournament_start_date">
          </td>
          <td class="input-con">
            <input type='text' v-model="season.year">
          </td>
          <td class="input-con">
            <input type='text' v-model="season.slug">
          </td>
          <td class="input-con">
            <input type='checkbox' v-model="season.archive">
          </td>
        </tr>
        <tr>
          <td class="input-con">
            <multiselect
              v-model="new_season.level"
              label="name"
              :options="levels"
              :closeOnSelect="false"
              :optionHeight="10"
              :multiple="true"
              :taggable="true"
              :hideSelected="true"
            ></multiselect>
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
        </tr>
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
// import selectbox from '../selectbox'
import editTable from '@/components/editTable'

// third party
import Multiselect from 'vue-multiselect'

export default {
  name: 'adminSeasons',
  data () {
    return {
      years: [],
      currentSeason: [],
      edit: false,
      new_season: {
        level: '',
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
        // {
        //   name: 'Level',
        //   icon: '',
        //   field_name: 'level',
        //   type: 'multiselect',
        //   track_by: 'name',
        //   model: 'season.levels'
        // },
        {
          name: 'Season Name',
          icon: '',
          field_name: 'season_names',
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
        // {
        //   name: 'Slug',
        //   icon: '',
        //   field_name: 'slug',
        //   type: 'text'
        // },
        {
          name: 'Archive',
          icon: '',
          field_name: 'archive',
          type: 'checkbox'
        }
      ],
      config: {
        page: 'season'
      },
      saving: false,
      saved: false,
      updated: []
    }
  },
  components: {
    editTable: editTable,
    Multiselect
  },
  computed: {
    seasons () {
      const seasonArr = []
      api.getAdminSeasons().then(response=> {
        this.seasonArr = response.data
        console.log(JSON.stringify(this.seasonArr))
      })
      
      return this.seasonArr
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
    },
    save () {
      // console.log(this.new_season)
      this.edit = !this.edit
    },
    initNewSeason () {
      this.new_season = {
        level: {},
        season_name: '',
        season_start_date: '',
        roster_submission_deadline: '',
        tournament_start_date: '',
        sport: '',
        year: '',
        slug: '',
        archive: false
      }
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
