/*
export function someMutation (state) {
}
*/
export function getWy (state, input) {
  state.lessons.content = input
  // console.log(input)
}
export function getTitle (state, input) {
  state.lessons.title = input
}
export function addLesson (state, index) {
  state.lessons.push(index)
}
export function setActive (state) {
  state.lessons.isActive = false
}
// export function REMOVE_LESSON (state, lesson) {
//   state.lessons.$remove(lesson)
// }
