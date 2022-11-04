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
        <template slot="tbody">
        </template>
        <template slot="tbody" v-if="edit">

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
        slug: ''
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
      })
    }
  }

}
</script>
<style scoped lang="less">

</style>
