<template>
    <div id="mainpage">
        <div class="coursedetail">
            <q-page-sticky class="left-btn">
                <q-btn push icon="lightbulb_outline" align="between" label="Go to lesson planner" color="deep-purple-9" :to="{name:'courseplaner',params: {course, resultOverview, selectedarea, selectedcourse, selectedstage, username: username}}">
            </q-btn>
            </q-page-sticky>
        <div class="row">
            <div class="col-xs-12 col-zdlg-2-5">
                <q-btn
                    outline
                    color="deep-purple-9"
                    class="full-width"
                    label="COURSE"
                    icon="fas fa-chalkboard"
                    @click='selectedComponent = "appCourse"' />
            </div>
            <div class="col-xs-12 col-zdlg-2-5">
                <q-btn
                    outline
                    color="deep-purple-9"
                    class="full-width"
                    label="outcomes"
                    icon="fas fa-award"
                    @click='selectedComponent = "appOutcomes"' />
            </div>
            <div class="col-xs-12 col-zdlg-2-5">
                <q-btn
                    outline
                    color="deep-purple-9"
                    class="full-width"
                    label="Concepts"
                    icon="far fa-file-alt"
                    @click='selectedComponent = "appConcept"' />
            </div>
            <div class="col-xs-12 col-zdlg-2-5">
                <q-btn
                    outline
                    color="deep-purple-9"
                    class="full-width"
                    label="Skills"
                    icon="fas fa-atom"
                    @click='selectedComponent = "appSkills"' />
            </div>
            <div class="col-xs-12 col-zdlg-2-5">
                <q-btn
                    outline
                    color="deep-purple-9"
                    class="full-width"
                    label="Tools"
                    icon="fas fa-hammer"
                    @click='selectedComponent = "appTools"' />
            </div>
        </div>
            <div style="margin-top:80px">
            <h5><b>Course Name: {{ course.name }}</b></h5>
            <hr class="vertical-lines">
            </div>
            <div class="courseinfo">
            <transition name="component-fade" mode="out-in">
                <component
                    :is="selectedComponent"
                    :course="course"
                    :resultOverview="resultOverview"
                    >
                </component>
            </transition>
            </div>
        </div>
    </div>
</template>

<script>
import {baseUrl, auth} from '../../data'
import Course from './Course.vue'
import Concept from './Concept.vue'
import Outcomes from './Outcomes.vue'
import Skills from './Skills.vue'
import Tools from './Tools.vue'
import axios from 'axios'

export default {
  props: ['course', 'selectedarea', 'selectedcourse', 'selectedstage', 'resultOverview','Overviewuid', 'username'],
  components: {
    appCourse: Course,
    appConcept: Concept,
    appOutcomes: Outcomes,
    appSkills: Skills,
    appTools: Tools,
    Overviewuid: ''
  },
  data: () => {
    return {
      selectedComponent: 'appCourse',
      Overview: [],
      info: null,
      baseUrl,
      auth
    }
  },
  created () {
    // no web lookup required here, already done.
  }
}
</script>

<style scoped>
@media (min-width: 1200px) {
    .col-zdlg-2-5 {
        float:left;
        width:20%;
    }
}
</style>
