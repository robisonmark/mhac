<template>
  <div class="hello">
    <header class="contentPad">
      <h2>Current Roster</h2>
      <div class="buttonCon">
        <div class='switch' @click="toggleModal()">
            <font-awesome-icon :icon="['fas', 'file-import'] " class="icon"></font-awesome-icon>
            <span class="focused">{{slug}}</span>
      </div>
        <div class="switch" v-if="edit === false"  @click="edit = !edit" :class="[edit === true ? 'selected' : '']">
          <font-awesome-icon :icon="edit === true ? ['fas', 'edit'] : ['far', 'edit']" class="icon"></font-awesome-icon>
          <span class="focused">Edit</span>
        </div>

        <div class="switch" v-if="edit" @click="save()">
          <font-awesome-icon :icon="saved === false ? ['fas', 'save'] : ['fas', 'check']" class="icon" v-if="!saving"></font-awesome-icon>
          <span class="focused" v-if="!saving">Save</span>
          <span v-else>saving...</span>

        </div>
      </div>
    </header>
    <div class="contentPad">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="(error, index) in errors" :key=index>{{ error.first_name + " " + error.last_name + ": " + error.detail  }}</li>
        </ul>
      </p>
      <p v-if="successful_saves.length">
        <ul>
          <li v-for="(player, index) in successful_saves" :key=index>{{ player.first_name + " " + player.last_name + ": " + player.detail }}</li>
        </ul>
      </p>
      <editTable :columns="columns" :config="config" :tabledata="roster" v-model="newPlayer" :edit="edit">
        <template slot="tbody" v-if="edit">
          <tr v-for="(player, index) in roster" :key="index">
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
              <multiselect
                v-model="player.season_roster"
                label="level_name"
                track-by="team_id"
                :options="$store.getters.teamLevels"
                :closeOnSelect="false"
                :optionHeight="10"
                :multiple="true"
                :taggable="true"
                @input="addToUpdateList(player)">
              </multiselect>
            </td>
          </tr>
          <tr>
            <td class="stat first">
              <input type="number" min="0" v-model="newPlayer.player_number"  />
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
            <!-- <td class="stat">
              <input type="date" v-model="newPlayer.birth_date" />
            </td> -->
            <td class="stat">
              <input type="number" v-model="newPlayer.height.feet" />
            </td>
            <td class="stat">
              <input type="number" v-model="newPlayer.height.inches" />
            </td>
            <td class="stat">
              <multiselect v-model="newPlayer.season_roster" label="level_name" track-by="team_id" :options="$store.getters.teamLevels" :closeOnSelect="false"  :optionHeight="10" :multiple="true" :taggable="true"></multiselect>
            </td>
          </tr>
        </template>

        <!-- <template slot="tbody" v-else>
          <td><font-awesome-icon :icon="['far', 'eye']" class="icon"></font-awesome-icon></td>
        </template> -->
      </editTable>
      <modal :showModal="showModal" :modalTitle="modalTitle">
           <template slot="modalBody" slot-scope="{modalBody}">
             <fileUpload :team_id=slug> </fileUpload>
            </template>
        </modal>
    </div>
  </div>
</template>

<script>
// api
import { ref, onMounted, watch } from 'vue';
import api from '@/api/endpoints';
import Admin from '@/api/admin';
import _ from 'lodash';
import { useRoute } from 'vue-router';


// components
import editTable from '@/components/editTable';
import modal from '@/components/modal';
import fileUpload from '@/components/roster_upload.vue';

// third party
import Multiselect from 'vue-multiselect';

