<template>
  <div class="hello">
    <header class="contentPad">
      <!-- <h2>{{config.seasonYear}} Schedule</h2> -->
      <selectbox id="levels" :options="seasons" :trackby="'level'" placeholder="Select Level" :label="'level'"
        v-model="newGame.season">
      </selectbox> 
      <div class="buttonCon">
        <div class='switch' @click="toggleModal">
          <font-awesome-icon :icon="['fas', 'file-import']" class="icon"></font-awesome-icon>
          <span class="focused">Upload Roster File</span>
          &nbsp;
        </div>
        <div class="switch" v-if="!edit" @click="toggleEdit" :class="[edit ? 'selected' : '']">
          <font-awesome-icon :icon="edit ? ['fas', 'edit'] : ['far', 'edit']" class="icon"></font-awesome-icon>
          <span class="focused">Edit</span>
        </div>

        <div class="switch" v-if="edit" @click="toggleEdit">
          <font-awesome-icon :icon="['fas', 'check']" class="icon"></font-awesome-icon>
          <span class="focused">Done Editing</span>
        </div>
      </div>
    </header>

    <div class="contentPad">
      <editTable :columns="columns" :config="config" :tabledata="schedule" v-model="newGame" :edit="edit">
        <template #body="{ data, index }" v-if="!edit">
          <!-- Current Scheduled Games -->
          <tr v-for="(game, index) in schedule" :key="index">
            <td><span :class="{ 'vs': !game.host }" class="currentCustom">{{ game.host ? 'vs' : '@' }}</span></td>
            <td>{{ game.opponent.team_name }}</td>
            <td>{{ game.game_time }}</td>
            <td>{{ game.game_date }}</td>
            <td>{{ game.season.level }}</td>
            <td @click="deleteGame(game, index)"><font-awesome-icon :icon="['far', 'trash-alt']"
                class="icon"></font-awesome-icon></td>
          </tr>

          <!-- Note for when a level hasn't been chosen -->
          <tr v-if="!newGame.season.season_id">
            <td colspan="7" align="center" class="add-button">Please select a level to begin adding games</td>
          </tr>

          <tr v-else-if="!addNew" @click="addTo">
            <td colspan="7" align="center" class="add-button">
              <template v-if="route.name === 'roster'">Edit Roster</template>
              <template v-else>Add New Game to Schedule</template>
            </td>
          </tr>

          <tr v-else-if="addNew">
            <td class="input-con">
              <div tabindex="0" @click="homeAwayDisplay(newGame)" @keyup.space="homeAwayDisplay(newGame)"
                :class="{ 'vs': !newGame.host }" class="currentCustom">{{ newGame.host ? 'vs' : '@' }}</div>
            </td>
            <td class="input-con">
                <multiselect v-model="newGame.opponent"
                    label="team_name" 
                    track-by="team_name" 
                    :options="selectOptions"
                    group-label="type"
                    group-values="teams"
                    :closeOnSelect=false :multiple="false"
                    :taggable="true" @tag="addTeam"></multiselect>
            </td>
            <td class="input-con">
              <input type="time" v-model="newGame.game_time" />
            </td>
            <td class="input-con">
              <input type="date" v-model="newGame.game_date" />
            </td>
            <td class="input-con">
              <selectbox id="levels" :options="seasons" :trackby="'level'" placeholder="Select Level"
                v-model="newGame.season"></selectbox>
            </td>
            <td @click="save(newGame)">
              <font-awesome-icon :icon="['fas', 'save']" class="icon"></font-awesome-icon>
            </td>
          </tr>
        </template>

        <template #body="{ data, index }" v-if="edit">
          <tr v-for="(game, index) in schedule" :key="index">
            <td class="input-con">
              <div tabindex="0" @click="homeAwayDisplay(game)" @keyup.space="homeAwayDisplay(game)"
                :class="{ 'vs': !game.host }" class="currentCustom">{{ game.host ? 'vs' : '@' }}</div>
            </td>
            <td class="input-con">
              <multiselect 
                  v-model="game.opponent" 
                  label="team_name" 
                  track-by="team_name" 
                  :options="selectOptions" 
                  group-label="type" 
                  group-values="teams"
                  :closeOnSelect="false" :optionHeight="10" :multiple="false" :taggable="true"></multiselect>
            </td>
            <td class="input-con">
              <input type="time" v-model="game.game_time" />
            </td>
            <td class="input-con">
              <input type="date" v-model="game.game_date" />
            </td>
            <td class="input-con">
              <selectbox id="levels" :options="seasons" :trackby="'level'" placeholder="Select Level"
                v-model="game.season" :data="game.season.opponent"></selectbox>
            </td>
            <td @click="save(game)">
              <font-awesome-icon :icon="['fas', 'save']" class="icon"></font-awesome-icon>
            </td>
          </tr>


          <!-- Add A Team -->
          <tr>
            <td class="input-con">
              <div tabindex="0" @click="homeAwayDisplay(newGame)" @keyup.space="homeAwayDisplay(newGame)"
                :class="{ 'vs': !newGame.host }" class="currentCustom">{{ newGame.host ? 'vs' : '@' }}</div>
            </td>
            <td class="input-con">
                <multiselect v-model="newGame.opponent"
                    label="team_name" 
                    track-by="team_name" 
                    :options="selectOptions"
                    group-values="teams"
                    group-label="type"
                    :closeOnSelect=true :multiple="false"
                    :taggable="true" @tag="addTeam"></multiselect>
                
            </td>
            <td class="input-con">
              <input type="time" v-model="newGame.game_time" />
            </td>
            <td class="input-con">
              <input type="date" v-model="newGame.game_date" />
            </td>
            <td class="input-con">
              <selectbox id="levels" :options="seasons" :trackby="'level'" :placeholder="'Select Level'" :label="'level'"
                v-model="newGame.season"></selectbox>
            </td>
            <td @click="save(newGame)">
              <font-awesome-icon :icon="['fas', 'save']" class="icon"></font-awesome-icon>
            </td>
          </tr>
        </template>
      </editTable>
      <modal :showModal="showModal" :modalTitle="'Add Team'" @close="toggleModal">
        <template #modalBody>
          <schedule_upload @toggleModal="toggleModal" :team_id="route.params.slug"> </schedule_upload>
        </template>
      </modal>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

