<template>
  <div class="hello">
    <header class="contentPad">
      <!-- <h2>Current Roster</h2> -->
      <div class="buttonCon">
        <div class='switch' @click="toggleModal">
          <font-awesome-icon :icon="['fas', 'file-import']" class="icon"></font-awesome-icon>
          <span class="focused">Upload Roster File</span>
          &nbsp;
        </div>
        <div class="switch" v-if="edit === false" @click="edit = !edit"
          :class="[edit === true ? 'selected' : '']">
          <font-awesome-icon :icon="edit === true ? ['fas', 'edit'] : ['far', 'edit']" class="icon"></font-awesome-icon>
          <span class="focused">Edit</span>
        </div>

        <div class="switch" v-if="edit" @click="save">
          <font-awesome-icon :icon="saved === false ? ['fas', 'save'] : ['fas', 'check']" class="icon"
            v-if="!saving"></font-awesome-icon>
          <span class="focused" v-if="!saving">Save</span>
          <span v-else>saving...</span>

        </div>
      </div>
    </header>
    <div class="contentPad">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="(error, index) in errors" :key=index>{{ error.first_name + " " + error.last_name + ": " + error.detail
        }}</li>
      </ul>
      </p>
      <p v-if="successful_saves.length">
      <ul>
        <li v-for="(player, index) in successful_saves" :key=index>{{ player.first_name + " " + player.last_name + ": " +
          player.detail }}</li>
      </ul>
      </p>
      <editTable :columns="columns" :config="config" :tabledata="fullRoster" v-model="newPlayer" :edit="edit">
        <template #body v-if="edit">
          <tr v-for="(player, index) in fullRoster" :key="index">
            <td class="stat first">
              <input type="number" min="0" v-model="player.player_number" @input="addToUpdateList(player)" />
            </td>
            <td class="stat">
              <input type="text" v-model="player.first_name" @input="addToUpdateList(player)" />
            </td>
            <td class="stat">
              <input type="text" v-model="player.last_name" @input="addToUpdateList(player)" />
            </td>
            <td class="stat">
              <input type="text" v-model="player.position" @input="addToUpdateList(player)" />
            </td>
            <td class="stat">
              <input type="number" v-model="player.age" @input="addToUpdateList(player)" />
            </td>
            <td class="stat">
              <input type="number" v-model="player.height.feet" @input="addToUpdateList(player)" />
            </td>
            <td class="stat">
              <input type="number" v-model="player.height.inches" @input="addToUpdateList(player)" />
            </td>
            <td class="stat">
              <multiselect v-model="player.season_roster" label="level_name" track-by="team_id"
                :options="store.getters.teamLevels" :closeOnSelect="false" :optionHeight="10" :multiple="true"
                :taggable="true" @input="addToUpdateList(player)">
              </multiselect>
            </td>
          </tr>
          <tr>
            <td class="stat first">
              <input type="number" min="0" v-model="newPlayer.player_number" />
            </td>
            <td class="stat">
              <input type="text" v-model="newPlayer.first_name" />
            </td>
            <td class="stat">
              <input type="text" v-model="newPlayer.last_name" />
            </td>
            <td class="stat">
              <input type="text" v-model="newPlayer.position" />
            </td>
            <td class="stat">
              <input type="number" v-model="newPlayer.age" />
            </td>
            <td class="stat">
              <input type="number" v-model="newPlayer.height.feet" />
            </td>
            <td class="stat">
              <input type="number" v-model="newPlayer.height.inches" />
            </td>
            <td class="stat">
              <multiselect v-model="newPlayer.season_roster" label="level_name" track-by="team_id"
                :options="$store.getters.teamLevels" :closeOnSelect="false" :optionHeight="10" :multiple="true"
                :taggable="true"></multiselect>
            </td>
          </tr>
        </template>
      </editTable>
      <modal :showModal="showModal" :modalTitle="'Upload Roster'" @close="toggleModal">
        <template #modalBody>
          <fileUpload :showModal="showModal" :team_id="route.params.slug"> </fileUpload>
        </template>
      </modal>
    </div>
  </div>
</template>

<script setup>

