<template>
  <table id="table" name="edittable">
    <thead id="table-head-fixed">
      <slot name="thead">
        <tr>
          <template v-for="(column, key, index) in columns">
            <th v-if="!column.field_name.includes('id')" :key="index" :class="column.name.toLowerCase()">{{column.name}}</th>
          </template>
          <!-- <th></th> -->
        </tr>
      </slot>
    </thead>

    <tbody id="table-body" name="tbody">
      <slot name="tbody">
        <tr v-for="(data, index) in tabledata" :key="index">
          <template v-for="(column, idx) in columns">
            <td v-if="!column.field_name.includes('id')" :class="idx">
              <template v-if="column.field_name.includes('date')">
                {{formatDates(data[column.field_name], false)}}
              </template>
              <template v-else-if="column.field_name === 'season_roster'">
                <template v-for="(c) in  data[column.field_name]">
                  {{c.level_name }}
                </template>
              </template>
              <template v-else-if="column.field_name === 'level'">
                {{data[column.field_name].level_name}}
              </template>
              <template v-else-if="column.field_name === 'opponent'">
                {{ data[column.field_name].team_name }}
              </template>
              <template v-else-if="column.field_name === 'host'">
                <div tabindex="0" :class="{'vs': data[column.field_name]}" class="currentCustom">{{data[column.field_name] ? 'vs' : '@'}}</div>
              </template>
              <template v-else-if="column.field_name==='feet' || column.field_name==='inches' ">
                {{ data['height'][column.field_name] }}
              </template>
              <template v-else-if="column.field_name==='archive'">
                  <input type='checkbox' v-model="data[column.field_name]" id="index" disabled>
              </template>
              <template v-else-if="column.field_name === 'team_name' && 'season_teams' in data">
                  <template v-for="(c) in data['season_teams']">
                    {{c.team_name }}
                  </template>
              </template>
              <template v-else>
                {{ data[column.field_name] }}
              </template>
            </td>
          </template>
        </tr>

        <tr v-if="!addNew" @click="addTo">
          <td :colspan="colspan" align="center" class="add-button">
            <template v-if="$route.name === 'roster'">Edit Roster</template>
            <template v-else>Add New Game to Schedule</template>
          </td>
          <!-- <td></td> -->
        </tr>

        <template v-else>
          <tr class="split-fields">
            <!-- <td></td> -->
            <template v-for="(field, index) in columns">
              <td v-if="!field.field_name.includes('id') && !field.field_name.includes('actions')" class="input-con">
                <selectbox v-if="field.type === 'select'" :id="'field.field_name'" :options="selectOptions(field.field_name)" :trackby="field.track_by" placeholder="" v-model="value[field.field_name]"></selectbox>

                <div v-else-if="field.type === 'customSelect'" tabindex="0" @click="changeDisplay(field.field_name)" @keyup.space="changeDisplay(field.field_name)" :class="{'vs': value[field.field_name]}" class="currentCustom">{{value[field.field_name] ? 'vs' : '@'}}</div>

                <multiselect v-else-if="field.type === 'multiselect' && field.field_name==='season_roster'"
                  v-model="value[field.model]"
                  label="level_name"
                  track-by="team_id"
                  :options="selectOptions(field.field_name)"
                  :closeOnSelect=false
                  :multiple="true"
                  :taggable="true"
                  @tag="addTag"></multiselect>
                <multiselect v-else-if="field.type === 'multiselect' && field.field_name==='levels'"
                  v-model="value[field.model]"
                  label="level_name"
                  :options="selectOptions(field.field_name)"
                  track-by="id"
                  :closeOnSelect="false"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTag"></multiselect>
                <!-- <multiselect v-else-if="field.type === 'multiselect' && field.field_name==='team_name'"
                  v-model="value[field.model]"
                  label="team_name"
                  :options="selectOptions(field.field_name)"
                  track-by="team_id"
                  :closeOnSelect="false"
                  :multiple="true"
                  :taggable="true"
                  @tag="addTag"></multiselect> -->

                <input v-else :type="field.type" v-model="value[field.field_name]" />

                <!-- <span v-if="(index + 1) === colspan" @click="savedata" class="icons">SAVE</span> -->
              </td>
              <td v-else-if="field.field_name === 'actions'" align="right" width="1%" >
                <font-awesome-icon :icon="['fas', 'save']" class="icon" @click="savedata"></font-awesome-icon>
              </td>
              <!-- <td></td> -->
            </template>
          </tr>
        </template>
      </slot>
    </tbody>

    <slot name="tfoot">
    </slot>
  </table>

</template>

<script>
// components
// import multiselect from './multiselect'
import Multiselect from 'vue-multiselect'
import selectbox from './selectbox'

