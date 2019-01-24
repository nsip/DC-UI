import ls from '../../utils/localStorage'
/*
export function someMutation (state) {
}
*/
export function UPDATE_USER (state, user) {
  state.user = user
  ls.setItem('user', user)
}
// change user login status
export function UPDATE_AUTH (state, auth) {
  state.auth = auth
  ls.setItem('auth', auth)
}
