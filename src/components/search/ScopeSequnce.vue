<template>
    <q-page>
        <div id="search">
            <div class="scopesequnce">
                <div class="row" style="height:350px">
                    <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                        <h5 class="q-ma-lg" style="margin-top:150px; color:gray"><b>Choose Learning area, Subject, Stage and Year to see the course information</b></h5>
                    </div>
                    <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12" style="text-align:right">
                        <img src="../../assets/searchlogo.png" style="max-height:350px">
                    </div>
                </div>
                <div class="row searchbox">
                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 input">
                        <q-select class="select" stack-label="Select the learning area" color="white" inverted-light separator v-model="selectedarea" :options="areas" @blur="$v.selectedarea.$touch" />
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12 input">
                        <q-select class="select" stack-label="Pick the subject" inverted-light color="white" v-model="selectedcourse" separator :options="courses" @blur="$v.selectedcourse.$touch" />
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 input">
                        <q-select class="select" stack-label="Choose the stage" inverted-light color="white" separator v-model="selectedstage" :options="stages" @blur="$v.selectedstage.$touch" />
                    </div>
<!--                     <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 input">
                        <q-select class="select" stack-label="Choose the year" inverted-light color="white" separator v-model="selectedyear" :options="yearsList" @blur="$v.selectedyear.$touch" />
                    </div>
 -->                    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 input-btn">
                        <div>
                            <q-btn class="full-width search-btn select" color="deep-purple-9" :loading="loading" @click="getResult" :disable="!selectedarea || !selectedcourse || !selectedstage">
                            <!-- !selectedcourse|| !selectedyear || !selectedstage">   -->
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
        <div class="row list">
            <transition-group appear enter-active-class="animated fadeInUp" class="group">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 one-card" v-for="course in resultContent.courses" :key="course.name" v-show="isshow">
                    <q-card inline square color="white" text-color="dark" class="q-ma-sm course-card">
                        <q-card-title class="text-deep-purple-4">
                            {{course.name}}
                            <span slot="subtitle">Stage: {{ selectedstage }} - Year: {{ selectedyear }}</span>
                            <q-btn round flat icon="more_vert" slot="right" color='deep-purple-4'>
                                <q-popover>
                                    <q-list link class="no-border">
                                        <q-item v-close-overlay>
                                            <q-item-main label="Share" />
                                        </q-item>
                                    </q-list>
                                </q-popover>
                            </q-btn>
                        </q-card-title>
                        <q-card-separator />
                        <q-card-main>
                            {{course.focus}}
                        </q-card-main>
                        <q-card-separator />
                        <q-card-actions>
                            <q-btn flat color='deep-purple-4'>
                                <router-link style="text-decoration: none; color:#9575cd" :to="{name: 'subject', params: {course, selectedarea, selectedcourse, selectedstage, resultOverview, username: username}}">Get more 
                                <!-- selectedstage, Overviewuid, username: username}}">Get more  -->
                                information</router-link>
                            </q-btn>
                        </q-card-actions>
                    </q-card>
                </div>
            </transition-group>
        </div>
    </q-page>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { areas, courses, stages, years, baseUrl, n3baseUrl, authHeader, auth } from '../../data'
import { QSpinnerFacebook } from 'quasar'
import axios from 'axios'

export default {
    // components: { vueCanvasNest },
    props: ['username'],
    data: () => {
        return {
            selectedarea: '',
            selectedcourse: '',
            selectedstage: '',
            selectedyear: '',
            Contentuid: '',
            Overviewuid: '',
            areas,
            courses,
            stages,
            years,
            loading: false,
            isdisable: true,
            resultContent: [],
            resultOverview: [],
            resultAll: [],
            isshow: false,
            baseUrl,
            auth
        }
    },
    validations: {
        selectedarea: { required },
        selectedcourse: { required },
        selectedstage: { required }
        // selectedyear: { required }
    },
    methods: {
        clearData() {
            this.selectedarea = this.selectedcourse = this.selectedstage = this.selectedyear = ''
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
                                            this.selectedcourse.toLowerCase()
                                        ]
                                    },
                                    { eq: ["Syllabus", "stage", this.selectedstage] }
                                ]
                            }
                        }
                    }
                }).then((r) => {
                    if (r.data.data.q.Syllabus[0] === null) {
                        this.$q.notify({
                            color: 'amber',
                            textColor: 'white',
                            icon: 'fas fa-info',
                            message: 'The results do not exist, please click here to choose others',
                            position: 'bottom',
                            actions: [{ label: 'OK', handler: () => this.clearData() }]
                        })
                    } else {
                        this.resultContent = r.data.data.q.Syllabus[0] 
                        this.resultOverview = r.data.data.q.Syllabus[0]
                    }
                })
            }, 500)
        }
    },
    computed: {
        yearsList() {
            if (this.selectedstage === '1') {
                let a = [{
                        label: 'Year 1',
                        value: 1
                    },
                    {
                        label: 'Year 2',
                        value: 2
                    }
                ]
                return a
            }
            if (this.selectedstage === '2') {
                let a = [{
                        label: 'Year 3',
                        value: 3
                    },
                    {
                        label: 'Year 4',
                        value: 4
                    }
                ]
                return a
            }
            if (this.selectedstage === '3') {
                let a = [{
                        label: 'Year 5',
                        value: 5
                    },
                    {
                        label: 'Year 6',
                        value: 6
                    }
                ]
                return a
            }
            if (this.selectedstage === '4') {
                let a = [{
                        label: 'Year 7',
                        value: 7
                    },
                    {
                        label: 'Year 8',
                        value: 8
                    }
                ]
                return a
            }
            if (this.selectedstage === '5') {
                let a = [{
                        label: 'Year 9',
                        value: 9
                    },
                    {
                        label: 'Year 10',
                        value: 10
                    }
                ]
                return a
            }
            if (this.selectedstage === '6') {
                let a = [{
                        label: 'Year 11',
                        value: 11
                    },
                    {
                        label: 'Year 12',
                        value: 12
                    }
                ]
                return a
            }
            return years
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