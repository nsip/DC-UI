/*
export function someMutation (state) {
}
*/
export function updateLesson (state, input) {
  state.lessons.content.text = input
  console.log(input)
}
export function getTitle (state, input) {
  state.lessons.title = input
}
export function addLesson (state, lesson) {
  state.lessons.push(lesson)
  console.log(lesson)
}
export function setActive (state) {
  state.lessons.isActive = false
}
export function getLesson (state, lessonId) {
  return state.lessons[lessonId].content
}
// export function REMOVE_LESSON (state, lesson) {
//   state.lessons.$remove(lesson)
// }
