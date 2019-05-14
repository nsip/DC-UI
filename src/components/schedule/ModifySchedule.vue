<template>
  <div id="modifyschedule">
  <h4 style="margin-left:50px; margin-top: 100px; color:gray">
      <b>Modify Your Sechdule</b>
      <i class="fas fa-calendar-alt q-ma-md"></i>
  </h4>
  <hr style="color:gray">
  <div class="schedule">
    <div class="row">
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
      <!-- <q-card inline class="q-ma-lg lessonlist">
        <q-card-media overlay-position="top">
          <img src="../../assets/2984.jpg">
          <q-card-title slot="overlay">
            {{title}}
          </q-card-title>
        </q-card-media>
      </q-card> -->
      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <q-card class="q-ma-lg lessonlist">
          <q-card-media>
            <q-parallax :src="'../../assets/Knowledge04.jpg'" :height="300">
              <div slot="loading">Loading...</div>
            </q-parallax>
          </q-card-media>
            <q-card-title>
              <q-item>
                <q-item-side></q-item-side>
              <b>{{title}}</b>
              </q-item>
              </q-card-title>
              <div v-for="(course, index) in localtimesheet" :key="index">
                <q-list text-color="dark" class="time-sheet q-ma-sm">
                  <q-item>
                    <q-item-side></q-item-side>
                    <q-item-main>
                      <q-item-tile class="course-title">{{course.summary}}</q-item-tile>
                      <q-field
                        color="deep-purple-6"
                      >
                      <q-datetime
                        color="deep-purple-6"
                        v-model="course.start.dateTime"
                        type="datetime"
                        float-label="Pick Start Date&Time"
                      />
                      </q-field>
                      <q-field
                        color="deep-purple-6"
                      >
                      <q-datetime
                        color="deep-purple-6"
                        v-model="course.end.dateTime"
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
                  <q-btn-group slot="right" outline>
                    <q-btn @click="save" outline rounded color="deep-purple-6" icon="fas fa-save" label="Save"/>
                    <q-btn @click="remove" outline rounded color="deep-purple-6" icon="fas fa-trash-alt" label="Delete"/>
                  </q-btn-group>
                </q-card-title>
          </q-card>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
    </div>
  </div>
</div>
</template>

<script>
import { QSpinnerPie } from 'quasar'
export default {
  props: ['schduleId', 'username'],
  data () {
    return {
      localschdule: [],
      localtimesheet: [],
      title: undefined,
      picheight: undefined
    }
  },
  created () {
    this.localschdule = JSON.parse(localStorage.lessonschdule)
    console.log(this.localschdule)
    for (let i of this.localschdule) {
      this.title = i.thecourse
      if (parseInt(i.schduleId) === this.schduleId) {
        console.log(i.lessontimesheet)
        this.localtimesheet = i.lessontimesheet
        break
      }
    }
  },
  methods: {
    save () {
      const submmitschdule = this.localtimesheet
      const schduleId = this.schduleId
      const userid = this.username
      this.$q.loading.show({
        spinner: QSpinnerPie,
        spinnerColor: 'amber',
        spinnerSize: 100,
        message: 'Saving the schedule now ...'
      })
      setTimeout(() => {
        this.$q.loading.hide()
        this.$store.dispatch('user/postschedule', {submmitschdule, schduleId, userid})
      }, 3000)
    },
    remove () {
      const index = this.schduleId
      this.$q.dialog({
        title: 'Comfirm',
        message: 'Are you sure to delete this schedule?',
        color: 'deep-purple-6',
        ok: true,
        cancel: true
      }).then(() => {
        this.$store.dispatch('user/deleteschdule', index)
      }).catch(() => {
      })
    }
  }
}
</script>
