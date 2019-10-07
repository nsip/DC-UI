<template>
    <q-page id="dash">
        <h4 style="margin-left:50px; margin-top: 100px; color:gray">
            <img src="../../assets/crown-3.png" class="img-item">
            <b>My Dashboard</b>
        </h4>
        <hr class="line">
        <div class="dashboard">
            <q-card class="q-ma-sm banner">
                <q-card-media>
                    <q-parallax src="../../assets/9210-2.jpg" :height="300">
                        <div slot="loading">Loading...</div>
                    </q-parallax>
                    <q-card-title slot="overlay">
                        <q-item>
                            <b>Hello, {{username}} !
                                <img src="../../assets/happy.png" class="happy-logo">
                            </b>
                        </q-item>
                    </q-card-title>
                </q-card-media>
            </q-card>
            <div class="q-ma-sm">
                <h5 class="course-list-title" style="margin-bottom: 20px">
                    <b>My Courses</b>
                    <i class="fas fa-chalkboard-teacher q-ma-sm"></i>
                    <q-btn-group outline class="course-list-title-btn">
                        <q-btn outline rounded icon="fas fa-list-ul" color="deep-purple-6" class="course-list-title-q-btn" @click='selectedComponent = "appCourseList"' label="Course List" />
                        <q-btn outline rounded icon="fas fa-calendar-alt" color="deep-purple-6" class="course-list-title-q-btn" @click='selectedComponent = "appCourseCalender"' label="Course Calendar" />
                    </q-btn-group>
                </h5>
                <hr class="sep-2" />
            </div>
            <div v-if="isCourse">
                <div class="nocourse">
                    <p>Add your first plan from
                        <q-btn size="md" color="deep-purple-6" flat @click.native="$router.push({ name: 'scopeandsequnce', params: { username: username } })" label="Scope & Sequence"></q-btn>
                        or
                        <q-btn size="md" color="deep-purple-6" flat @click.native="$router.push({ name: 'coursesummary', params: { username: username } })" label="Course Summary"></q-btn>
                    </p>
                </div>
            </div>
            <div v-else>
                <transition name="component-fade" mode="out-in">
                    <component :is="selectedComponent" :username="username" :lessons="lessons" :coursetime="coursetime" :lessonschdule="lessonschdule">
                    </component>
                </transition>
            </div>
        </div>
        <!-- <vue-canvas-nest :config="{color:'49,27,146', opacity: 1, count: 299}" :el="'#dash'"></vue-canvas-nest> -->
    </q-page>
</template>
<script>
import CourseList from './CourseList.vue'
import Setting from './Setting.vue'
import CourseCalender from './CourseCalender.vue'
import { baseUrl, auth, n3baseUrl, authHeader } from '../../data'
import axios from 'axios'
// import vueCanvasNest from 'vue-canvas-nest'
// import { CalendarMonth } from 'quasar-calendar'

export default {
    props: ['username'],
    components: {
        appCourseList: CourseList,
        appCourseCalender: CourseCalender,
        appSetting: Setting
        // vueCanvasNest,
        // CalendarMonth
    },
    data() {
        return {
            selectedComponent: 'appCourseList',
            wholelessons: [],
            wholeSchedule: [],
            lessons: undefined,
            coursetime: [],
            lessonschdule: [],
            lessonArray: [],
            lessonsObject: undefined,
            baseUrl,
            auth
        }
    },
    // mounted () {
    //   this.$store.commit('user/setid', this.userid)
    // },
    computed: {
        isCourse() {
            if (this.wholelessons === null) {
                return true
            }
            return false
        }
    },
    created() {
        
        // get my lesson sequences
        axios({
            url: n3baseUrl + '/graphql',
            method: 'post',
            headers: authHeader,
            data: {
                query: sequenceQuery,
                variables: {
                    qspec: {
                        queryType: "findByType",
                        queryValue: "LessonSequence",
                        filters: [{
                            eq: ["LessonSequence", "userId", this.username]
                        }]
                    }
                }
            }
        }).then((res) => {
            // console.log(res)
            if (res.data.length === 0) {
                this.wholelessons = null
            } else {
                this.wholelessons = res.data.data.q.LessonSequence
            }
            this.lessons = this.wholelessons
        })

        // // get schedule
        // axios({
        //     url: this.baseUrl + '/id?userId=' + this.username + '&object=schedule',
        //     method: 'get',
        //     auth: this.auth
        // }).then((r) => {
        //     for (let i of r.data) {
        //         // console.log(i)
        //         axios({
        //             url: this.baseUrl + '/gql',
        //             method: 'post',
        //             auth: this.auth,
        //             data: {
        //                 query: `query {
        //       schedule{
        //         scheduleId
        //         userId
        //         thecolor
        //         lessonId
        //         thecourse
        //         lessontimesheet {
        //           summary
        //           color
        //           start {
        //             dateTime
        //           }
        //           end {
        //             dateTime
        //           }
        //           description
        //         }
        //       }
        //     }`,
        //                 variables: {
        //                     id: i
        //                 }
        //             }
        //         }).then((res) => {
        //             // console.log(res.data.data.schedule)
        //             var timesheet = []
        //             this.wholeSchedule.push(res.data.data.schedule)
        //             timesheet.push(res.data.data.schedule)
        //             for (let j of timesheet) {
        //                 // console.log(j)
        //                 for (let b = 0; b < j.lessontimesheet.length; b++) {
        //                     this.coursetime.push(j.lessontimesheet[b])
        //                 }
        //             }
        //             for (let c = 0; c < this.coursetime.length; c++) {
        //                 this.coursetime[c].id = c
        //             }
        //             // console.log(this.coursetime)
        //         })
        //         this.wholeSchedule = this.lessonschdule
        //         console.log(this.lessonschdule)
        //     }
        // })



    },
    methods: {
        deleteLesson(index) {
            this.$q.dialog({
                title: 'Comfirm',
                message: 'Are you sure to delete this lesson?',
                color: 'deep-purple-6',
                ok: true,
                cancel: true
            }).then(() => {
                this.$store.dispatch('user/deleteLesson', index)
            }).catch(() => {})
        }
    }
}

let sequenceQuery = `
query sequenceQuery($qspec: QueryInput!) {
  q(qspec: $qspec) {
    LessonSequence{
      thearea
      thecourse
      thestage
      thesubject
      thedescription
      userId
      lessonId
      lessonList{
        editcontent
        summary
        start {
          dateTime
        }
        end {
          dateTime
        }
      }
    }
  }
}
`
</script>