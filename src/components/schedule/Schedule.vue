<template>
<q-page id="schedule">
  <h4 style="margin-left:50px; margin-top: 100px; color:gray">
      <b>Schedule Your Lessons</b>
      <i class="fas fa-calendar-alt q-ma-md"></i>
  </h4>
  <hr style="color:gray">
  <div class="schedule">
    <div class="row">
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
          <q-card class="q-ma-lg lessonlist">
          <q-card-media>
            <q-parallax :src="'../../assets/Knowledge04.jpg'" :height="300" class="pic">
              <div slot="loading">Loading...</div>
            </q-parallax>
          </q-card-media>
            <q-card-title>
              <q-item>
            <q-item-side></q-item-side>
              <b>{{coursename}}</b>
              </q-item>
              </q-card-title>
            <div class="lesson-list">
              <q-list v-for="(lesson, index) in lessonlist" :key="index" text-color="dark" class="course">
                  <q-item>
                    <q-item-side></q-item-side>
                    <q-item-main>
                      <q-item-tile class="course-title">{{lesson.summary}}</q-item-tile>
                      <q-field
                        color="deep-purple-6"
                      >
                      <q-datetime
                        color="deep-purple-6"
                        v-model="lesson.start.dateTime"
                        type="datetime"
                        float-label="Pick Start Date&Time"
                      />
                      </q-field>
                      <q-field
                        color="deep-purple-6"
                      >
                      <q-datetime
                        color="deep-purple-6"
                        v-model="lesson.end.dateTime"
                        type="datetime"
                        float-label="Pick End Date&Time"
                      />
                      </q-field>
                    </q-item-main>
                    <q-item-side></q-item-side>
                  </q-item>
                </q-list>
              </div>
              <q-card-separator />
                <q-card-title>
                  <q-btn @click="save" outline rounded slot="right" icon="fas fa-save" color="deep-purple-6" label="Save"/>
                </q-card-title>
          </q-card>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
    </div>
  </div>
</q-page>
</template>

<script>
import { QSpinnerPie } from 'quasar'
export default {
  props: ['lessonId', 'username'],
  components: {
    // vueCanvasNest,
    // CalendarMonth
  },
  data () {
    return {
      // showschdule: [],
      coursename: undefined,
      schdule: [],
      isempty: false,
      schduleId: undefined,
      obj: undefined,
      description: undefined,
      des: undefined,
      lessonsArray: [],
      lessonlist: [],
      schduledatetime: undefined,
      j: 0,
      colorArray: ['purple', 'indigo', 'blue', 'cyan', 'teal', 'orange', 'blue-grey', 'grey'],
      seletedcolor: ''
    }
  },
  created () {
    this.lessonid = this.lessonId
    console.log(this.lessonid)
    this.lessonsArray = JSON.parse(localStorage.lessons)
    console.log(this.lessonsArray)
    for (let i of this.lessonsArray) {
      if (parseInt(i.lessonId) === this.lessonid) {
        console.log(i.lesson)
        this.des = i.thedescription
        this.lessonlist = i.lesson
        this.coursename = i.thecourse
        break
      }
    }
    this.j = this.lessonlist.length
    this.seletedcolor = this.colorArray[Math.floor(Math.random() * this.colorArray.length)]
    console.log(this.seletedcolor)
    for (var i = 0; i < this.j; i++) {
      this.lessonlist[i].description = this.des
      this.lessonlist[i].color = this.seletedcolor
    }
  },
  methods: {
    save () {
      this.schdule = []
      var a = this.lessonlist
      for (let i = 0; i < a.length; i++) {
        this.schdule.push(a[i])
      }
      console.log(this.schdule)
      for (let i = 0; i < this.schdule.length; i++) {
        // console.log(submmitschdule[i] + i)
        if (this.schdule[i].end.dateTime === '' || this.schdule[i].start.dateTime === '') {
          this.$q.notify({
            message: `Please manage all the courses time`,
            color: 'amber',
            icon: 'fas fa-info-circle',
            position: 'center',
            actions: [ { label: 'Got it', handler: () => console.log('Clicked on a notification handler') } ]
          })
          return this.isempty === true
        }
      }
      if (this.isempty === false) {
        const lessonId = this.lessonid
        const submmitschdule = this.schdule
        const color = this.seletedcolor
        const course = this.coursename
        const userid = this.username
        this.$q.loading.show({
          spinner: QSpinnerPie,
          spinnerColor: 'amber',
          spinnerSize: 100,
          message: 'Saving the schedule now ...'
        })
        setTimeout(() => {
          this.$q.loading.hide()
          this.$store.dispatch('user/postschedule', {submmitschdule, lessonId, color, course, userid})
        }, 3000)
      }
    },
    clearData () {
      for (let i = 0; i < this.lessonlist.length; i++) {
        this.lessonlist[i].start.dateTime = ''
        this.lessonlist[i].end.dateTime = ''
      }
    }
  }
}
</script>

<style scoped>
.schedule {
    padding: 50px 200px;
}
.schedule h4{
    color: gray
}
.datetimepicker {
  background-color: white;
}
.lessonlist {
  background-color: white;
  border-radius: 55px;
}
.course-title {
  font-size: 18px;
  color: #9575cd
}
.lessonlist-title b{
  color: rgb(103, 58, 183) !important;
}
.schedule-calendar {
  background-color: white
}
.lessonlist b {
  color: rgb(103, 58, 183);
  font-size: x-large;
}
.course {
  border: none
}
</style>
