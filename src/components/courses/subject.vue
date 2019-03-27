<template>
    <div id="mainpage">
        <div class="coursedetail">
            <div class="right-btn">
                <q-btn push icon="lightbulb_outline" align="between" label="lesson plan" color="deep-purple-9" :to="{name:'courseplaner',params: {course, selectedarea, selectedcourse, selectedstage}}">
            </q-btn>
            </div>
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
                    label="Concept"
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
            <hr>
            </div>
            <div class="courseinfo">
            <transition name="component-fade" mode="out-in">
                <component
                    :is="selectedComponent"
                    :course="course"
                    :Overview="Overview"
                    >
                </component>
            </transition>
            </div>
        </div>
        <vue-canvas-nest :config="{color:'49,27,146', opacity: 1, count: 299}" :el="'#mainpage'"></vue-canvas-nest>
    </div>
</template>

<script>
import Course from './Course.vue'
import Concept from './Concept.vue'
import Outcomes from './Outcomes.vue'
import Skills from './Skills.vue'
import Tools from './Tools.vue'
import vueCanvasNest from 'vue-canvas-nest'
// import axios from 'axios'

export default {
  props: ['course', 'selectedarea', 'selectedcourse', 'selectedstage'],
  components: {
    appCourse: Course,
    appConcept: Concept,
    appOutcomes: Outcomes,
    appSkills: Skills,
    appTools: Tools,
    vueCanvasNest
  },
  data: () => {
    return {
      selectedComponent: 'appCourse',
      Overview: [],
      info: null
    }
  },
  mounted () {
    const axios = require('axios')
    axios({
      url: 'http://localhost:1330/graphql',
      method: 'post',
      data: {
        query: `query ContentQuery($state: String!, $learning_area: String!, $subject: String!, $stage: String!) {
                overview(state: $state, learning_area: $learning_area, subject: $subject, stage: $stage){
                    concepts {
                        name
                        description
                    }
                    inquiry_skills {
                        name
                        skills {
                            skill
                            ac
                        }
                    }
                    tools {
                        name
                        examples
                    }
                }
            }`,
        variables: {
          state: 'nsw',
          learning_area: this.selectedarea,
          subject: this.selectedcourse,
          stage: this.selectedstage
        }
      }
    }).then((result) => {
      this.Overview = result.data.data.overview
      console.log(result.data.data.overview)
    })
  }
}
</script>

<style scoped>
.q-btn {
 border-radius: 0
}
.coursedetail {
    margin: 100px 200px
}
h5 {
    color: #4527a0
}
@media (min-width: 1200px) {
    .col-zdlg-2-5 {
        float:left;
        width:20%;
    }
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity 1s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
.courseinfo {
    text-align: justify
}
.right-btn{
    position:fixed;
    bottom: -4px;
    right: 10px
}
</style>