//apis
import api from '@/api/endpoints';
import Admin from '@/api/admin';

//components
import editTable from '@/components/editTable';
import selectbox from '../selectbox';
import modal from '@/components/modal.vue';
import new_team from '@/components/new_team.vue';
import schedule_upload from '@/components/schedule_upload.vue';
//third party components
import Multiselect from 'vue-multiselect';
// mixins
import { useRootMixin } from '@/mixins/root'
import { tablemix } from '@/mixins/table'



const modalTitle = ref('');
const store = useStore();
const route = useRoute();
const showModal = ref(false);

const emit = defineEmits(['save', 'toggleModal']);

const newGame = reactive({
  host: true,
  opponent: '',
  game_time: '',
  game_date: '',
  season: '',
  neutral_site: ''
});

const saved = ref(false);
const schedule = ref([]);
const gameUpdateList = ref([]);
const edit = ref(false);

const columns = [
  {
    name: 'Host',
    icon: '',
    field_name: 'host',
    type: 'customSelect'
  },
  {
    name: 'Opponent',
    icon: '',
    field_name: 'opponent',
    type: 'select',
    track_by: 'team_name'
  },
  {
    name: 'Time',
    icon: '',
    field_name: 'game_time',
    type: 'time'
  },
  {
    name: 'Date',
    icon: '',
    field_name: 'game_date',
    type: 'date'
  },
  {
    name: '',
    icon: '',
    field_name: 'actions',
    type: 'actions'
  }
];

const config = {
  page: 'schedule'
};

onBeforeMount(() => {
  emit('save', payload => {
    save()
  })
  emit('toggleModal', toggleModal);
});


const seasons = computed(() => {
  return store.state.seasons;
});

const selectOptions = computed(() => {
  const teamList = [];
  let conferenceList = [];
  let nonConferenceList = [];
  api.getSeasonTeamsv2().then(response => {
    response.data.forEach(team => {
      if (team.conference) {
        conferenceList.push(team)
      } else {
        nonConferenceList.push(team)
      }
    })
    teamList.push({
      'type':"Conference",
      'teams': conferenceList
    })
    teamList.push({
        'type': 'Non-Conference',
        'teams': nonConferenceList
      })
  })
  // if (!newGame.season) {
  //   store.getters.seasonTeams.filter(team => {
  //     if (team.slug !== store.state.user.slug &&
  //       !teamList.some(e => e.slug === team.slug)) {
  //       teamList.push(team);
  //     }
  //   });
  // } else {
  //   store.getters.seasonTeams.filter(team => {
  //     if (team.slug !== store.state.user.slug &&
  //       !teamList.some(e => e.slug === team.slug)
  //     ) {
  //       teamList.push(team);
  //     }
  //   });
  // }
  console.log(teamList)
  return teamList;
});

