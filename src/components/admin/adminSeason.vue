<template>
  <div class="">
    <header class="contentPad">
      <h2> Manage Seasons </h2>
      <!-- <h2>{{this.$config.seasonYear}} Schedule <selectbox id="levels" :options="seasons" :trackby="'level'" placeholder="Select Level" v-model="newGame.season"></selectbox></h2> -->
      <div class="buttonCon">
        <div class="switch" v-if="edit === false" @click="edit = !edit" :class="[edit === true ? 'selected' : '']">
          <font-awesome-icon :icon="edit === true ? ['fas', 'edit'] : ['far', 'edit']" class="icon"></font-awesome-icon>
          <span class="focused">Edit</span>
        </div>

        <div class="switch" v-if="edit" @click="save()">
          <font-awesome-icon :icon="saved === false ? ['fas', 'save'] : ['fas', 'check']" class="icon"
            v-if="!saving"></font-awesome-icon>
          <span class="focused" v-if="!saving">Save</span>
          <span v-else>saving...</span>
        </div>
      </div>
    </header>

    <div class="contentPad">
      <editTable :columns="columns" :config="config" :tabledata="seasonArr" :edit="edit" v-model="new_season">

        <template slot="tbody" v-if="edit">
          <tr v-for="(season, index) in seasonArr" :key="index">
            <td class="input-con">
              <selectbox id='level' :options=levels :trackby="level_name" v-model="season.level"></selectbox>
            </td>
            <td class="input-con">
              <input type='text' v-model="season.season_name" @input="addToUpdateList(season)">
            </td>
            <td class="input-con">
              <input type='date' v-model="season.season_start_date" @input="addToUpdateList(season)">
            </td>
            <td class="input-con">
              <input type='date' v-model="season.roster_submission_deadline" @input="addToUpdateList(season)">
            </td>
            <td class="input-con">
              <input type='date' v-model="season.tournament_start_date" @input="addToUpdateList(season)">
            </td>
            <td class="input-con">
              <input type='text' v-model="season.year" @input="addToUpdateList(season)">
            </td>
            <td class="input-con">
              <input type='text' v-model="season.slug" @input="addToUpdateList(season)">
            </td>
            <td class="input-con">
              <input type='checkbox' v-model="season.archive" @input="addToUpdateList(season)">
            </td>
            <multiselect v-model="season.season_teams" label="team_name" track-by="team_id" :options="teams"
              :closeOnSelect="false" :optionHeight="20" :multiple="true" :taggable="true" :hideSelected="true"
              @input="addToUpdateList(season)">
            </multiselect>
          </tr>
          <tr>
            <td class="input-con">
              <multiselect v-model="new_season.level" label="level_name" track-by="level_id" :options=levels
                :closeOnSelect="false" :optionHeight="10" :multiple="true" :taggable="true" :hideSelected="true">
              </multiselect>
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
            <multiselect v-model="new_season.season_teams" label="team_name" track-by="team_id" :options="teams"
              :closeOnSelect="false" :optionHeight="10" :multiple="true" :taggable="true" :hideSelected="true">
            </multiselect>
          </tr>
        </template>
      </editTable>
    </div>

  </div>
</template>

<script>
import { ref, watch } from 'vue';

import api from '@/api/endpoints'
import editTable from '@/components/editTable.vue'
import { computed } from 'vue'

import { useStore } from 'vuex';

// third party
import Multiselect from 'vue-multiselect'
import selectbox from '../selectbox.vue'

