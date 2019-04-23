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
// update lessons
export function UPDATE_LESSONS (state, newlessons) {
  state.lessons = newlessons
  ls.setItem('lessons', newlessons)
}
export function DELETE_LESSONS (state, i) {
  console.log(state.lessons)
  var index = state.lessons.findIndex(lesson => lesson.lessonId === i)
  // console.log(index)
  state.lessons.splice(index, 1)
}
export function UPDATE_LESSON_SCHDULE (state, newlessonschdule) {
  state.lessonschdule = newlessonschdule
  ls.setItem('lessonschdule', newlessonschdule)
}
export function DELETE_LESSONS_SECHDULE (state, i) {
  var index = state.lessonschdule.findIndex(lessonschdule => lessonschdule.schduleId === i)
  state.lessons.splice(index, 1)
}
export function UPDATE_LESSONS_SECHDULE (state, newlessonschdule) {
  state.lessonschdule = newlessonschdule
  ls.setItem('lessonschdule', newlessonschdule)
}