// mixins
import { root } from '@/mixins/root'
export default {
  name: 'editTable',
  data () {
    return {
      currentSort: '',
      currentSortDir: 'asc',
      addNew: false,
      switchPosition: Boolean,
      switchDisplay: '@'
    }
  },
  mixins: [
    root
  ],
  watch: {
    edit: {
      deep: true,
      handler () {
        this.addNew = this.edit
      }
    }
  },
  components: {
    // multiselect: multiselect,
    Multiselect,
    selectbox: selectbox
  },
  props: [
    'columns',
    'config',
    'edit',
    'tabledata',
    'value'
  ],
  computed: {
    filteredData () {
      //   return this.tabledata.filter((data) => {
      //     if (data.data_name.toLowerCase().match(this.search.toLowerCase())) {
      //       return data.data_name.toLowerCase().match(this.search.toLowerCase())
      //     } else if (data.data_type.toLowerCase().match(this.search.toLowerCase())) {
      //       return data.data_type.toLowerCase().match(this.search.toLowerCase())
      //     } else if (data.start_date.toLowerCase().match(this.search.toLowerCase())) {
      //       return data.start_date.toLowerCase().match(this.search.toLowerCase())
      //     } else if (data.end_date.toLowerCase().match(this.search.toLowerCase())) {
      //       return data.end_date.toLowerCase().match(this.search.toLowerCase())
      //     } else if (data.hasOwnProperty('vendor') && data.vendor.name.toLowerCase().match(this.search.toLowerCase())) {
      //       return data.vendor.name.toLowerCase().match(this.search.toLowerCase())
      //     } else if (data.lastUpdateUser.toLowerCase().match(this.search.toLowerCase())) {
      //       return data.lastUpdateUser.toLowerCase().match(this.search.toLowerCase())
      //     } else if (data.lastUpdateDate.toLowerCase().match(this.search.toLowerCase())) {
      //       return data.lastUpdateDate.toLowerCase().match(this.search.toLowerCase())
      //     }
      //   })
      // }
      return false
    },
    colspan () {
      return this.columns.length
    }
  },
  async created () {
    this.$root.$on('saved', payload => {
      this.addNew = false
    })
  },
  methods: {
    getNamesFromSeasonRoster (teamList) {
      const listNames = []
      for (let i = 0; i < teamList.length; i++) {
        listNames.push(teamList[i])
      }
      return listNames
    },
    selectOptions (name) {
      switch (name) {
        case 'division':
          return this.$store.state.seasons
        case 'opponent':
          return this.$store.state.teams.filter(team => {
            if (team.team_id !== this.$store.getters.user.team_id) {
              return team
            }
          })
        case 'season_roster':
          return this.$store.getters.teamLevels
        case 'levels':
          return this.tabledata
        case 'team_name':
          return this.$store.state.teams
      }
    },
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.options.push(tag)
      this.value.push(tag)
    },
    trackBy (name) {
      switch (name) {
        case 'division':
          return 'level'
        case 'opponent':
          return 'team_name'
      }
    },
    setFixedTableHead () {
      const columnCount = 6
      const tableWidth = document.getElementById('table-body').rows[0].clientWidth

      document.getElementById('table-head-fixed').style.width = tableWidth + 'px'
      document.getElementById('table-head-fixed').style.position = 'fixed'

      for (let i = 0; i <= columnCount; ++i) {
        const columnWidth = document.getElementById('table-body').rows[0].cells[i].offsetWidth
        document.getElementById('table-head-fixed').rows[0].cells[i].width = columnWidth + 'px'
      }
    },
    setScrollPos () {
      const scrollPos = document.getElementById('table').getBoundingClientRect().left
      document.getElementById('table-head-fixed').style.left = scrollPos + 'px'
    },
    setTableTopPos () {
      const tableYPos = document.getElementById('table').getBoundingClientRect().top
      document.getElementById('table-head-fixed').style.top = tableYPos + 'px'
      document.getElementById('table').style.marginTop = tableYPos + 'px'
    },
    sortTable (s, nested) {
      // if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s

      this.tabledata.sort((a, b) => {
        let modifier = 1
        if (nested) {
          if (this.currentSortDir === 'desc') modifier = -1
          if (a[this.currentSort][nested] !== '') {
            if (a[this.currentSort][nested] < b[this.currentSort][nested]) return -1 * modifier
            if (a[this.currentSort][nested] > b[this.currentSort][nested]) return 1 * modifier
          }
          return 0
        } else {
          if (this.currentSortDir === 'desc') modifier = -1
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
          return 0
        }
      })
    },
    changeDisplay (field) {
      this.switchPosition = !this.switchPosition

      if (this.config.page === 'schedule') {
        this.value[field] = !this.value[field]
      }
    },
    addTo () {
      this.addNew = true
      this.$root.$emit('changeEdit')
    },
    age (Birthday) {
      Birthday = new Date(Birthday + 'T00:00:00')
      var ageDifMs = Date.now() - Birthday.getTime()
      var ageDate = new Date(ageDifMs) // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970)
    },
    savedata () {
      this.$root.$emit('save')
    },
    deletedata () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
table {
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
      // font-family: @lato;
      font-weight: 200;
      font-size: .8rem;
      cursor: pointer;
      .icon {
        display: none;
      }
      &.sort {
        font-weight: 600;
        color: #021A2B;
        .icon {
          display: inline-block;
        }
        .asc {
          transform: rotate(180deg);
          transition: ease-in-out .3s all;
        }
        .dsc {
          // transform: rotate(180deg);
          transition: ease-in-out .3s all;
        }
      }
    }
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
          input {
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
    }
  }
  td {
    padding-left: 1rem;
    padding-right: 1rem;
    position: relative;
    &.input-con {
      padding: 0;
    }
    &:last-child{
      border-right: 0px;
      // background-color: #CFCDCD;
    }
  }
}
select {
  border: 0;
  outline: none;
}
.currentCustom {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 1.3rem;
  &.vs {
    font-style: italic;
    color: #fff;
    font-size: 1rem;
    z-index: 1;
    position: relative;
    &:after {
      content: '';
      height: 1.7rem;
      width: 1.7rem;
      position: absolute;
      border-radius: 50%;
      background: var(--bg-color);
      z-index: -1;
    }
  }

}
.icons {
  position: absolute;
  right: -3rem;
}
.multiselect__input{
  border: 0 !important;
}
</style>