import { ref, reactive, computed, watch, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';


// api
import api from '@/api/endpoints.js';
import Admin from '@/api/admin.js'
import { mapState } from 'vuex'
import _ from 'lodash'

// components
import editTable from '@/components/editTable.vue'
import modal from '@/components/modal.vue'
import fileUpload from '@/components/roster_upload.vue'

// third party
import Multiselect from 'vue-multiselect'

const route = useRoute();
const store = useStore();
const emit = defineEmits(['save', 'changeEdit', 'toggleModal', 'uploadError'])

let teamId = reactive(route.params.slug);
const columns = [
  {
    name: 'Number',
    icon: '',
    field_name: 'player_number',
    type: 'number'
  },
  {
    name: 'First Name',
    icon: '',
    field_name: 'first_name',
    type: 'text'
  },
  {
    name: 'Last Name',
    icon: '',
    field_name: 'last_name',
    type: 'text'
  },
  {
    name: 'ID',
    icon: '',
    field_name: 'id',
    type: ''
  },
  {
    name: 'Position',
    icon: '',
    field_name: 'position',
    type: 'text'
  },
  {
    name: 'Age',
    icon: '',
    field_name: 'age',
    type: 'int'
  },
  {
    name: 'Feet',
    icon: '',
    field_name: 'feet',
    type: 'int'
  },
  {
    name: 'Inches',
    icon: '',
    field_name: 'inches',
    type: 'int'
  },
  {
    name: 'Levels',
    icon: '',
    field_name: 'season_roster',
    type: 'multiselect',
    track_by: 'level_name',
    model: 'season_roster'
  }
]
let showModal = ref(false);
const config = { page: 'roster' };
const edit = ref(false);
const fullRoster = ref([]);
const newPlayer = reactive({
  player_number: NaN,
  first_name: '',
  last_name: '',
  id: null,
  position: '',
  age: '',
  height: {
    feet: 0,
    inches: 0
  },
  team: teamId,
  season_roster: [],
  person_type: 1
})
const roster = reactive([]);
const rosterLvl = ref('');
const saved = ref(false);
const saving = ref(false);
const updated = ref([]);
const added = ref([]);
const errors = ref([]);
const successful_saves = ref([]);

//   computed: {
const seasons = computed(() => store.state.seasons);
const teamAssocLvl = computed(() => store.state.teamAssocLvl.season_team_ids);
const user = computed({
  get: function () {
    return store.getters.user
  },

  set: function (newValue) {
    initRoster()
  }
});
//     ...mapState(['slug']), 

watch(newPlayer, (newValue, oldValue) => {
  const idx = added.value.indexOf(newValue)
  if (idx >= 0) {
    added.value[idx] = newValue
  } else {
    added.value.push(newValue)
  }

});

watch(rosterLvl, (newValue, oldValue) => {
  initLeveledRoster(newValue.season_team_id);
});

watch(route.params.slug, () => {
  initRoster();
});

onBeforeMount(() => {
  initRoster();
  getTeamId();
  emit('save', payload => {
    save()
  })
  emit('changeEdit', () => { edit.value = !edit.value });
  emit('toggleModal', toggleModal);
  emit('uploadError', handleUploadError);
});


const getTeamId = () => {
  if (route.params.slug) {
    api.getTeams(route.params.slug).then(response => {
      teamId = response.data[0].team_id
    })
  }
};
const initRoster = () => {
  // console.log("initRoster")
  if (route.params.slug) {
    // console.log("Init Roster2")
    Admin.getAdminPlayers(route.params.slug).then(response => {
      // console.log(JSON.stringify(response.data))
      roster.value = response.data
      fullRoster.value = _.cloneDeep(roster.value)
      // console.log("initRoster3", JSON.stringify(fullRoster))
    })
  }
};

const initLeveledRoster = (lvlId) => {
  api.getRoster(lvlId).then(response => {
    const rosterArr = []
    fullRoster.value.forEach(player => {
      response.data.forEach(lvlPlayer => {
        if (player.id === lvlPlayer.player_id) {
          rosterArr.value.push(player)
        }
      })
    })
    roster.value = rosterArr
    console.log("initLeveledRoster", roster)
  })
};
const initNewPlayer = () => {
  const newPlayer = {
    player_number: NaN,
    first_name: '',
    last_name: '',
    id: null,
    position: '',
    age: '',
    height: {
      feet: 0,
      inches: 0
    },
    team: teamId,
    season_roster: [],
    person_type: 1
  }
  return newPlayer
};

const addToUpdateList = (id) => {
  let add = true
  let i = 0
  for (i = 0; i < updated.length; i++) {
    if (updated[i] === id) {
      add = false
    }
  }
  if (add) {
    updated.push(id)
  }
};

const updatePlayers = () => {
  updated.forEach(index => {
    const playerId = roster[index].id
    api.updatePlayer(playerId, roster[index])
      .then(response => {
      })
  })
};

const save = () => {
  console.log("Called Save")
  if (updated.value.length >= 1) {
    console.log("Updated Records")
    updated.value.forEach(player => {
      player.team_id = store.state.user.team_id
      const playerJson = player
      Admin.updatePlayer(player.id, playerJson)
        .then(response => {

        })
        .catch(err => {

          errors.push({ player: player, error: err })
        })
    })
  }

  if (added.value.length >= 1) {
    console.log("Added Records")
    added.value.forEach(player => {
      console.log("Players", player.age)
      if (isNaN(player.age) || player.age === '') {
        errors.push({ player: player, error: "Age is Required" })
      }
      player.team_id = store.state.user.team_id
      const playerJson = player

      if ((!(isNaN(player.first_name) && player.first_name === '')) || (!(isNaN(player.last_name) && player.last_name === ''))) {
        console.log("Player Add Player", playerJson)
        Admin.addPlayer(playerJson)
          .then(response => {
            if (response.status === 201 || response.status == 200) {
              handleSuccess(playerJson, response)
              roster.value.push(newPlayer)
              initNewPlayer()
            }
          })
          .catch(err => {
            errors.value.push(playerJson)
          })
      }
    })
  }
  edit.value = !edit.value
}
const toggleModal = () => {
  showModal.value = !showModal.value
};

const handleSuccess = (player, response) => {
  successful_saves.value.push({
    first_name: player.first_name,
    last_name: player.last_name,
    detail: response.data,
  });

  // Clear successful_saves after 10 seconds
  setTimeout(() => {
    successful_saves.value = [];
  }, 10000);
};

const handleUploadError = (errors) => {
  errors = []
  errors.value.push(...errors)
  setTimeout(() => {
    errors.value = [];
  }, 10000);
};
//   beforeDestroy(){
//     this.$root.$off('uploadError', this.handleUploadError)
//   }
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
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

  h2 {
    display: flex;
  }

  .buttonCon {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    // height: 3rem;
  }
}

