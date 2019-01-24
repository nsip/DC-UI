/*
export function someAction (context) {
}
*/
export function login ({commit}, user) {
  if (user) commit('UPDATE_USER', user)
  // update user login status
  commit('UPDATE_AUTH', true)
  this.$router.push('/dashboard')
}
export function logout ({commit}) {
  commit('UPDATE_AUTH', false)
  this.$router.push('/')
}
