<template>
  <div class="container">
    <div class="page-styles">
      <div class="col-12">
        <div class="row filter-bar">
          <div class="col-4">
            <h2>2019 - 2020 Schedule</h2>
          </div>
          <div class="col-6">
            <div class="filters">
              <div class="custom-select" @click="showDatePicker = !showDatePicker">
                <div disabled>All Dates</div>
                <div class="options-menu" @click.stop="showDatePicker = true">
                  <input class="option noHover" v-show="showDatePicker" type="date" v-model="filterBy.dateRange.start_date"/>
                </div>
              </div>

              <div class="custom-select">
                <div disabled>All Levels</div>
              </div>

              <div class="custom-select" @click="showTeams = !showTeams">
                <div disabled>{{filterBy.team.name}}</div>
                <div class="options-menu">
                  <template >
                    <div class="option" v-for="team in teams" :key="team.id" v-show="showTeams" @click="setTeam(team)">
                      {{team.team_name}} {{team.team_mascot}}
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div class="col-2">
            <div class="button ghost">
              Print
            </div>
          </div>
        </div>
      </div>
      <div class="col content">
        <h1>Schedules</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schedules',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      showTeams: false,
      showDatePicker: false,
      filterBy: {
        team: {
          id: '',
          name: 'All Teams'
        },
        dateRange: {
          start_date: '',
          end_date: ''
        }
      }
    }
  },
  computed: {
    teams () {
      let teams = [{id: '', team_name: 'All Teams'}, ...this.$store.state.teams]
      return teams
    }
  },
  methods: {
    setTeam (team) {
      this.filterBy.team.id = team.id
      this.filterBy.team.name = team.team_name
      // this.showTeams = false
      console.log(this.showTeams)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../assets/less/utils/variables.less';
.page-styles{
  min-height: 100vh;
  background-color: #fff;
  margin-right: 1rem;
  margin-left: 1rem;
}
.filter-bar {
  background-color: @nav-blue;
  color: #fff;
  height: 3rem;
  align-items: center;
  .filters {
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
  }
}
.content {
  padding: 2rem 1rem;
}

h2 {
  font-family: @open-sans;
  font-size: 1.1rem;
  font-weight: 600;
  font-style: italic;
}

.custom-select {
  display: inline-block;
  position: relative;
  font-size: .8rem;
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: .2rem .2rem 0 .2rem;
    border-color: #fff transparent transparent transparent;
    position: absolute;
    right: -1rem;
    top: 8px;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    transform: skewX(-45deg);
    border-bottom: 2px solid;
    border-right: 2px solid;
    width: 130%;
    height: 1.5rem;
    top: 0;
    left: .5rem;
  }
}
.options-menu {
  position: absolute;
  width: 250px;
  background: #0C4B75;
  // padding: .5rem;
  top: calc(1.5rem);
  left: -3px;
  z-index: 2;
  box-shadow: 1px 2px 4px #0C4B75;
  .option {
    padding: .2rem .5rem;
    width: 100%;
    cursor: pointer;
    &:hover {
      background-color: lighten(#0C4B75, 10%);
    }
    &.noHover:hover {
      background-color: #fff;
    }
  }
}
.button.ghost {
  border: 1px solid #fff;
  width: 4rem;
  text-align: center;
  &:hover {
    background-color: #fff;
    color: #0C4B75;
  }
}
</style>
