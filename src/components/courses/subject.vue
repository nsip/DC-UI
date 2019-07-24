<template>
    <div id="mainpage">
        <div class="coursedetail">
            <q-page-sticky class="left-btn">
                <q-btn push icon="lightbulb_outline" align="between" label="Go lesson plan" color="deep-purple-9" :to="{name:'courseplaner',params: {course, Overview, selectedarea, selectedcourse, selectedstage, username: username}}">
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
            <hr class="vertical-lines">
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
        <!-- <vue-canvas-nest :config="{color:'49,27,146', opacity: 1, count: 299}" :el="'#mainpage'"></vue-canvas-nest> -->
    </div>
</template>

<script>
import Course from './Course.vue'
import Concept from './Concept.vue'
import Outcomes from './Outcomes.vue'
import Skills from './Skills.vue'
import Tools from './Tools.vue'
// import vueCanvasNest from 'vue-canvas-nest'
// import axios from 'axios'

export default {
  props: ['course', 'selectedarea', 'selectedcourse', 'selectedstage', 'Overviewuid', 'username'],
  components: {
    appCourse: Course,
    appConcept: Concept,
    appOutcomes: Outcomes,
    appSkills: Skills,
    appTools: Tools,
    Overviewuid: ''
    // vueCanvasNest
  },
  data: () => {
    return {
      selectedComponent: 'appCourse',
      Overview: [],
      info: null
    }
  },
  created () {
    console.log(this.Overviewuid)
    const axios = require('axios')
    // axios({
    //   url: 'http://192.168.76.37:1323/id?learning_area=' + this.selectedarea + '&subject=' + this.selectedcourse + '&stage=' + this.selectedstage + '&object=Overview',
    //   methods: 'get'
    // }).then((res) => {
    //   this.Overviewuid = res.data[0]
    //   console.log(this.Overviewuid)
    // })
    axios({
      // url: 'http://localhost:1330/graphql',
      url: 'http://192.168.76.37:1323/gql',
      method: 'post',
      data: {
        query: `{
          Overview {
            concepts {
              name
              description
            }
            inquiry_skills {
              name
              skills {
                skill
              }
            }
            tools {
              name
              examples
            }
          }
        }`,
        variables: {
          objid: this.Overviewuid
        }
      }
    }).then((result) => {
      // this.Overview = result.data.data.overview
      console.log(result.data.data.Overview)
      this.Overview = result.data.data.Overview
    }).catch((error) => {
      // handle error
      console.log(error)
    })
  },
  mounted () {
    // const axios = require('axios')
    // // axios({
    // //   url: 'http://192.168.76.37:1323/id?learning_area=' + this.selectedarea + '&subject=' + this.selectedcourse + '&stage=' + this.selectedstage + '&object=Overview',
    // //   methods: 'get'
    // // }).then((res) => {
    // //   this.Overviewuid = res.data[0]
    // //   console.log(this.Overviewuid)
    // // })
    // axios({
    //   // url: 'http://localhost:1330/graphql',
    //   url: 'http://192.168.76.37:1323/gql',
    //   method: 'post',
    //   data: {
    //     query: `{
    //       Overview {
    //         concepts {
    //           name
    //         }
    //         inquiry_skills {
    //           name
    //         }
    //         tools {
    //           name
    //         }
    //       }
    //     }`,
    //     variables: {
    //       objid: this.Overviewuid
    //     }
    //   }
    // }).then((result) => {
    //   // this.Overview = result.data.data.overview
    //   console.log(result)
    // }).catch((error) => {
    //   // handle error
    //   console.log(error)
    // })
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
