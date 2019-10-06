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
                        <q-select class="select" stack-label="Select the learning area" color="white" inverted-light separator v-model="selectedarea" :options="areas" @blur="$v.selectedarea.$touch" />
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 input">
                        <q-select class="select" stack-label="Pick the subject" inverted-light color="white" v-model="selectedcourse" separator :options="courses" @blur="$v.selectedcourse.$touch" />
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 input">
                        <q-select class="select" stack-label="Choose the stage" inverted-light color="white" separator v-model="selectedstage" :options="stages" @blur="$v.selectedstage.$touch" />
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 input-btn">
                        <div>
                            <q-btn class="full-width search-btn select" color="deep-purple-9" :loading="loading" @click="getResult" :disable="!selectedarea || !selectedcourse || !selectedstage">
                                Search
                                <span slot="loading">
                                    <q-spinner class="on-left" />
                                    Searching...
                                </span>
                            </q-btn>
                        </div>
                    </div>
                </div>
            </div>
            <hr class="line">
        </div>
        <div class="summary row list">
            <transition-group appear enter-active-class="animated fadeInRight" class="group">
                <q-card inline class="q-ma-sm course-card" color="white" text-color="dark" v-for="course in resultCotent.courses" :key="course.name" v-show="isshow">
                    <q-card-title class="relative-position text-deep-purple-6">
                        <p><b>{{course.name}}</b></p>
                        <span slot="subtitle">10 weeks - 25 hours</span>
                        <q-btn round flat icon="more_vert" slot="right" color="deep-purple-4">
                            <q-popover>
                                <q-list link class="no-border">
                                    <q-item v-close-overlay>
                                        <q-item-main>
                                            <router-link :to="{name:'courseplaner', params:{course, Overview, selectedarea, selectedcourse, selectedstage, username: username}}" class="link">Go to Lesson Planner</router-link>
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
    </q-page>
</template>
<script>
import { areas, courses, stages, n3baseUrl, authHeader, baseUrl, auth } from '../../data'
import { required } from 'vuelidate/lib/validators'
import { QSpinnerFacebook } from 'quasar'
import axios from 'axios'

export default {
    props: ['username'],
    data: () => {
        return {
            selectedarea: '',
            selectedcourse: '',
            selectedstage: '',
            areas,
            courses,
            stages,
            baseUrl,
            auth,
            loading: false,
            isdisable: true,
            resultContent: [],
            Overview: [],
            resultAll: [],
            isshow: false,
            Contentid: undefined,
            Overviewid: undefined
        }
    },
    validations: {
        selectedarea: { required },
        selectedcourse: { required },
        selectedstage: { required }
    },
    watch: {
        selectedarea() {
            console.log(this.selectedarea)
        },
        areas() {
            console.log(this.areas)
        }
    },
    methods: {
        clearData() {
            this.selectedarea = this.selectedcourse = this.selectedstage = ''
        },
        getResult() {
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
                // fetch syllabus
                axios({
                    url: n3baseUrl + '/graphql',
                    method: 'post',
                    headers: authHeader,
                    data: {
                        query: syllabusQuery,
                        variables: {
                            qspec: {
                                queryType: "findByType",
                                queryValue: "Syllabus",
                                filters: [{
                                        eq: ["Syllabus", "subject", 
                                        this.selectedcourse.toLowerCase()]
                                      },
                                    { eq: ["Syllabus", "stage", this.selectedstage] }
                                ]
                            }
                        }
                    }
                }).then((r) => {
                    // console.log(r);
                    // assigne the full syallbus to each for now
                    this.resultContent = r.data.data.q.Syllabus[0] //Content
                    this.Overview = r.data.data.q.Syllabus[0]

                })

            }, 500)
        }
    }
}

let syllabusQuery = `
query syllabusQuery($qspec: QueryInput!) {
  q(qspec: $qspec) {
    Syllabus {
      learning_area
      tools {
        code
        examples
        name
      }
      subject
      overview
      courses {
        content_areas {
          name
          investigations {
            description
            ac
            examples
          }
          instructions
        }
        outcomes {
          description
          id
        }
        focus
        inquiry_questions
        name
        lifeskills_outcomes
      }
      stage
      yrLvls
      concepts {
        description
        name
      }
      inquiry_skills {
        name
        skills {
          ac
          skill
        }
      }
    }
  }
}
`
</script>