export default {
  name: 'adminSeasons',
  // data () {
  //   return {
  //     years: [],
  //     currentSeason: [],
  //     edit: false,
  //     seasonArr: [],
  //     new_season: {
  //       level: [],
  //       season_name: '',
  //       season_start_date: '',
  //       roster_submission_deadline: '',
  //       tournament_start_date: '',
  //       sport: 'Basketball',
  //       year: '',
  //       slug: '',
  //       archive: false,
  //       season_teams: []
  //     },
  //     columns: [
  //       {
  //         name: 'Levels',
  //         icon: '',
  //         field_name: 'level',
  //         type: 'multiselect',
  //         track_by: 'id',
  //         model: 'level.level_name'
  //       },
  //       {
  //         name: 'Season Name',
  //         field_name: 'season_name',
  //         type: 'text'
  //       },
  //       {
  //         name: 'Season Start Date',
  //         icon: '',
  //         field_name: 'season_start_date',
  //         type: 'date'
  //       },
  //       {
  //         name: 'Roster Submission Deadline',
  //         icon: '',
  //         field_name: 'roster_submission_deadline',
  //         type: 'date'
  //       },
  //       {
  //         name: 'Tournament Start Date',
  //         icon: '',
  //         field_name: 'tournament_start_date',
  //         type: 'date'
  //       },
  //       {
  //         name: 'Year',
  //         icon: '',
  //         field_name: 'year',
  //         type: 'text'
  //       },
  //       {
  //         name: 'Slug',
  //         icon: '',
  //         field_name: 'slug',
  //         type: 'text'
  //       },
  //       {
  //         name: 'Archive',
  //         icon: '',
  //         field_name: 'archive',
  //         type: 'checkbox'
  //       },
  //       {
  //         name: 'SeasonTeams',
  //         icon: '',
  //         field_name: 'team_name',
  //         type: 'multiselect',
  //         track_by: 'team_id',
  //         model: 'team_name'
  //       }
  //     ],
  //     config: {
  //       page: 'season'
  //     },
  //     saving: false,
  //     saved: false,
  //     updated: [],
  //     added: []
  //   }
  // },
  components: {
    editTable: editTable,
    Multiselect,
    selectbox: selectbox
  },
  setup(props) {
    const store = useStore();

    const years = ref([]);
    const edit = ref(false);
    const currentSeason = ref([]);
    const seasonArr = ref([]);
    const new_season = ref({
      level: [],
      season_name: '',
      season_start_date: '',
      roster_submission_deadline: '',
      tournament_start_date: '',
      sport: 'Basketball',
      year: '',
      slug: '',
      archive: false,
      season_teams: []
    });

    const columns = ref([
      {
        name: 'Levels',
        icon: '',
        field_name: 'level',
        type: 'multiselect',
        track_by: 'id',
        model: 'level_name'
      },
      {
        name: 'Season Name',
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
      },
      {
        name: 'SeasonTeams',
        icon: '',
        field_name: 'team_name',
        type: 'multiselect',
        track_by: 'team_id',
        model: 'team_name'
      }
    ]);

    const config = ref({
      page: 'season'
    });

    const saving = ref(false);
    const saved = ref(false);
    const updated = ref([]);
    const added = ref([]);

    // watch(() => props.new_season, (newValue) => {
    //   const idx = added.indexOf(newValue)
    //   if (idx >= 0) {
    //     added[idx] = newValue
    //   } else {
    //     added.push(newValue)
    //   }
    // });
    // console.log(this.$store)
    const levels = ref(store.state.levels);
    const teams = ref(store.state.teams);


    const seasons = () => {
      api.getAdminSeasons().then(response => {
        seasonArr.value = response.data;
      });
    };

    const getCurrentSeason = () => {
      api.getCurrentSeasons().then(response => {
        currentSeason.value = response.data;
      });
    };

    const save = () => {
      if (updated.value.length > 0) {
        api.updateSeason(updated.value)
          .then(response => {
            updated.value = [];
          })
          .catch(err => {
            console.error(err);
          });
      }

      if (added.value.length > 0) {
        added.value.forEach(season => {
          api.addSeason(season)
            .then(response => {
              initNewSeason();
            })
            .catch(err => {
              console.error(err);
            });
        });
      }

      edit.value = !edit.value;
    };

    const initNewSeason = () => {
      new_season.value = {
        level: [],
        season_name: '',
        season_start_date: '',
        roster_submission_deadline: '',
        tournament_start_date: '',
        sport: '',
        year: '',
        slug: '',
        archive: false
      };
    };
    // computed: {
    //   levels () {
    //     return this.$store.state.levels
    //   },
    //   teams () {
    //     return this.$store.state.teams
    //   }
    // },
    // created () {
    //   this.seasons()
    //   this.getCurrentSeason()
    // },
    // watch: {
    //   new_season: {
    //     deep: true,
    //     handler (newValue) {
    //       const idx = this.added.indexOf(newValue)
    //       if (idx >= 0) {
    //         this.added[idx] = newValue
    //       } else {
    //         this.added.push(newValue)
    //       }
    //     }
    //   }
    // },
    // methods: {
    //   addToUpdateList (id) {
    //     console.log("UpdateList", id)
    //     let add = true
    //     let i = 0
    //     for (i = 0; i < this.updated.length; i++) {
    //       if (this.updated[i] === id) {
    //         add = false
    //       }
    //     }
    //     if (add) {
    //       this.updated.push(id)
    //     }
    //   },
    //   seasons () {
    //     api.getAdminSeasons().then(response => {
    //       this.seasonArr = response.data
    //     })
    //   },
    //   getCurrentSeason () {
    //     api.getCurrentSeasons().then(response => {
    //       this.currentSeason = response.data
    //     })
    //   },
    //   save () {
    //     console.log(JSON.stringify(this.updated))
    //     if (this.updated.length > 0) {
    //       api.updateSeason(this.updated)
    //         .then(response => {
    //           this.updated = []
    //         })
    //         .catch(err => {
    //           console.log(err)
    //         })
    //     }
    //     // console.log(this.added.length)
    //     if (this.added.length > 0) {
    //       this.added.forEach(season => {
    //         api.addSeason(season)
    //           .then(response => {
    //             // console.log(response)
    //             this.initNewSeason()
    //           })
    //           .catch(err => {
    //             console.log(err)
    //           })
    //       })
    //     }
    //     // this.seasons()
    //     this.edit = !this.edit
    //   },
    //   initNewSeason () {
    //     this.new_season = {
    //       level: [],
    //       season_name: '',
    //       season_start_date: '',
    //       roster_submission_deadline: '',
    //       tournament_start_date: '',
    //       sport: '',
    //       year: '',
    //       slug: '',
    //       archive: false
    //     }
    //   }
    // }
    return {
      years,
      currentSeason,
      edit,
      seasonArr,
      new_season,
      columns,
      config,
      saving,
      saved,
      updated,
      added,
      levels,
      teams,
      seasons,
      getCurrentSeason,
      save,
      initNewSeason
    };

  },
  created() {
    this.seasons();
    this.getCurrentSeason();
  },
  watch: {
    new_season: {
      deep: true,
      handler(newValue) {
        const idx = this.added.indexOf(newValue);
        if (idx >= 0) {
          this.added[idx] = newValue;
        } else {
          this.added.push(newValue);
        }
      }
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
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

@media @phone {}

.multiselect__tag {
  position: relative;
  display: inline-block;
  padding: 4px 26px 4px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: #fff;
  line-height: 1;
  background: @nav-blue;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}
</style>
