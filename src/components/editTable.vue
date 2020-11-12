<template>
  <table id="table" name="edittable">
    <thead id="table-head-fixed">
      <slot name="thead">
        <tr>
          <template v-for="(column, key, index) in columns">
            <th v-if="!column.field_name.includes('id')" :key="index" :class="column.name.toLowerCase()">{{column.name}}</th>
          </template>
          <th></th>
        </tr>
      </slot>
    </thead>

    <tbody id="table-body" name="tbody">
      <slot name="tbody">
        <tr v-for="(data, index) in tabledata" :key="index">
          <template v-for="(col, key, idx) in data">
            <td v-if="!key.includes('id')" :key="key + idx" :class="idx">
              <template v-if="key.includes('date')">
                {{formatDates(data[key], false)}}
              </template>
              <template v-else>
                {{data[key]}}
              </template>
            </td>
          </template>
          <!-- <td></td> -->
          <!-- <td @click.stop.prevent="savedata(data)"><i class="far fa-copy icon"></i></td>
          <td @click.stop.prevent="deletedata(data)"><i class="far fa-trash-alt icon"></i></td> -->
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
              <td v-if="!field.field_name.includes('id')" :key="index" class="input-con">
                <!-- {{value}} -->
                <selectbox v-if="field.type === 'select'" :id="'field.field_name'" :options="selectOptions(field.field_name)" :trackby="field.track_by" placeholder="" v-model="value[field.field_name]"></selectbox>

                <div v-else-if="field.type === 'customSelect'" tabindex="0" @click="changeDisplay" @keyup.space="changeDisplay" :class="{'vs': !switchPosition}" class="currentCustom">{{switchDisplay}}</div>

                <!-- <multiselect v-else-if="field.type === 'multiselect'" :options="selectOptions(field.field_name)" :trackby="field.track_by" placeholder="" :value="value[field.model]"></multiselect> -->
                <multiselect v-else-if="field.type === 'multiselect'" v-model="value[field.model]" label="level_name" track-by="team_id" :options="selectOptions(field.field_name)" :closeOnSelect=false  :optionHeight="10" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
  
                <input v-else :type="field.type" v-model="value[field.field_name]" />
                <!-- <input type="text" v-model="value[key]" /> -->
                <span v-if="(index + 1) === colspan" @click="savedata" class="icons">SAVE</span>
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

    // await this.getPromosList('username', store.state.user.username)
    // client.getAllVendors().then(response => {
    //   this.vendorTypes = response
    // })
    // // await this.getAllPromos()
    // EventBus.$emit('loading', false)
    // this.$root.$on('submit', payload => {
    //   this.submitFile()
    // })

    // this.$root.$on('menuState', payload => {
    //   window.setTimeout(() => {
    //     this.setScrollPos()
    //   }, 5)
    // })
  },
  // mounted () {
  //   this.$nextTick(function () {
  //     this.setFixedTableHead()
  //     window.addEventListener('resize', this.setFixedTableHead)
  //   })
  // },
  // updated () {
  //   this.$nextTick(function () {
  //     this.setFixedTableHead()
  //     this.setScrollPos()
  //     this.setTableTopPos()
  //     window.addEventListener('resize', this.setFixedTableHead)
  //     // console.log(document)
  //     let scrollBody = document.getElementById('scrollBody')
  //     scrollBody.addEventListener('scroll', this.setScrollPos)
  //   })
  // },
  // destroyed () {
  //   window.removeEventListener('resize', this.setFixedTableHead)
  //   // window.removeEventListener('scroll', this.setScrollPos)
  //   let scrollBody = document.getElementById('scrollBody')
  //   scrollBody.removeEventListener('scroll', this.setScrollPos)
  // },
  methods: {
    selectOptions (name) {
      switch (name) {
        case 'division':
          return this.$store.state.seasons
        case 'opponent':
          return this.$store.state.teams.filter(team => {
            if (team.id !== this.$store.state.user.team_id) {
              return team
            }
          })
        case 'season_roster':
          return this.$store.getters.teamLevels
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
    changeDisplay () {
      this.switchPosition = !this.switchPosition

      if (this.switchPosition && this.config.page === 'schedule') {
        this.switchDisplay = '@'
      } else {
        this.switchDisplay = 'vs'
      }
    },
    addTo () {
      this.addNew = true
      this.$root.$emit('changeEdit')
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
</style>
