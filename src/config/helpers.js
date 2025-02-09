// Third Party Helpers
import { format, addMinutes } from 'date-fns'

export function formatDate (date) {
  date = new Date(date)
  // add minutes to offset timezone difference from UTC
  date = addMinutes(date, date.getTimezoneOffset())
  return format(new Date(date), CONSTANTS.date_format)
}

export function formatTime (time) {
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
  formatTime: formatTime,
  seasonYear: '2024 - 2025'
}

export default { CONSTANTS }
