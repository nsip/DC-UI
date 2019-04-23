<template>
    <q-page id="dash">
        <h4 style="margin-left:50px; margin-top: 100px; color:gray">
            <b>My Dashboard</b>
            <i class="fas fa-tachometer-alt q-ma-md"></i>
            </h4>
        <hr style="color:gray">
        <div class="dashboard">
            <q-card class="q-ma-sm">
                <q-card-media>
                    <q-parallax src="../../assets/gray-background.jpg" :height="300">
                        <div slot="loading">Loading...</div>
                    </q-parallax>
                </q-card-media>
            </q-card>
            <div class="q-ma-sm">
            <h5 class="course-list-title" style="margin-bottom: 20px">
                <b>My Course List</b>
                <i class="fas fa-chalkboard-teacher q-ma-sm"></i>
            </h5>
            <hr>
            </div>
            <div class="row q-ma-sm">
                <div v-for="lesson in lessons" :key="lesson.lessonId" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <q-card inline class="course-card" text-color="dark">
                        <q-card-title class="text-deep-purple-6">
                            <b>{{lesson.thecourse}}</b>
                            <span slot="subtitle">Learning Area: {{lesson.thearea}} | Subject: {{lesson.thesubject}} | Stage: {{lesson.thestage}}</span>
                            <q-btn round flat icon="fas fa-edit" slot="right" color="deep-purple-6" :to="{name: 'modify', params:{ lessonId: lesson.lessonId, lesson }}">
                              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                Modify
                              </q-tooltip>
                            </q-btn>
                            <q-btn round flat icon="fas fa-calendar-alt" slot="right" color="deep-purple-6" :to="{name: 'schedule', params:{ lessonId: lesson.lessonId, lesson }}">
                              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                Schedule
                              </q-tooltip>
                            </q-btn>
                            <q-btn round flat icon="fas fa-trash-alt" slot="right" color="deep-purple-6" @click="deleteLesson(lesson.lessonId)">
                              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                Delete
                              </q-tooltip>
                            </q-btn>
                        </q-card-title>
                        <q-card-separator />
                          <q-card-main>
                            <q-list>
                                <q-item>
                                    <q-item-side>
                                        <q-item-tile>
                                            Lesson Description
                                        </q-item-tile>
                                    </q-item-side>
                                    <q-item-main>
                                        <q-item-tile label>{{lesson.thedescription}}</q-item-tile>
                                    </q-item-main>
                                </q-item>
                            </q-list>
                        </q-card-main>
                    </q-card>
                </div>
                  <calendar-month
                  :event-array="coursetime"
                  :sunday-first-day-of-week="false"
                  NOcalendar-locale="fr"
                  NOcalendar-timezone="Australia/Melbourne"
                  :allow-editing="false"
                  :NOstart-date="new Date(2019, 1, 4)"
                  style="background-color:white; width:100%"
                />
            </div>
            <div v-for="(time, index) in lessonschdule" :key="index">
              {{time}}
              <!-- <q-btn @click="remove(index)">
                Remove
              </q-btn> -->
            </div>
        </div>
        <!-- <vue-canvas-nest :config="{color:'49,27,146', opacity: 1, count: 299}" :el="'#dash'"></vue-canvas-nest> -->
    </q-page>
</template>

<script>
import CourseList from './CourseList.vue'
import Setting from './Setting.vue'
// import vueCanvasNest from 'vue-canvas-nest'
import { CalendarMonth } from 'quasar-calendar'

export default {
  props: ['email'],
  components: {
    appCourseList: CourseList,
    appSetting: Setting,
    // vueCanvasNest,
    CalendarMonth
  },
  data () {
    return {
      selectedComponent: 'appCourseList',
      lessons: [],
      coursetime: [],
      lessonschdule: []
    }
  },
  created () {
    this.lessonschdule = []
    this.coursetime = []
    this.lessons = this.$store.state.user.lessons
    this.lessonschdule = JSON.parse(localStorage.lessonschdule)
    console.log(this.lessonschdule)
    // for (let a of lessonschdule) {
    //   for (let b of a.lessontimesheet) {
    //     this.coursetime.push(b)
    //   }
    //   console.log(this.coursetime)
    //   // for (let i = 0; i < a.lessontimesheet.length; i++) {
    //   //   a.lessontimesheet[i].id = i
    //   //   this.coursetime.push(a.lessontimesheet[i])
    //   // }
    // }
    // console.log(this.coursetime)
    // for (var i = 5; i < this.schduledlesson.length; i++) {
    //   this.j.push(this.schduledlesson[i].lessontimesheet)
    // }
    // console.log(this.j)
    // console.log(this.j)
    // for (var i = 5; i < this.schduledlesson.length; i++) {
    //   this.j = Object.assign(this.j, this.schduledlesson[i].lessontimesheet)
    // }
    // console.log(this.j)
    // const lessonId = this.$route.params.lessonId
    // console.log(this.$route.params.lessonId)
    // console.log(this.$store.getters.user.getLessonById(2))
  },
  methods: {
    deleteLesson (index) {
      this.$q.dialog({
        title: 'Comfirm',
        message: 'Are you sure to delete this lesson?',
        color: 'deep-purple-6',
        ok: true,
        cancel: true
      }).then(() => {
        this.$store.dispatch('user/deleteLesson', index)
      }).catch(() => {
      })
    }
    // remove (index) {
    //   this.$store.dispatch('user/deleteschdule', index)
    // }
    // deletethis (index) {
    //   this.$store.dispatch('user/deleteschdule', index)
    // }
  }
}
</script>

<style scope>
.dashboard {
    padding: 50px 200px;
}
.dashboard h4{
    color: gray
}
.course-list-title{
  color: gray
}
.card-link {
    cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 0;
    position: relative
}
.course-card {
    margin-bottom: 10px;
    width: 100%;
    background-color: white;
    /* transition: background-color 1.5s, color 1.5s; */
    cursor: default;
    border: whitesmoke 1px solid;
    box-shadow: none;
    transition: box-shadow 1s, border 1s;
}
.course-card:hover {
  box-shadow: 0 5px 5px rgba(0,0,0,0.2), 0 5px 5px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);
  border: whitesmoke 1px solid
}
/* .course-list:hover {
    background-color: #d1c4e9;
    color:#673ab7;
} */
</style>
