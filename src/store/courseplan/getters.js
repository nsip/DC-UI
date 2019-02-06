/*
export function someGetter (state) {
}
*/
// export function getContent (state) {
//   return state.lessons
// }
// export function getTitle (state) {
//   return state.lessons.title
// }
// export function getLesson (state) {
//   return state.lesson
// }
export function lessonSet (state) {
  state.lessonList.map(lessonId => state.lessons[lessonId])
}
