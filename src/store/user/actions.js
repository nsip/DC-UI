/*
export function someAction (context) {
}
*/
// import router from '../../router'

export function login ({commit}, user) {
  if (user) commit('UPDATE_USER', user)
  // update user login status
  commit('UPDATE_AUTH', true)
  this.$router.push('/dashboard/' + user.name)
  console.log(user.password)
}
export function logout ({commit}) {
  commit('UPDATE_AUTH', false)
  this.$router.push('/')
}
export function post ({commit, state}, lesson) {
  let lessons = state.lessons
  // if (!Array.isArray(lessons)) lessons = []
  // if (lessons) {
  const submitLessons = lesson
  // if (lessonsId === undefined) {
  //   const lastLesson = lessons[lessons.length - 1]
  //   if (lastLesson) {
  //     lessonsId = parseInt(lastLesson.lessonsId) + 1
  //   } else {
  //     lessonsId = lessons.length + 1
  //   }
  lessons.push({
    submitLessons
  })
  // }
  commit('UPDATE_LESSONS', lessons)
  console.log(lessons)
  // router.push({ name: 'dashboard', params: {submitLessons} })
  // }
}
