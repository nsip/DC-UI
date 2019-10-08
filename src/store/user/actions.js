import axios from 'axios'
import { auth, baseUrl, n3baseUrl, authHeader } from '../../data.js'

// register & login
export function login({ commit }, user) {
    if (user) commit('UPDATE_USER', user)
    commit('UPDATE_USER', user)
    // update user login status
    commit('UPDATE_AUTH', true)
    this.$router.push('/dashboard/' + user.name)
}

// logout
export function logout({ commit }) {
    commit('UPDATE_AUTH', false)
    this.$router.push({ name: 'home', params: { logout: true } })
}

// create & modify lesson plan
export function postlessons({ commit, state }, { submitLessons, area, course, subject, stage, des, userid, lessonId }) {
    console.log(lessonId)
    console.log(submitLessons)
    if (lessonId === undefined) {
        var d = new Date().getTime()
        if (Date.now) {
            d = Date.now()
        }
        lessonId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0
            d = Math.floor(d / 16)
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
        })
        console.log(submitLessons, area, course, subject, stage, des, userid, lessonId)
        axios({
            url: n3baseUrl + '/publish',
            method: 'post',
            headers: authHeader,
            data: [{
                lessonId: lessonId,
                lessonList: submitLessons,
                thearea: area,
                thecourse: course,
                thesubject: subject,
                thestage: stage,
                thedescription: des,
                userId: userid
            }]
        })

    } else {
        for (let i = 0; i < submitLessons.length; i++) {
            if (submitLessons[i].start.dateTime === null || submitLessons[i].end.dateTime === null) {
                submitLessons[i].start.dateTime = ''
                submitLessons[i].end.dateTime = ''
            }
            // 
            // sadly, never passed through from editor...needs fixing!
            // 
            // for (let j of submitLessons[i].url) {
            //   console.log(j)
            //   if (j.DisplayURL === null || j.Name === null || j.Snippet === null || j.URL === null) {
            //     j.DisplayURL = ''
            //     j.Name = ''
            //     j.Snippet = ''
            //     j.URL = ''
            //   }
            // }
        }

        axios({
            url: n3baseUrl + '/publish',
            method: 'post',
            headers: authHeader,
            data: [{
                lessonId: lessonId,
                lessonList: submitLessons,
                thearea: area,
                thecourse: course,
                thesubject: subject,
                thestage: stage,
                thedescription: des,
                userId: userid
            }]
        })

    }
    this.$router.push({ name: 'dashboard', params: { username: userid } })
}


// 
// delete lessonplan
// 
export function deleteLesson({ commit, state }, payload) {
    // disbled for now...
    // axios({
    //     url: baseUrl + '/del?id=' + payload,
    //     auth: auth,
    //     method: 'delete'
    // })
}


// 
// create schedule for lessson sequence
// 
export function postschedule({ commit, state }, { submmitschdule, lessonId, color, course, userid, schduleId }) {
    if (schduleId === undefined) {
        var d = new Date().getTime()
        if (Date.now) {
            d = Date.now()
        }
        schduleId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0
            d = Math.floor(d / 16)
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
        })
    }
    axios({
        url: n3baseUrl + '/publish',
        method: 'post',
        headers: authHeader,
        data: [{
            scheduleId: schduleId,
            lessontimesheet: submmitschdule,
            lessonId: lessonId,
            userId: userid,
            thecolor: color,
            thecourse: course
        }]
    })
    console.log("submitted schedule: ", submmitschdule)
    this.$router.push({ name: 'dashboard', params: { username: userid } })
}




// 
// update a schedule
// 
export function modifyschedule({ commit, state }, { modifyschdule, lessonId, color, course, userid, schduleId }) {
    for (let i of modifyschdule) {
        delete i.durationMinutes
        delete i.id
        delete i.numberOfOverlaps
        delete i.overlapIteration
        delete i.durationDays
        delete i.timeSpansOvernight
        delete i.timeSpansMultipleDays
        delete i.daysFromStart
        delete i.hasNext
        delete i.hasPrev
        delete i.slot
        delete i.end.dateObject
        delete i.start.dateObject
        delete i.allowEditing
    }

    axios({
        url: n3baseUrl + '/publish',
        method: 'post',
        headers: authHeader,
        data: [{
            scheduleId: schduleId,
            lessontimesheet: modifyschdule,
            lessonId: lessonId,
            userId: userid,
            thecolor: color,
            thecourse: course
        }]
    })
    console.log("modified schedule: ", modifyschdule)
    this.$router.push({ name: 'dashboard', params: { username: userid } })
}


// delete schedule
export function deleteschdule({ commit, state }, { index, userid }) {
    console.log(index)
    // disabled for now
    // axios({
    //     // url: 'http://192.168.76.37:1323/del?id=' + index,
    //     url: baseUrl + '/del?id=' + index,
    //     auth: auth,
    //     method: 'delete'
    // })
    this.$router.push({ name: 'dashboard', params: { username: userid } })
}