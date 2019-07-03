/*
export function someAction (context) {
}
*/
// import router from '../../router'
import axios from 'axios'

// register & login
export function login ({commit}, user) {
  // let user = state.user
  // if (!Array.isArray(user)) user = []
  if (user) commit('UPDATE_USER', user)
  // if (user) {
  //   const name = username
  //   const email = useremail
  //   const password = userpassword
  //   if (userid === undefined) {
  //     const lastUser = user[user.length + 1]
  //     if (lastUser) {
  //       userid = parseInt(lastUser.userid) + 1
  //     } else {
  //       userid = user.length + 1
  //     }
  //     user.push({
  //       userid,
  //       name,
  //       email,
  //       password
  //     })
  //   }
  //   console.log(user)
  // }
  commit('UPDATE_USER', user)
  // update user login status
  commit('UPDATE_AUTH', true)
  this.$router.push('/dashboard/' + user.name)
}
// logout
export function logout ({commit}) {
  commit('UPDATE_AUTH', false)
  this.$router.push({name: 'home', params: { logout: true }})
}
// create lesson plan
export function postlessons ({commit, state}, {submitLessons, area, course, subject, stage, des, userid, lessonId}) {
  console.log(lessonId)
  console.log(submitLessons)
  if (lessonId === undefined) {
    var d = new Date().getTime()
    if (Date.now) {
      d = Date.now()
    }
    lessonId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    // console.log(lessonId)
    console.log(submitLessons, area, course, subject, stage, des, userid, lessonId)
    axios
      .post('http://192.168.76.37:1323/pub?idmark=lessonId&dfltRoot=lesson', {
        lessonId: lessonId,
        lessonList: submitLessons,
        thearea: area,
        thecourse: course,
        thesubject: subject,
        thestage: stage,
        thedescription: des,
        userId: userid
      })
      // .then(console.log({
      //   lessonId: lessonId,
      //   lessonList: submitLessons,
      //   thearea: area,
      //   thecourse: course,
      //   thesubject: subject,
      //   thestage: stage,
      //   thedescription: des,
      //   userId: userid
      // }))
  } else {
    // console.log(submitLessons, area, course, subject, stage, des, userid, lessonId)
    console.log(submitLessons)
    for (let i = 0; i < submitLessons.length; i++) {
      // console.log(submitLessons[i].start.dateTime)
      if (submitLessons[i].start.dateTime === null || submitLessons[i].end.dateTime === null) {
        submitLessons[i].start.dateTime = ''
        submitLessons[i].end.dateTime = ''
      }
      for (let j of submitLessons[i].url) {
        console.log(j)
        if (j.DisplayURL === null || j.Name === null || j.Snippet === null || j.URL === null) {
          j.DisplayURL = ''
          j.Name = ''
          j.Snippet = ''
          j.URL = ''
        }
      }
    }
    console.log(submitLessons)
    axios
      .post('http://192.168.76.37:1323/pub?idmark=lessonId&dfltRoot=lesson', {
        lessonId: lessonId,
        lessonList: submitLessons,
        thearea: area,
        thecourse: course,
        thesubject: subject,
        thestage: stage,
        thedescription: des,
        userId: userid
      })
      // .then(console.log({
      //   lessonId: lessonId,
      //   lessonList: submitLessons,
      //   thearea: area,
      //   thecourse: course,
      //   thesubject: subject,
      //   thestage: stage,
      //   thedescription: des,
      //   userId: userid
      // }))
  }
  this.$router.push({ name: 'dashboard', params: {username: userid} })
}
// export function post ({commit, state}, {submitLessons, area, course, subject, stage, description, userid, lessonId}) {
//   let lessons = state.lessons
//   // console.log(submitLessons)
//   // if (!Array.isArray(lessons)) lessons = []
//   // if (lessons) {
//   // const lesson = submitLessons
//   // const thearea = area
//   // const thecourse = course
//   // const thesubject = subject
//   // const thestage = stage
//   // const thedescription = description
//   // const userId = userid
//   if (lessonId === undefined) {
//     // const lastLesson = lessons[lessons.length + 1]
//     // if (lastLesson) {
//     //   lessonId = parseInt(lastLesson.lessonId) + 1
//     // } else {
//     //   lessonId = lessons.length + 1
//     // }
//     var d = new Date().getTime()
//     if (Date.now) {
//       d = Date.now()
//     }
//     lessonId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//       var r = (d + Math.random() * 16) % 16 | 0
//       d = Math.floor(d / 16)
//       return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
//     })
//     console.log(lessonId)
//     commit('UPDATE_LESSONS', lessons)
//     console.log(lessons)
//     // lessons.push({
//     //   lesson,
//     //   userId,
//     //   lessonId,
//     //   thearea,
//     //   thecourse,
//     //   thesubject,
//     //   thestage,
//     //   thedescription
//     // })
//     axios
//       .post('http://192.168.76.37:1323/pub?idmark=lessonId&dfltRoot=lesson', {
//         lessonId: lessonId,
//         lessonList: submitLessons,
//         thearea: area,
//         thecourse: course,
//         thesubject: subject,
//         thestage: stage,
//         thedescription: description,
//         userId: userid
//       })
//     // Edit exist lesson plan
//   } else {
//     axios
//       .post('http://192.168.76.37:1323/pub?idmark=lessonId&dfltRoot=lesson', {
//         lessonId: lessonId,
//         lessonList: submitLessons,
//         thearea: area,
//         thecourse: course,
//         thesubject: subject,
//         thestage: stage,
//         thedescription: description,
//         userId: userid
//       })
//   //   for (let i of lessons) {
//   //     if (i.lessonId === lessonId) {
//   //       i.userId = userId
//   //       i.lesson = lesson
//   //       i.thearea = area
//   //       i.thecourse = course
//   //       i.thesubject = subject
//   //       i.thestage = stage
//   //       i.thedescription = description
//   //       break
//   //     }
//   //   }
//   }
//   this.$router.push({ name: 'dashboard', params: {username: userid} })
//   // }
// }
// deletelessonplan
export function deleteLesson ({commit, state}, payload) {
  console.log(payload)
  axios({
    url: 'http://192.168.76.37:1323/del?id=' + payload,
    method: 'delete'
  })
  // commit('DELETE_LESSONS', payload)
  // let lessons = state.lessons
  // commit('UPDATE_LESSONS', lessons)
}
// schedule lessson
export function postschedule ({commit, state}, {submmitschdule, lessonId, color, course, userid, schduleId}) {
  // let lessonschdule = state.lessonschdule
  // console.log(lessonschdule)
  // console.log(lessonId)
  // if (!Array.isArray(lessonschdule)) lessonschdule = []
  // if (lessonschdule) {
  // const lessontimesheet = submmitschdule
  // const thelessonId = lessonId
  // const thecolor = color
  // const thecourse = course
  // const userId = userid
  // schduleId = lessonschdule.length + 1
  if (schduleId === undefined) {
    // const lastlessonschdule = lessonschdule[lessonschdule.length + 1]
    // if (lastlessonschdule) {
    //   schduleId = parseInt(lastlessonschdule.schduleId) + 1
    // } else {
    //   schduleId = lessonschdule.length + 1
    // }
    var d = new Date().getTime()
    if (Date.now) {
      d = Date.now()
    }
    schduleId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    console.log(submmitschdule, lessonId, color, course, userid)
    axios
      .post('http://192.168.76.37:1323/pub?idmark=scheduleId&dfltRoot=schedule', {
        scheduleId: schduleId,
        lessontimesheet: submmitschdule,
        lessonId: lessonId,
        userId: userid,
        thecolor: color,
        thecourse: course
      })
  } else {
    console.log(submmitschdule, schduleId, lessonId, color, course, userid)
    axios
      .post('http://192.168.76.37:1323/pub?idmark=scheduleId&dfltRoot=schedule', {
        scheduleId: schduleId,
        lessontimesheet: submmitschdule,
        lessonId: lessonId,
        userId: userid,
        thecolor: color,
        thecourse: course
      })
  }
  // commit('UPDATE_LESSON_SCHDULE', lessonschdule)
  // console.log(lessonschdule)
  this.$router.push({ name: 'dashboard', params: {username: userid} })
  // }
}
// delete schedule
export function deleteschdule ({commit, state}, {index, userid}) {
  console.log(index)
  axios({
    url: 'http://192.168.76.37:1323/del?id=' + index,
    method: 'delete'
  })
  // commit('DELETE_LESSONS_SECHDULE', payload)
  // let lessonschdule = state.lessonschdule
  // console.log(lessonschdule)
  // commit('UPDATE_LESSON_SCHDULE', lessonschdule)
  this.$router.push({ name: 'dashboard', params: {username: userid} })
}
