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
            <td>{{ game.opponent.level_name }}</td>
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

//third party components
import Multiselect from 'vue-multiselect';


const modalTitle = ref('');
const store = useStore();
const route = useRoute();
const emit = defineEmits(['save', 'toggleModal']);

const schedule = ref([]);

const showModal = ref(false);
const edit = ref(false);



const newGame = reactive({
  host: true,
  opponent: '',
  game_time: '',
  game_date: '',
  season: '',
  neutral_site: ''
});

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


</script>