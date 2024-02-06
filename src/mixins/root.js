import { format } from 'date-fns';

export const useRootMixin = () => {
  const dateFormatDisplay = 'M/dd/yyyy';
  const dateFormat = 'M/dd/yyyy';
  const months = [
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
  ];

  const disabled = false; // Computed property disabled

  const getUUID = () => {
    var dt = new Date().getTime()
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0
      dt = Math.floor(dt / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    return uuid
  };

  const formatDates = (date, time) => {
    if (date !== '' && date !== 'None') {
      let formattedDates = '';
      if (time === false) {
        if (date) {
          date = new Date(date + 'T00:00:00');
          formattedDates = format(date, dateFormat);
          return formattedDates;
        }
      } else {
        formattedDates = format(date, 'M/dd/yyyy HH:mm');
        return formattedDates;
      }
    } else {
      return '';
    }
  };

  const print = () => {
    window.print();
  };

  return {
    dateFormatDisplay,
    dateFormat,
    months,
    disabled,
    getUUID,
    formatDates,
    print
  };
};
