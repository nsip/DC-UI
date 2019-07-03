<template>
    <q-page>
      <div id="summary">
        <div class="summary">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <h5 class="q-ma-lg" style="margin-top:150px; color:gray"><b>Choose Learning area, Subject and Stage to get the courses summary</b></h5>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
                    <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align:center">
                        <img src="../../assets/padlogo.png" style="width:350px; height:350px">
                    </div>
                </div>
                <div class="row searchbox">
                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 input">
                        <q-select
                            class="select"
                            stack-label="Select the learning area"
                            color="white"
                            inverted-light
                            separator
                            v-model="selectedarea"
                            :options="areas"
                            @blur="$v.selectedarea.$touch"
                        />
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 input">
                        <q-select
                            class="select"
                            stack-label="Pick the subject"
                            inverted-light
                            color="white"
                            v-model="selectedcourse"
                            separator
                            :options="courses"
                            @blur="$v.selectedcourse.$touch"
                        />
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 input">
                        <q-select
                            class="select"
                            stack-label="Choose the stage"
                            inverted-light
                            color="white"
                            separator
                            v-model="selectedstage"
                            :options="stages"
                            @blur="$v.selectedstage.$touch"
                        />
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 input-btn">
                    <div>
                        <q-btn class="full-width search-btn select" color="deep-purple-9" :loading="loading" @click="getReslut" :disable="!selectedarea || !selectedcourse || !selectedstage">
                          Search
                        <span slot="loading">
                            <q-spinner class="on-left" />
                            Searching...
                        </span>
                        </q-btn>
                    </div>
                    </div>
                </div>
                    <!-- <q-select
                            class="select"
                            stack-label="Select the learning area"
                            color="white"
                            inverted-light
                            separator
                            v-model="selectedteacher"
                            :options="teachers"
                      /> -->
        </div>
        <hr class="line">
        <!-- <vue-canvas-nest :config="{color:'49,27,146', opacity: 1, count: 199}" :el="'#summary'"></vue-canvas-nest> -->
      </div>
        <div class="summary row list">
        <transition-group
          appear
          enter-active-class="animated fadeInRight"
          class="group">
            <q-card inline class="q-ma-sm course-card" color="white" text-color="dark" v-for="course in resultCotent.courses" :key="course.name" v-show="isshow">
                <q-card-title class="relative-position text-deep-purple-6">
                    <p><b>{{course.name}}</b></p>
                    <span slot="subtitle">10 weeks - 25 hours</span>
                    <q-btn round flat icon="more_vert" slot="right" color="deep-purple-4">
                        <q-popover>
                            <q-list link class="no-border">
                            <q-item v-close-overlay>
                                <q-item-main>
                                    <router-link :to="{name:'courseplaner', params:{course, Overview, selectedarea, selectedcourse, selectedstage, username: username}}" class="link">Go to Lesson Plan</router-link>
                                </q-item-main>
                            </q-item>
                            <q-item v-close-overlay>
                                <q-item-main label="Share" />
                            </q-item>
                            </q-list>
                        </q-popover>
                        </q-btn>
                </q-card-title>
                <q-card-main>
                    <q-card-separator />
                    <p><b>Focus</b></p>
                    <p>{{course.focus}}</p>
                    <q-card-separator />
                    <p><b>Outcomes</b></p>
                        <p><i v-for="id in course.outcomes" :key="id.id">{{id.id}}, </i></p>
                    <q-card-separator />
                    <p><b>Geographical concepts, skills and tools</b></p>
                    <ul>
                        <li>Concepts - <i v-for="concept in Overview.concepts" :key="concept.name">{{concept.name}},</i></li>
                        <li>Skills - <i v-for="skill in Overview.inquiry_skills" :key="skill.name">{{skill.name}}, </i></li>
                        <li>Tools - <i v-for="tool in Overview.tools" :key="tool.name">{{tool.name}}, </i></li>
                    </ul>
                    <q-card-separator />
                    <p><b>Key inquiry questions</b></p>
                    <ul>
                        <li v-for="(question, index) in course.inquiry_questions" :key="index">{{question}}</li>
                    </ul>
                    <q-card-separator />
                    <p><b>Content</b></p>
                    <ul>
                        <li v-for="contentarea in course.content_areas" :key="contentarea.name">{{contentarea.name}}</li>
                    </ul>
                </q-card-main>
            </q-card>
        </transition-group>
        </div>
        <!-- <q-inner-loading :visible="visible">
            <q-spinner-hourglass size="50px" color="primary" />
        </q-inner-loading> -->
        <!-- <vueCanvasNest :config="{color:'0,0,255', count: 199, opacity: 1, zIndex: -10}" :el="'#list'"></vueCanvasNest> -->
    </q-page>
</template>

<script>
import {areas, courses, stages} from '../../data'
import { required } from 'vuelidate/lib/validators'
// import vueCanvasNest from 'vue-canvas-nest'
import { QSpinnerFacebook } from 'quasar'
// import axios from 'axios'

