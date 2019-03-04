<template>
<q-page>
  <div class="search">
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <h5 class="q-ma-lg" style="margin-top:150px; color:gray"><b>Choose Learning area, Subject, Stage and Year to get the courses information</b></h5>
      </div>
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12"></div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" style="text-align:center">
          <img src="../../assets/searchlogo.png" style="width:350px; height:350px">
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
    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 input">
          <q-select
            class="select"
            stack-label="Choses the stage"
            inverted-light
            color="white"
            separator
            v-model="selectedstage"
            :options="stages"
            @blur="$v.selectedstage.$touch"
          />
    </div>
    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12 input">
            <q-select
            class="select"
            stack-label="Choses the year"
            inverted-light
            color="white"
            separator
            v-model="selectedyear"
            :options="yearsList"
            @blur="$v.selectedyear.$touch"
            />
    </div>
    <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
      <div>
        <q-btn class="full-width search-btn select" color="deep-purple-9" :loading="loading" @click="getReslut" :disable="!selectedarea || !selectedcourse|| !selectedyear || !selectedstage">
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
    <hr style="margin-top: 50px">
    <div class="row list">
      <!-- <q-input v-model="selectedstage" /> -->
      <!-- {{resultData}} -->
        <transition-group
          appear
          enter-active-class="animated fadeInUp"
          class="group">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 one-card" v-for="course in resultCotent.courses" :key="course.name">
        <q-card inline square color="white" text-color="black" class="q-ma-sm course-card">
          <q-card-title class="text-deep-purple-4">
            {{course.name}}
            <span slot="subtitle">Stage: {{ selectedstage }} - Year: {{ selectedyear }}</span>
            <q-btn round flat icon="more_vert" slot="right" color='deep-purple-4'>
              <q-popover>
              <q-list link class="no-border">
                  <q-item v-close-overlay>
                    <q-item-main label="Share"/>
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
              <router-link style="text-decoration: none; color:#9575cd" :to="{name: 'subject', params: {course, selectedarea, selectedcourse, selectedstage}}">Get more information</router-link>
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
import {areas, courses, stages, years} from '../../data'
// import axios from 'axios'

export default {
  data: () => {
    return {
      selectedarea: '',
      selectedcourse: '',
      selectedstage: '',
      selectedyear: '',
      areas,
      courses,
      stages,
      years,
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
    selectedstage: { required },
    selectedyear: { required }
  },
  methods: {
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
          this.resultAll = result.data.data
          this.resultCotent = result.data.data.content
          this.resultOverview = result.data.data.overview
          // console.log(result.data.data)
          // console.log(result.data.data.content)
        })
      }, 2000)
    }
    // simulateProgress (number) {
    //   // we set loading state
    //   this[`loading${number}`] = true
    //   // simulate a delay
    //   setTimeout(() => {
    //     // we're done, we reset loading state
    //     this[`loading${number}`] = false
    //   }, 3000)
    // }
  },
  computed: {
    yearsList () {
      if (this.selectedstage === '1') {
        let a = [{
          label: 'Year 1',
          value: 1
        },
        {
          label: 'Year 2',
          value: 2
        }]
        return a
      } if (this.selectedstage === '2') {
        let a = [{
          label: 'Year 3',
          value: 3
        },
        {
          label: 'Year 4',
          value: 4
        }]
        return a
      } if (this.selectedstage === '3') {
        let a = [{
          label: 'Year 5',
          value: 5
        },
        {
          label: 'Year 6',
          value: 6
        }]
        return a
      } if (this.selectedstage === '4') {
        let a = [{
          label: 'Year 7',
          value: 7
        },
        {
          label: 'Year 8',
          value: 8
        }]
        return a
      } if (this.selectedstage === '5') {
        let a = [{
          label: 'Year 9',
          value: 9
        },
        {
          label: 'Year 10',
          value: 10
        }]
        return a
      } if (this.selectedstage === '6') {
        let a = [{
          label: 'Year 11',
          value: 11
        },
        {
          label: 'Year 12',
          value: 12
        }]
        return a
      }
      return years
    }
  }
  // created () {
  //   axios
  //     .get('./../../demoData/stage5.json')
  //     .then(response => {
  //       this.$store.commit('stage/setStageData', response)
  //     })
  // }
}
</script>
<style scoped>
.search {
  margin: 150px 200px 0px 200px
}
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
.searchbox {
  margin-top: 50px
}
.list {
  margin: 50px 200px 0 200px
}
.q-card {
  height: auto;
}
.q-card-main {
  height: auto;
  text-align: justify;
}
.search p {
    font-size: 18px;
    color: grey
}
.search-btn{
  text-align: center;
  justify-content:center;
  align-items:center
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
