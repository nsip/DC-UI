<template>
<q-page>
  <div class="search">
  <p><b>Choose Learning area, Subject, Stage and Year to get the courses information</b></p>
  </div>
  <div class="row searchbox">
    <div class="col-6">
      <div class="q-ma-lg">
        <q-field
            icon="fas fa-book-open"
            label="Select a learning area"
            :label-width="4"
            :error="$v.selectedarea.$error"
            error-label="Please select the learning area"
        >
            <q-select
            chips
            color="deep-purple"
            v-model="selectedarea"
            :options="areas"
            @blur="$v.selectedarea.$touch"
            />
        </q-field>
        <q-field
            icon="fas fa-balance-scale"
            label="Pick a subject"
            :label-width="4"
            :error="$v.selectedcourse.$error"
            error-label="Please select the subject"
        >
            <q-select
            chips
            color="deep-purple"
            v-model="selectedcourse"
            :options="courses"
            @blur="$v.selectedcourse.$touch"
            />
        </q-field>
        </div>
        </div>
        <div class="col-6">
        <div class="q-ma-lg">
        <q-field
            icon="fas fa-school"
            label="Choses a stage"
            :label-width="4"
            :error="$v.selectedstage.$error"
            error-label="Please select the stage"
        >
            <q-select
            chips
            color="deep-purple"
            v-model="selectedstage"
            :options="stages"
            @blur="$v.selectedstage.$touch"
            />
        </q-field>
        <q-field
            icon="fas fa-chalkboard"
            label="Choses a year"
            :label-width="4"
            :error="$v.selectedyear.$error"
            error-label="Please select the year"
        >
            <q-select
            chips
            color="deep-purple"
            v-model="selectedyear"
            :options="yearsList"
            @blur="$v.selectedyear.$touch"
            />
        </q-field>
        </div>
    </div>
    </div>
    <div class="search-btn">
      <div class="q-ma-lg">
        <q-btn color="deep-purple-9" size="md" style="width: 200px" @click="getReslut" :disable="!selectedarea || !selectedcourse|| !selectedyear || !selectedstage">Search</q-btn>
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
        <q-card inline square class="q-ma-sm">
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
    }
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
.searchbox {
    margin: 50px 300px 0 300px
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
.search{
  margin: 100px 0 0 0;
  text-align: center
}
.search-btn{
  margin: 10px 300px 0 300px;
  text-align: right;
}
</style>