table {
  margin-top: -40px;
  width: 100%;
  border-collapse: collapse;
  // border-spacing: 0 5px;
  position: relative;
  z-index: 1;

  th,
  tr {
    text-align: left;

    .number {
      text-align: center;
    }
  }

  thead {
    tr {
      height: 40px;
    }

    th {
      font-weight: 200;
      line-height: 1;
      white-space: nowrap;

      &.pad-right {
        padding-right: 1rem;
      }
    }

    // &:before {
    //   content: '';
    //   display: block;
    //   height: 40px;
    //   width: calc(100% + 45px);
    //   // width: calc(100% + 15px);
    //   // border-top: 1px solid var(--bg-color);
    //   // border-right: 1px solid var(--bg-color);
    //   border-top: 1.5px solid #B42625;
    //   border-right: 2px solid #B42625;
    //   border-left: 2px solid transparent;
    //   position: absolute;
    //   -webkit-transform: skewX(-45deg);
    //   transform: skewX(-45deg);
    //   left: -23px;
    // }
  }

  tbody {
    tr {
      background-color: #fff;
      height: 50px;
      border-bottom: 5px solid #CFCDCD;

      .add-button {
        cursor: pointer;
      }

      &.split-fields {
        td {
          border-right: 5px solid #CFCDCD;

          input[type="text"] {
            height: 50px;
            border: 0;
            outline: none;
          }

          &:last-child {
            border-right: 0px;
            // background-color: #CFCDCD;
          }
        }
      }

      // tr last child
      &:last-child {
        border-bottom: 0px;
        // background-color: #CFCDCD;
      }

      &.missing {
        background-color: #F0E9E9;
      }
    }
  }

  td {
    padding-left: 1rem;
    padding-right: 1rem;
    position: relative;

    &:last-child {
      border-right: 0px;
      // background-color: #CFCDCD;
    }

    &.align-no-pad {
      padding-left: 0;
    }
  }
}

table {
  margin-top: 0;

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
  }
}

.stat {
  // td {
  border-right: 5px solid #CFCDCD;
  text-align: center;
  padding: 0;
  min-width: 50px;

  input {
    font-weight: 400;
    height: 50px;
    border: 0;
    outline: none;
    text-align: center;
  }

  &.first {
    border-left: 5px solid #CFCDCD;
    // background-color: #CFCDCD;
  }

  &:last-child {
    border-right: 0px;
    // background-color: #CFCDCD;
  }
}

#levels {
  width: 200px;
  vertical-align: middle;
  margin-left: 32px;
}
</style>