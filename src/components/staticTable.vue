<template>
  <table id="table">
    <thead id="table-head-fixed">
    </thead>

    <tbody id="table-body">
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'editTable',
  data () {
    return {
      currentSort: '',
      currentSortDir: 'asc',
    }
  },
  props: [
    'columns',
    'tabledata'
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
  async created () {
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
  updated () {
    this.$nextTick(function () {
      this.setFixedTableHead()
      this.setScrollPos()
      this.setTableTopPos()
      window.addEventListener('resize', this.setFixedTableHead)
      // console.log(document)
      let scrollBody = document.getElementById('scrollBody')
      scrollBody.addEventListener('scroll', this.setScrollPos)
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.setFixedTableHead)
    // window.removeEventListener('scroll', this.setScrollPos)
    let scrollBody = document.getElementById('scrollBody')
    scrollBody.removeEventListener('scroll', this.setScrollPos)
  },
  methods: {
    setFixedTableHead () {
      let columnCount = 9
      let tableWidth = document.getElementById('table-body').rows[0].clientWidth

      document.getElementById('table-head-fixed').style.width = tableWidth + 'px'
      document.getElementById('table-head-fixed').style.position = 'fixed'

      for (let i = 0; i <= columnCount; ++i) {
        let columnWidth = document.getElementById('table-body').rows[0].cells[i].offsetWidth
        document.getElementById('table-head-fixed').rows[0].cells[i].width = columnWidth + 'px'
      }
    },
    setScrollPos () {
      let scrollPos = document.getElementById('table').getBoundingClientRect().left
      document.getElementById('table-head-fixed').style.left = scrollPos + 'px'
    },
    setTableTopPos () {
      let tableYPos = document.getElementById('table').getBoundingClientRect().top
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
