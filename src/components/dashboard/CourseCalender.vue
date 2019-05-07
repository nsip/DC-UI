<template>
<div class="row">
  <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
    <div v-for="schdule in lessonschdule" :key="schdule.schduleId" class="q-ma-sm">
          <q-card inline class="course-card" :text-color="schdule.thecolor">
            <q-card-title>
                <b>{{schdule.thecourse}}</b>
                <q-btn round flat icon="fas fa-pencil-alt" slot="right" color="deep-purple-6" :to="{name: 'modifyschedule', params:{ schduleId: schdule.schduleId, username: username, schdule }}">
                    <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                      Modify Schedule
                    </q-tooltip>
                </q-btn>
            </q-card-title>
        </q-card>
    </div>
    <!-- <div v-for="schdule in lessonschdule" :key="schdule.schduleId">{{schdule}}</div> -->
  </div>
<div class="col-xs-12 col-sm-12 col-md-9 col-lg-9">
    <calendar-month
        class="q-ma-sm course-calendar"
        :event-array="coursetime"
        :sunday-first-day-of-week="false"
        NOcalendar-locale="fr"
        NOcalendar-timezone="Australia/Melbourne"
        :allow-editing="false"
        :NOstart-date="new Date(2019, 1, 4)"
        style="background-color:white"
  />
  </div>
</div>
</template>

<script>
import { CalendarMonth } from 'quasar-calendar'
export default {
  props: ['coursetime', 'lessonschdule', 'username'],
  components: {
    CalendarMonth
  }
}
</script>

<style scope>
.course-calendar {
  box-shadow: 0 5px 5px rgba(0,0,0,0.2), 0 5px 5px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);
}
</style>