export default {
  name: 'roster',
  setup() {
    const route = useRoute();
    const teamId = ref('');
    const modalTitle = ref('Import Roster');
    const showModal = ref(false);
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
    
    const config = {
      page: 'roster',
    }
    const edit = ref(false);
    const fullRoster = ref([]);
    const newPlayer = ref({
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
        team: this.teamId,
        season_roster: [],
        person_type: 1
      })
    const roster = ref([]);
    const rosterLvl = ref('');
    const saved = ref(false);
    const saving = ref(false);
    const updated = ref([]);
    const added = ref([]);
    const errors = ref([]);
    const teamId = ref('');
    const successful_saves = ref([]);

    onMounted(() => {
      initRoster();
      getTeamId();
      teamId.value = route.params.slug;
    });

    watch(() => route.params.slug, (newSlug) => {
      teamId.value = newSlug;
      initRoster();
    });

    

    const initRoster = () => {
      if (teamId.value) {
        Admin.getAdminPlayers(teamId.value).then((response) => {
          roster.value = response.data;
          fullRoster.value = _.cloneDeep(roster.value);
        });
      }
    };

    const initLeveledRoster = (lvlId) => {
      api.getRoster(lvlId).then(response => {
        const rosterArr = []
        this.fullRoster.forEach(player => {
          response.data.forEach(lvlPlayer => {
            if (player.id === lvlPlayer.player_id) {
              rosterArr.push(player)
            }
          })
        })

        this.roster = rosterArr
      })
    };

    const initNewPlayer  = () => {
      newPlayer.value = {
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
        team: this.teamId,
        season_roster: [],
        person_type: 1
      }
      return this.newPlayer
    };
    
    const addToUpdateList = (id) => {
      let add = true;
      let i = 0;
      for (i = 0; i < updated.value.length; i++) {
        if (updated.value[i] === id) {
          add = false;
        }
      }
      if (add) {
        updated.value.push(id);
      }
    };
   
    const save = () => {
      if (this.updated.length >= 1) {
        
        this.updated.forEach(player => {
          player.team_id = this.$store.state.user.team_id
          const playerJson = player
          Admin.updatePlayer(player.id, playerJson)
            .then(response => {
              
            })
            .catch(err => {
              
              this.errors.push({ player: player, error: err })
            })
        })
      }

      if (this.added.length >= 1) {
        
        this.added.forEach(player => {
          if (isNaN(player.age) || player.age === '') {
            this.errors.push({ player: player, error: "Age is Required" })

          }
          player.team_id = this.$store.state.user.team_id
          const playerJson = player
          
          if ((!(isNaN(player.first_name) && player.first_name === '')) || (!(isNaN(player.last_name) && player.last_name === ''))) {
            
            Admin.addPlayer(playerJson)
            .then(response => {
              if (response.status === 201 || response.status == 200) {
                
                this.handleSuccess(playerJson, response)
                this.roster.push(this.newPlayer)
                this.initNewPlayer()
              }
            })
            .catch(err => {
              
              this.errors.push(playerJson)
            })
          }
        })
      }
    };

    const toggleModal = () => {
      showModal.value = !showModal.value;
    };

    const handleSuccess = (player, response) => {
      this.successful_saves.push({
        first_name: player.first_name,
        last_name: player.last_name,
        detail: response.data,
      });

      // Clear successful_saves after 10 seconds
      setTimeout(() => {
        this.successful_saves = [];
      }, 10000);
    };

    const handleUploadError = (errors) => {
      this.errors = []
      this.errors.push(...errors)
      setTimeout(() => {
        this.errors = [];
      }, 10000);
    }
    };

    return {
      modalTitle,
      showModal,
      columns,
      config,
      edit,
      fullRoster,
      newPlayer,
      roster,
      rosterLvl,
      saved,
      saving,
      updated,
      added,
      errors,
      teamId,
      successful_saves,
      initRoster,
      initLeveledRoster,
      initNewPlayer,
      addToUpdateList,
      save,
      toggleModal,
      handleSuccess,
      handleUploadError,
    };
  },
  components: {
    editTable: editTable,
    modal: modal,
    Multiselect,
    fileUpload: fileUpload,
  },
  computed: {
    seasons () {
      return this.$store.state.seasons
    },
    teamAssocLvl () {
      return this.$store.state.teamAssocLvl.season_team_ids
    },
    user: {
      get: function () {
        return this.$store.getters.user
      },

      set: function (newValue) {
        this.initRoster()
      }
    },
    ...mapState(['slug']), 
  },
  watch: {
    newPlayer: {
      deep: true,
      handler (newValue, oldValue) {
        
        const idx = this.added.indexOf(newValue)
        if (idx >= 0) {
          this.added[idx] = newValue
        } else {
          this.added.push(newValue)
        }
        
      }
    },
    rosterLvl: {
      deep: true,
      handler (newValue, oldValue) {
        this.initLeveledRoster(newValue.season_team_id)
      }
    },
    '$route.params.slug': {
      handler (id) {
        this.initRoster()
      }
    },
    slug: 'initRoster'
  },
  created () {
    this.initRoster()
    this.getTeamId()
    // this.initNewPlayer()
    this.$root.$on('save', payload => {
      this.save()
    })
    this.$root.$on('changeEdit', () => { this.edit = !this.edit })
    this.$root.$on('toggleModal', this.toggleModal )
    this.$root.$on('uploadError', this.handleUploadError)
  }
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
    display: inline-block;
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

  th, tr {
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

      &.split-fields{
        td {
          border-right: 5px solid #CFCDCD;
          input[type="text"] {
            height: 50px;
            border: 0;
            outline: none;
          }
          &:last-child{
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
    &:last-child{
      border-right: 0px;
      // background-color: #CFCDCD;
    }
    &.align-no-pad {
      padding-left: 0;
    }
  }
}

table{
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

.stat{
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
  &.first{
    border-left: 5px solid #CFCDCD;
    // background-color: #CFCDCD;
  }
  &:last-child{
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
