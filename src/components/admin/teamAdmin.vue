<template>
  <div class="">
    <h2>Create or Edit Teams</h2>
    <header class="contentPad">
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
      <editTable :columns="columns" :config="config" :tabledata="teamArray" v-model="new_team" :edit="edit">
        <template #body v-if="edit">
          <tr v-for="(team, index) in teamArray" :key="index">
            <td class="input-con">
              <input type="text" v-model="team.team_name" @input="addToUpdateList(team)">
            </td>
            <td>
              <input type="text" v-model="team.team_mascot" @input="addToUpdateList(team)">
            </td>
            <td>
              <input type="text" v-model="team.main_color" @input="addToUpdateList(team)">
            </td>
            <td>
              <input type="text" v-model="team.secondary_color" @input="addToUpdateList(team)">
            </td>
            <td>
              <input type="text" v-model="team.website" @input="addToUpdateList(team)">
            </td>
            <td>
              <input type="text" v-model="team.logo_color" @input="addToUpdateList(team)">
            </td>
            <td>
              <input type="text" v-model="team.logo_grey" @input="addToUpdateList(team)">
            </td>
            <td>
              <input type="text" v-model="team.slug" @input="addToUpdateList(team)">
            </td>
            <td>
              <input type="checkbox" v-model="team.active" @input="addToUpdateList(team)">
            </td>
          </tr>
          <tr>
            <td class="input-con">
              <input type="text" v-model="new_team.team_name">
            </td>
            <td>
              <input type="text" v-model="new_team.team_mascot">
            </td>
            <td>
              <input type="text" v-model="new_team.main_color">
            </td>
            <td>
              <input type="text" v-model="new_team.secondary_color">
            </td>
            <td>
              <input type="text" v-model="new_team.website">
            </td>
            <td>
              <input type="text" v-model="new_team.logo_color">
            </td>
            <td>
              <input type="text" v-model="new_team.logo_grey">
            </td>
            <td>
              <input type="text" v-model="new_team.slug">
            </td>
            <td>
              <input type="checkbox" v-model="new_team.active">
            </td>
          </tr>
        </template>
      </editTable>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onBeforeMount } from 'vue';
import api from '@/api/endpoints.js';
import editTable from '@/components/editTable.vue'
// import selectbox from '@/components/selectbox.vue'
import { useStore } from 'vuex';

// Components
import Multiselect from 'vue-multiselect';

const teamArray = ref([]);
const new_team = reactive({
  team_name: '',
  team_mascot: '',
  main_color: '',
  secondary_color: '',
  website: '',
  logo_color: '',
  logo_grey: '',
  slug: '',
  active: true
});
const columns = [
  {
    name: 'Team Name',
    icon: '',
    field_name: 'team_name',
    type: 'text'
  },
  {
    name: 'Team Mascot',
    icon: '',
    field_name: 'team_mascot',
    type: 'text'
  },
  {
    name: 'Main Color',
    icon: '',
    field_name: 'main_color',
    type: 'text'
  },
  {
    name: 'Secondary Color',
    icon: '',
    field_name: 'secondary_color',
    type: 'text'
  },
  {
    name: 'Website',
    icon: '',
    field_name: 'website',
    type: 'text'
  },
  {
    name: 'Logo Color',
    icon: '',
    field_name: 'logo_color',
    type: 'text'
  },
  {
    name: 'Logo Grey',
    icon: '',
    field_name: 'logo_grey',
    type: 'text'
  },
  {
    name: 'Slug',
    icon: '',
    field_name: 'slug',
    type: 'text'
  },
  {
    name: 'Active',
    icon: '',
    field_name: 'active',
    type: 'boolean'
  }
];
const config = { page: 'teams' };
const edit = ref(false);
const saving = ref(false);
const saved = ref(false);
const emit = defineEmits(['changeEdit'])
const updated = ref([]);
const added = ref([]);

onBeforeMount(() => {
  teams()
  emit('changeEdit', () => {edit.value = !edit.value})
});

//Methods
const teams = () => {
  api.getTeams().then(response => {
    teamArray.value = response.data
  })
};
const save = () => {
  console.log(new_team)
  if (updated.value.length >= 1) {
    updated.value.forEach(team => {
      api.updateTeam(team)
    })
  }

  if (added.value.length >=1) {
    api.addTeam(new_team)
    .then(response => {
      initNewTeam()
    })
    .catch(err => {
      console.log(err)
    })

  }
  
  edit.value = !edit.value
};

const initNewTeam = () => {
  const new_team = {
    team_name: '',
    team_mascot: '',
    main_color: '',
    secondary_color: '',
    website: '',
    logo_color: '',
    logo_grey: '',
    slug: '',
    active: true
  }
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
    updated.value.push(id)
  }
};

watch(new_team, (newValue, oldValue) => {
  const idx = added.value.indexOf(newValue)
  if (idx >= 0){
    added.value[idx] = newValue
  } else {
    added.value.push(newValue)
  }
});


</script>

<style scoped lang="less"></style>
