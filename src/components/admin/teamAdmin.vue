<template>
  <div class="">
    <h2>Create or Edit Teams</h2>
    <header class="contentPad">
      <div class="buttonCon">
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
      <editTable  :columns="columns" :config="config" :tabledata="teamArray" v-model="new_team" :edit="edit">
        <template slot="tbody" v-if="edit">
          <tr v-for="(team, index) in teamArray" :key="index">
            <td class="input-con">
                <input type="text" v-model="team.team_name">
            </td>
            <td>
              <input type="text" v-model="team.team_mascot">
            </td>
            <td>
              <input type="text" v-model="team.main_color">
            </td>
            <td>
              <input type="text" v-model="team.secondary_color">
            </td>
            <td>
              <input type="text" v-model="team.website">
            </td>
            <td>
              <input type="text" v-model="team.logo_color">
            </td>
            <td>
              <input type="text" v-model="team.logo_grey">
            </td>
            <td>
              <input type="text" v-model="team.slug">
            </td>
            <td>
              <input type="checkbox" v-model="team.active">
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

<script>
import { api } from '@/api/endpoints'
import editTable from '@/components/editTable'

export default {
  name: 'teamManager',
  data () {
    return {
      teamArray: [],
      new_team: {
        team_name: '',
        team_mascot: '',
        main_color: '',
        secondary_color: '',
        website: '',
        logo_color: '',
        logo_grey: '',
        slug: '',
        active: true
      },
      columns: [
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
      ],
      config: {
        page: 'teams'
      },
      edit: false,
      saving: false
    }
  },
  components: {
    editTable: editTable
  },
  computed: {

  },
  created () {
    this.teams()
  },
  methods: {
    teams () {
      api.getTeams().then(response => {
        this.teamArray = response.data
        console.log(this.teamArray)
      })
    },
    save () {
      api.addTeam(this.new_team)
        .then(response => {
          this.initNewTeam()
        })
        . catch(err => {
          console.log(err)
        })
    },
    initNewTeam () {
      this.new_team = {
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
    }
  }

}
</script>
<style scoped lang="less">

</style>
