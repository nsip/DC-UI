/*
export function someAction (context) {
}
*/
import router from '../../router'

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
  console.log(lesson)
  if (!Array.isArray(lessons)) lessons = []
  if (lessons) {
    const Lessons = lesson
    // if (lessonId === undefined) {
    //   const lastLesson = lessons[lessons.length - 1]
    //   if (lastLesson) {
    //     lessonId = parseInt(lastLesson.lessonId) + 1
    //   } else {
    //     lessonId = lessons.length + 1
    //   }
    lessons.push({
      Lessons
    })
    // }
    commit('UPDATE_LESSONS', lessons)
    console.log(lessons)
    router.push({ name: 'dashboard', params: {Lessons} })
  }
}
