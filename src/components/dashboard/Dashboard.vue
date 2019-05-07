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
                <b>My Course</b>
                <i class="fas fa-chalkboard-teacher q-ma-sm"></i>
                <q-btn-group outline class="course-list-title-btn">
                <q-btn outline icon="fas fa-list-ul" color="deep-purple-6" class="course-list-title-q-btn" @click='selectedComponent = "appCourseList"' label="Course List" />
                <q-btn outline icon="fas fa-calendar-alt" color="deep-purple-6" class="course-list-title-q-btn" @click='selectedComponent = "appCourseCalender"' label="Course Calender" />
                </q-btn-group>
            </h5>
            <hr>
            </div>
            <transition name="component-fade" mode="out-in">
                <component
                    :is="selectedComponent"
                    :username = "username"
                    :coursetime = "coursetime"
                    :lessons = "lessons"
                    :lessonschdule = "lessonschdule"
                    >
                </component>
            </transition>
        </div>
        <!-- <vue-canvas-nest :config="{color:'49,27,146', opacity: 1, count: 299}" :el="'#dash'"></vue-canvas-nest> -->
    </q-page>
</template>

<script>
import CourseList from './CourseList.vue'
import Setting from './Setting.vue'
import CourseCalender from './CourseCalender.vue'
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
  data () {
    return {
      selectedComponent: 'appCourseList',
      wholelessons: [],
      wholeschdule: [],
      lessons: [],
      coursetime: [],
      lessonschdule: []
    }
  },
  // mounted () {
  //   this.$store.commit('user/setid', this.userid)
  // },
  created () {
    this.coursetime = []
    this.wholelessons = JSON.parse(localStorage.lessons)
    for (let i of this.wholelessons) {
      if (i.userId === this.username) {
        this.lessons.push(i)
      }
    }
    this.wholeschdule = JSON.parse(localStorage.lessonschdule)
    for (let a of this.wholeschdule) {
      if (a.userId === this.username) {
        this.lessonschdule.push(a)
      }
    }
    for (let j of this.lessonschdule) {
      for (let b = 0; b < j.lessontimesheet.length; b++) {
        this.coursetime.push(j.lessontimesheet[b])
      }
    }
    for (let c = 0; c < this.coursetime.length; c++) {
      this.coursetime[c].id = c
    }
    console.log(this.coursetime)
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
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity 1s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
.course-list-title-btn {
  float: right
}
/* .course-list:hover {
    background-color: #d1c4e9;
    color:#673ab7;
} */
</style>
