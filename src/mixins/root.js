import format from 'date-fns/format'

// import { store } from '../store/index'
// import _ from 'lodash'

export const root = {
  data () {
    return {
      dateFormatDisplay: 'M/dd/yyyy',
      dateFormat: 'M/dd/yyyy',
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
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
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
      return uuid
    },
    formatDates (date, time) {
      if (date !== '') {
        let formattedDates = ''
        if (time === false) {
          if (date) {
            date = new Date(date)
            formattedDates = format(date, this.dateFormat)
            return formattedDates
          }
        } else {
          formattedDates = format(date, 'M/dd/yyyy HH:mm')
          return formattedDates
        }
      } else {
        return ''
      }
    }
  }
}
