import { format } from 'date-fns'

function formatDate (date) {
  return format(new Date(date), CONSTANTS.date_format)
}

function formatTime (time) {
  time = time.split(':')

  let hour = time[0]
  const minutes = time[1]

  const timeOfDay = hour >= 12 ? 'pm' : 'am'

  hour = hour % 12
  hour = hour || 12

  return hour + ':' + minutes + ' ' + timeOfDay
}

const CONSTANTS = {
  timestamp: 'M/d/yyyy - h:mm:ss a',
  date_format: 'MM/dd/yyyy',
  formatDate: formatDate,
  formatTime: formatTime
}

export default { CONSTANTS }
