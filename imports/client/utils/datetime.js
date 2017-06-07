import moment from 'moment'

export default {
  format(date) {
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  },

  readableTimeSpan(from, to) {
    return moment(from).to(to, true)
  }
}