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
export function post ({commit, state}, {submitLessons, area, course, subject, stage, description, lessonId}) {
  let lessons = state.lessons
  console.log(submitLessons)
  if (!Array.isArray(lessons)) lessons = []
  if (lessons) {
    const lesson = submitLessons
    const thearea = area
    const thecourse = course
    const thesubject = subject
    const thestage = stage
    const thedescription = description
    console.log(lessons.length)
    if (lessonId === undefined) {
      const lastLesson = lessons[lessons.length + 1]
      if (lastLesson) {
        lessonId = parseInt(lastLesson.lessonId) + 1
      } else {
        lessonId = lessons.length + 1
      }
      lessons.push({
        lesson,
        lessonId,
        thearea,
        thecourse,
        thesubject,
        thestage,
        thedescription
      })
    }
    commit('UPDATE_LESSONS', lessons)
    console.log(lessons)
    // router.push({ name: 'dashboard', params: {lessonId} })
  }
}
export function deleteLesson ({commit, state}, payload) {
  commit('DELETE_LESSONS', payload)
  console.log(state.lessons)
  let lessons = state.lessons
  commit('UPDATE_LESSONS', lessons)
  // context.commit('UPDATE_LESSONS', payload)
}
