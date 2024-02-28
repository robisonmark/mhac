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
        <template #body v-if="edit">

          <tr v-for="season in seasonArr" :key="season.id">
            <td class="input-con">
              <multiselect v-model="season.level" label="level_name" track-by="level_id" :options=levels
                :closeOnSelect="false" :optionHeight="10" :multiple="False" :taggable="true" :hideSelected="true">
              </multiselect>
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


<script setup>
import { ref, reactive, watch, computed } from 'vue';
import api from '@/api/endpoints.js';
import editTable from '@/components/editTable.vue'
// import selectbox from '@/components/selectbox.vue'
import { useStore } from 'vuex';

// Components
import Multiselect from 'vue-multiselect';

// Get Vuex store
const store = useStore();


// Data
const years = ref([]);
const currentSeason = ref([]);
const edit = ref(false);
const seasonArr = ref([]);
const new_season = reactive({
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
const columns = [
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
];
const config = {
  page: 'season'
};
const saving = ref(false);
const saved = ref(false);
const updated = ref([]);
const added = ref([]);

const levels = computed(() => store.state.levels);
const teams = computed(() => store.state.teams);


// Methods
const addToUpdateList = (id) => {
  let add = true;
  for (let i = 0; i < updated.value.length; i++) {
    if (updated.value[i] === id) {
      add = false;
    }
  }
  if (add) {
    updated.value.push(id);
  }
};

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
        console.log(err);
      });
  }
  if (added.value.length > 0) {
    added.value.forEach(season => {
      api.addSeason(season)
        .then(response => {
          initNewSeason();
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
  edit.value = !edit.value;
};

const initNewSeason = () => {
  new_season.level = [];
  new_season.season_name = '';
  // Initialize other fields
};

// Lifecycle hooks
seasons();
getCurrentSeason();

// Watchers
watch(new_season, (newValue) => {
  const idx = added.value.indexOf(newValue);
  if (idx >= 0) {
    added.value[idx] = newValue;
  } else {
    added.value.push(newValue);
  }
}, { deep: true });

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
