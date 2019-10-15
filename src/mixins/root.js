import format from 'date-fns/format'

// import { store } from '../store/index'
// import _ from 'lodash'

export const root = {
  data () {
    return {
    }
  },
  components: {
  },
  computed: {
    disabled () {
      // if (this.readWrite === 'write') {
      //   return false
      // } else {
      //   return true
      // }
      return false
    }
  },
  methods: {
    getUUID () {
      var dt = new Date().getTime()
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0
        dt = Math.floor(dt / 16)
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
      return uuid
    },
    formatDates (date, time) {
      if (date !== '') {
        let formattedDates = ''
        if (time === false) {
          if (date) {
            formattedDates = format(date, this.dateFormat)
            return formattedDates
          }
        } else {
          formattedDates = format(date, 'YYYY/MM/DD HH:mm:ss')
          return formattedDates
        }
      } else {
        return ''
      }
    }
  }
}
