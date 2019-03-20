<template>
    <q-page>
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
                    <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
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
        </div>
        <hr class="line">
        <div class="summary row list">
        <transition-group
          appear
          enter-active-class="animated fadeInRight"
          class="group">
            <q-card inline class="q-ma-sm course-card" color="white" text-color="dark" v-for="course in resultCotent.courses" :key="course.name">
                <q-card-title class="relative-position text-deep-purple-6">
                    <p><b>{{course.name}}</b></p>
                    <span slot="subtitle">10 weeks - 25 hours</span>
                    <q-btn round flat icon="more_vert" slot="right" color="deep-purple-4">
                        <q-popover>
                            <q-list link class="no-border">
                            <q-item v-close-overlay>
                                <q-item-main>
                                    <router-link :to="{name:'courseplaner', params:{course, selectedarea, selectedcourse, selectedstage}}" class="link">Go to Lesson Plan</router-link>
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
                        <li>Concepts - <i v-for="concept in resultOverview.concepts" :key="concept.name">{{concept.name}},</i></li>
                        <li>Skills - <i v-for="skill in resultOverview.inquiry_skills" :key="skill.name">{{skill.name}}, </i></li>
                        <li>Tools - <i v-for="tool in resultOverview.tools" :key="tool.name">{{tool.name}}, </i></li>
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
import {areas, courses, stages} from '../../data'
import { required } from 'vuelidate/lib/validators'
// import axios from 'axios'

export default {
  data: () => {
    return {
      selectedarea: '',
      selectedcourse: '',
      selectedstage: '',
      areas,
      courses,
      stages,
      loading: false,
      isdisable: true,
      resultCotent: [],
      resultOverview: [],
      resultAll: []
    }
  },
  validations: {
    selectedarea: { required },
    selectedcourse: { required },
    selectedstage: { required }
  },
  methods: {
    clearData () {
      this.selectedarea = this.selectedcourse = this.selectedstage = ''
    },
    getReslut () {
      const axios = require('axios')
      this.loading = true
      setTimeout(() => {
        this.loading = false
        axios({
          url: 'http://localhost:1330/graphql',
          method: 'post',
          data: {
            query: `query ContentQuery($state: String!, $learning_area: String!, $subject: String!, $stage: String!) {
                content(state: $state, learning_area: $learning_area, subject: $subject, stage: $stage){
                    courses {
                        name
                        outcomes {
                            id
                        }
                        inquiry_questions
                        focus
                        content_areas {
                            name
                        }
                    }
                }
                overview(state: $state, learning_area: $learning_area, subject: $subject, stage: $stage){
                    concepts {
                        name
                    }
                    inquiry_skills {
                        name
                    }
                    tools {
                        name
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
          if (result.data.data.content === null) {
            this.$q.notify({
              color: 'amber',
              textColor: 'white',
              icon: 'fas fa-info',
              message: 'The results do not exist, please click here to choose others',
              position: 'bottom',
              actions: [ { label: 'OK', handler: () => this.clearData() } ]
            })
          } else {
            this.resultAll = result.data.data
            this.resultCotent = result.data.data.content
            this.resultOverview = result.data.data.overview
          }
        })
      }, 2000)
    }
  }
}
</script>

<style scoped>
.search-btn {
  height: 56px;
}
.select {
  box-shadow: none;
  border-radius: 0px
}
.input {
  border-right: 1px lightgray solid
}
h6 {
  color: grey
}
.line {
  margin: 50px 0 0 0
}
.summary {
  margin: 50px 200px 0px 200px;
}
li {
  margin: 5px 0;
}
.q-card-separator {
  margin-bottom: 10px
}
.q-card-main b {
  color: #4527a0
}
ul{
  list-style:  none;
}
.searchbox p {
  font-size: 18px;
  color: grey
}
.searchbox {
  margin-top: 50px
}
.right-btn{
  position:fixed;
  bottom: -4px;
  right: 10px
}
.link {
  text-decoration: none
}
.no-border{
  color: #4527a0;
}
.course-card {
  border: whitesmoke 1px solid;
  box-shadow: none;
  transition: box-shadow 1s, border 1s;
}
.course-card:hover {
  box-shadow: 0 5px 5px rgba(0,0,0,0.2), 0 5px 5px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);
  border: whitesmoke 1px solid
}
</style>
