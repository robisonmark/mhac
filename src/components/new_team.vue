<template>
    <div class="container">
        <form ref="uploadForm">
            <label for="TeamName">Team Name: </label><input name="TeamName" type="text" v-model="new_team.team_name">
            <label for="TeamMascot">Team Mascot:</label><input type="text" name="TeamMascot" v-model="new_team.team_mascot">
            <label for="MainColor">Main Color</label><input type="text" name="MainColor" v-model="new_team.main_color">
            <label for="AccentColor">Accent Color</label><input type="text" name="AccentColor" v-model="new_team.accent_color"> 

            <label for="Logo">Logo</label><input type="file" name="logo">
            <div @click="save"><font-awesome-icon :icon="['fas', 'save']" class="icon"></font-awesome-icon> Save</div>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import api from '../api/endpoints.js';

const emit = defineEmits(['toggleModal'])

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

function save(formData) {
    console.log(new_team);
    new_team.active=true
    console.log(new_team);
    api.addTeam(new_team)
    .then (response => {
        console.log(response)
    })
    .catch(err => {
        console.error(err)
    })
    emit('toggleModal');
};

</script>