const initSchedule = (season, slug) => {
  // console.log("initSchedule", season, slug)
  api.getSchedule(season, slug).then(response => {
    console.log(response)
    const gameArr = [];
    response.data.forEach(game => {
      const gameObj = {
        game_id: game.game_id,
        host: true,
        opponent: {},
        game_time: game.game_time,
        game_date: game.game_date,
        season: game.season
      };

      if (game.home_team.slug === store.getters.user.slug) {
        gameObj.host = true;
        gameObj.opponent = game.away_team;
      } else {
        gameObj.host = false;
        gameObj.opponent = game.home_team;
      }

      gameArr.push(gameObj);
    });
    schedule.value = gameArr;
  });
};

const toggleEdit = () => {
  edit.value = !edit.value
}
const save = async (game = {}) => {
  const gameJson = {
    home_team: '',
    away_team: '',
    time: game.game_time,
    date: game.game_date,
    season: game.season.season_id,
    neutral_site: false
  };

  if (game.host === true) {
    gameJson.away_team = game.opponent.team_id;
    gameJson.home_team = await getSeasonTeamId(store.state.user.slug, game.season.season_id);
  } else {
    gameJson.away_team = await getSeasonTeamId(store.state.user.slug, game.season.season_id);
    gameJson.home_team = game.opponent.team_id;
  }

  if (edit.value && game.game_id) {
    gameJson.game_id = game.game_id;
    Admin.updateGame(gameJson)
      .then(response => { })
      .catch(err => {
        console.log(err);
        initNewGame(newGame.season.season_id);
      });
  } else {
    Admin.addGame(gameJson)
      .then(response => {
        initNewGame(newGame.season.season_id);
      })
      .catch(err => {
        console.log(err);
      });

    schedule.value.push(newGame);
  }
};

const initNewGame = (currSeason = '') => {
  newGame.season = currSeason;
  newGame.host = true;
  newGame.opponent = '';
  newGame.game_time = '';
  newGame.game_date = '';
  newGame.neutral_site = false;
};

const getSeasonTeamId = async (slug, gameSeason) => {
  if (gameSeason === undefined) {
    gameSeason = newGame.season.season_id;
  }
  let teamId = '';
  await api.getSeasonTeamsv2(slug)
    .then(response => {
      console.log("getSeasonTeamId", response.data)
      teamId = response.data[0].team_id;
    });
  console.log(teamId)
  return teamId;
};

const homeAwayDisplay = (game) => {
  game.host = !game.host;
};

const deleteGame = (data, id) => {
  Admin.removeGame({ game_id: schedule.value[id].game_id }).then(response => {
    schedule.value.splice(id, 1);
  });
};

const teamInList = (teamListObject, newTeam) => {
  return teamListObject.slug === newTeam.slug
};

const addNewGame = () => {
  schedule.push(newGame)
};

const addTeam = (team) => {
  // TODO: Modal to fill in the rest of the team (Maybe?)
  // TODO: Conference game Versus non-conference
  // schedule.push(newGame)
  console.log(team)
  
};

onMounted(() => {
  emit('save', payload => {
    save()
  })
  initSchedule(undefined, route.params.slug)
});

watch('newGame.season', (newValue, oldValue) => {
  initSchedule(newValue.season_id, this.$route.params.slug)
});

watch('route.params.slug', (newValue, oldValue) => {
  initSchedule(undefined, newValue)
});

const toggleModal = () => {
  console.log("Here")
  showModal.value = !showModal.value
};

</script>

<style scoped lang="less">
@teamColor: var(--bg-color);

header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  padding-top: 1rem;
  margin-bottom: .5rem;
  position: sticky;
  top: 0;
  z-index: 2;
  left: 0;
  background: #CFCDCD;

  .buttonCon {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    // height: 3rem;
  }
}

// h2:after {
//   content: '';
//   display: block;
//   height: 40px;
//   /* width: 100%; */
//   width: calc(100% + 2.4rem);
//   border-top: 1.5px solid @teamColor;
//   border-right: 2px solid @teamColor;
//   border-left: 2px solid transparent;
//   position: relative;
//   -webkit-transform: skewX(-45deg);
//   transform: skewX(-45deg);
//   left: -23px;
//   margin-top: .6rem;
// }
table {

  // margin-top: -40px;
  &:before {
    content: '';
    display: block;
    height: 40px;
    width: 100%;
    width: calc(100% + 2.4rem);
    border-top: 1.5px solid @teamColor;
    border-right: 2px solid @teamColor;
    border-left: 2px solid transparent;
    position: absolute;
    -webkit-transform: skewX(-45deg);
    transform: skewX(-45deg);
    /* left: -23px; */
    /* margin-top: 0.6rem; */
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
