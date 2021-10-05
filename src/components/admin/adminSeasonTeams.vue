<template>
    <div>
        <table>
            <tr v-for="(team, index) in teams">
                <td> {{team}}</td>
            </tr>
        </table>
    </div>
</template>

<script>

// TODO: Make a modal - Select by check marks the teams that will be playing at the level and
//       then allow for save.  Give ability to turn on and off
import { api } from '@/api/endpoints'

export default {
    name: 'adminSeasonTeams',
    data () {
        return {
            teams: []
        }
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
        }
    }
}
</script>

<style scoped lang="less">
@import "../../assets/less/utils/variables.less";
@import "../../assets/less/utils/breakpoints.less";

</style>