export default {
  // components: { vueCanvasNest },
  props: ['username'],
  data: () => {
    return {
      selectedarea: '',
      selectedcourse: '',
      selectedstage: '',
      // teachers: [],
      // selectedteacher: '',
      areas,
      courses,
      stages,
      loading: false,
      isdisable: true,
      resultCotent: [],
      Overview: [],
      resultAll: [],
      isshow: false,
      Contentid: undefined,
      Overviewid: undefined
      // visible: false
    }
  },
  validations: {
    selectedarea: { required },
    selectedcourse: { required },
    selectedstage: { required }
  },
  watch: {
    selectedarea () {
      console.log(this.selectedarea)
    },
    areas () {
      console.log(this.areas)
    }
  },
  methods: {
    clearData () {
      this.selectedarea = this.selectedcourse = this.selectedstage = ''
    },
    getReslut () {
      const axios = require('axios')
      this.loading = true
      this.isshow = false
      this.$q.loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'amber',
        spinnerSize: 100,
        message: 'Searching...'
      })
      setTimeout(() => {
        this.loading = false
        this.isshow = true
        this.$q.loading.hide()
        axios({
          url: 'http://192.168.76.37:1323/id?learning_area=' + this.selectedarea + '&subject=' + this.selectedcourse + '&stage=' + this.selectedstage + '&object=Content',
          methods: 'get'
        }).then((res) => {
          this.Contentid = res.data[0]
          console.log(this.Contentid)
          axios({
            url: 'http://192.168.76.37:1323/gql',
            method: 'post',
            data: {
              query: `{
                Content {
                  stage
                  subject
                  learning_area
                  courses {
                    name
                    outcomes {
                      id
                      description
                    }
                    lifeskills_outcomes
                    inquiry_questions
                    focus
                    content_areas {
                      name
                    }
                  }
                }
              }`,
              variables: {
                objid: this.Contentid
              }
            }
          }).then((r) => {
            console.log(r.data.data.Content)
            this.resultCotent = r.data.data.Content
          })
        })
        axios({
          url: 'http://192.168.76.37:1323/id?learning_area=' + this.selectedarea + '&subject=' + this.selectedcourse + '&stage=' + this.selectedstage + '&object=Overview',
          methods: 'get'
        }).then((res) => {
          console.log(res.data[0])
          this.Overviewid = res.data[0]
          axios({
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
                objid: this.Overviewid
              }
            }
          }).then((r) => {
            console.log(r.data.data.Overview)
            this.Overview = r.data.data.Overview
          })
        })
      }, 3000)
      // axios({
      //   url: 'http://192.168.76.37:1323/gql',
      //   methods: 'post',
      //   data: {
      //     query: `{
      //       Content {
      //         stage
      //         subject
      //         learning_area
      //         courses {
      //           name
      //           outcomes {
      //             id
      //             description
      //           }
      //           lifeskills_outcomes
      //           inquiry_questions
      //           focus
      //         }
      //       }
      //     }`,
      //     variables: {
      //       objid: this.Contentid
      //     }
      //   }
      // }).then((result) => {
      //   console.log(result)
      // })
      // axios({
      //   url: 'http://192.168.76.37:1323/gql',
      //   method: 'post',
      //   data: {
      //     query: `{
      //       Overview {
      //         concepts {
      //           name
      //           description
      //         }
      //         inquiry_skills {
      //           name
      //           skills {
      //             skill
      //           }
      //         }
      //         tools {
      //           name
      //           examples
      //         }
      //       }
      //     }`,
      //     variables: {
      //       objid: this.Overviewid
      //     }
      //   }
      // }).then((result) => {
      //   console.log(result)
      // this.loading = true
      // this.isshow = false
      // this.$q.loading.show({
      //   spinner: QSpinnerFacebook,
      //   spinnerColor: 'amber',
      //   spinnerSize: 100,
      //   message: 'Searching...'
      // })
      // this.visible = true
      // setTimeout(() => {
      //   this.loading = false
      //   this.$q.loading.hide()
      //   // this.visible = false
      //   this.isshow = true
      //   axios({
      //     // url: 'http://localhost:1330/graphql',
      //     url: 'http://192.168.76.37:1323/gql',
      //     method: 'post',
      //     // data: {
      //     //   query: `query ContentQuery($state: String!, $learning_area: String!, $subject: String!, $stage: String!) {
      //     //       content(state: $state, learning_area: $learning_area, subject: $subject, stage: $stage){
      //     //           courses {
      //     //               name
      //     //               outcomes {
      //     //                   id
      //     //               }
      //     //               inquiry_questions
      //     //               focus
      //     //               content_areas {
      //     //                   name
      //     //               }
      //     //           }
      //     //       }
      //     //       overview(state: $state, learning_area: $learning_area, subject: $subject, stage: $stage){
      //     //           concepts {
      //     //               name
      //     //           }
      //     //           inquiry_skills {
      //     //               name
      //     //           }
      //     //           tools {
      //     //               name
      //     //           }
      //     //       }
      //     //   }`,
      //     //   variables: {
      //     //     state: 'nsw',
      //     //     learning_area: this.selectedarea,
      //     //     subject: this.selectedcourse,
      //     //     stage: this.selectedstage
      //     //   }
      //     // }
      //     // data: {
      //     //   query: `{
      //     //     Content {
      //     //       stage
      //     //       subject
      //     //       learning_area
      //     //       courses {
      //     //         name
      //     //         outcomes {
      //     //           id
      //     //           description
      //     //         }
      //     //         lifeskills_outcomes
      //     //         inquiry_questions
      //     //         focus
      //     //       }
      //     //     }
      //     //   }`,
      //     //   variables: {
      //     //     objid: this.Contentid
      //     //   }
      //     // }
      //   }).then((result) => {
      //     if (result.data.data.content === null) {
      //       this.$q.notify({
      //         color: 'amber',
      //         textColor: 'white',
      //         icon: 'fas fa-info',
      //         message: 'The results do not exist, please click here to choose others',
      //         position: 'bottom',
      //         actions: [ { label: 'OK', handler: () => this.clearData() } ]
      //       })
      //     } else {
      //       this.resultAll = result.data.data
      //       this.resultCotent = result.data.data.content
      //       this.resultOverview = result.data.data.overview
      //     }
      //   })
      // }, 3000)
    }
  }
}
</script>
