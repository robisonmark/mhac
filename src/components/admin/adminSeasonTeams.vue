<template>
    <div class="container">
        <multiselect
              ref="multiselect_ref"
              v-model="checkedTeams"
              label="team_name"
              :options="teams"
              :closeOnSelect="false"
              :optionHeight="10"
              :multiple="true"
              :taggable="true"
              :hideSelected="true"
            >
            </multiselect>
    </div>
</template>

<script>

// TODO: Make a modal - Select by check marks the teams that will be playing at the level and
//       then allow for save.  Give ability to turn on and off
import { api } from '@/api/endpoints'
import Multiselect from 'vue-multiselect'

export default {
    name: 'adminSeasonTeams',
    data () {
        return {
            teams: [],
            checkedTeams: []
        }
    },
    components: {
        Multiselect
    },
    created () {
        this.initTeams()
    },
    methods: {
        initTeams () {
            // this.teams = this.$store.state.teams
            api.getTeams().then(response => {
                this.teams = response.data
            })
        },
        save () {
            // TODO: SEND DATA TO A CREATE SEASON TEAMS CALL
        },
        refresh_data () {
            // Add a call to emit data
        },
        reset () {
            // reset form to initial state
            // this.currentStatus = STATUS_INITIAL
            this.selectedTeams = []
            // this.uploadError = ''
        },
    },
    mounted () {
        this.$refs['multiselect_ref'].activate()
    }
}
</script>

<style scoped lang="less">
@import "../../assets/less/utils/variables.less";
@import "../../assets/less/utils/breakpoints.less";

</style>