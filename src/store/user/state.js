import ls from '../../utils/localStorage'

export default {
  user: ls.getItem('user'),
  auth: ls.getItem('auth'),
  lessons: ls.getItem('lessons')
}
