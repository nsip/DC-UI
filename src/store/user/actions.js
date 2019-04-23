/*
export function someAction (context) {
}
*/
// import router from '../../router'

export function login ({commit}, user) {
  if (user) commit('UPDATE_USER', user)
  // update user login status
  commit('UPDATE_AUTH', true)
  // this.$router.push('/dashboard/' + user.name)
  this.$router.push('/dashboard')
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
    } else {
      for (let i of lessons) {
        if (parseInt(i.lessonId) === parseInt(lessonId)) {
          i.lesson = lesson
          i.thearea = area
          i.thecourse = course
          i.thesubject = subject
          i.thestage = stage
          i.thedescription = description
          break
        }
      }
    }
    commit('UPDATE_LESSONS', lessons)
    console.log(lessons)
    this.$router.push({ name: 'dashboard', params: {lessonId} })
  }
}
export function deleteLesson ({commit, state}, payload) {
  commit('DELETE_LESSONS', payload)
  console.log(state.lessons)
  let lessons = state.lessons
  commit('UPDATE_LESSONS', lessons)
  // context.commit('UPDATE_LESSONS', payload)
}
export function postschedule ({commit, state}, {submmitschdule, lessonId, schduleId}) {
  let lessonschdule = state.lessonschdule
  console.log(lessonschdule)
  // console.log(lessonId)
  if (!Array.isArray(lessonschdule)) lessonschdule = []
  if (lessonschdule) {
    const lessontimesheet = submmitschdule
    const thelessonId = lessonId
    schduleId = lessonschdule.length + 1
    //   if (schduleId === undefined) {
    //     const lastlessonschdule = lessonschdule[lessonschdule.length + 1]
    //     if (lastlessonschdule) {
    //       schduleId = parseInt(lastlessonschdule.schduleId) + 1
    //     } else {
    //       schduleId = lessonschdule.length + 1
    //     }
    //   }
    //   // console.log(lessontimesheet)
    //   // console.log(schduleId)
    lessonschdule.push({
      schduleId,
      thelessonId,
      lessontimesheet
    })
    commit('UPDATE_LESSON_SCHDULE', lessonschdule)
    console.log(lessonschdule)
    // this.$router.push({ name: 'dashboard' })
  }
}
export function deleteschdule ({commit, state}, payload) {
  commit('DELETE_LESSONS_SECHDULE', payload)
  let lessonschdule = state.lessonschdule
  commit('UPDATE_LESSONS_SECHDULE', lessonschdule)
}
