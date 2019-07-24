<template>
<q-page>
  <div class="search">
  <p><b>Choose Learning area, Subject, Stage and Year to get the courses information</b></p>
  </div>
    <div class="searchbox">
        <q-field
            icon="fas fa-book-open"
            label="Select a learning area"
            :label-width="4"
        >
            <q-select
            chips
            color="deep-purple"
            v-model="selectedarea"
            :options="areas"
            />
        </q-field>
        <q-field
            icon="fas fa-balance-scale"
            label="Pick a subject"
            :label-width="4"
        >
            <q-select
            chips
            color="deep-purple"
            v-model="selectedcourse"
            :options="courses"
            />
        </q-field>
        <q-field
            icon="fas fa-school"
            label="Choses a stage"
            :label-width="4"
        >
            <q-select
            chips
            color="deep-purple"
            v-model="selectedstage"
            :options="stages"
            />
        </q-field>
        <!-- <q-field
            icon="fas fa-chalkboard"
            label="Choses a year"
            :label-width="4"
        >
            <q-select
            chips
            color="deep-purple"
            v-model="selectedyear"
            :options="yearsList"
            />
        </q-field> -->
    </div>
    <q-btn @click="getReslut">Search</q-btn>
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
      resultCotent: [],
      resultOverview: [],
      resultAll: []
      // info: null
    }
  },
  // watch: {
  // selectedarea (newArea) {
  //   axios
  //     .get()
  // },
  // selectedstage (newValue, oldValue) {
  //   axios
  //     .get(`./../../demoData/stage${newValue}/content.json`)
  //     // .get(`./../../demoData/stage${newValue}/overview.json`)
  //     .then(response => {
  //       this.$store.commit('stage/setStageData', response)
  //       this.resultData = response.data.courses
  //     })
  // },
  // selectedyear () {
  //   let stageData = this.$store.getters['stage/getStageData']
  //   if (stageData.data.yrLvls.includes(this.selectedyear)) {
  //     this.resultData = stageData.data.courses
  //   }
  // }
  // },
  // computed: {
  // yearsList () {
  //   if (this.selectedstage) {
  //     let stageData = this.$store.getters['stage/getStageData']
  //     let a = years.filter(el => el.value === stageData.data.yrLvls[0] || el.value === stageData.data.yrLvls[1])
  //     return a
  //   }
  //   return years
  // }
  // },
  methods: {
    getReslut () {
      const axios = require('axios')
      axios({
        url: 'http://localhost:1330/graphql',
        method: 'psot',
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
            learning_area: this.seletedarea,
            subject: this.selectedcourse,
            stage: this.selectedstage
          }
        }
      }).then((result) => {
        this.resultAll = result.data.data
        this.resultCotent = result.data.data.content
        this.resultOverview = result.data.data.overview
        console.log(result.data.data)
        console.log(result.data.data.content)
      })
    }
  }
  // methods() {
  //   axios
  //     .get('.json')
  //     .then(response => (this.info = response))
  // }
  // methods: {
  //   searchResult () {
  //     if (this.selectedstage) {
  //       let data = this.$store.getters['stage/getStageData']
  //       return data
  //     }
  //   }
  // }
  // created () {
  // axios
  //   .get('./../../demoData/stage5.json')
  //   .then(response => {
  //     this.$store.commit('stage/setStageData', response)
  //   })
  // }
  // mounted (selectedstage) {
  //   axios
  //     .get(`./../../demoData/stage${selectedstage}/overview.json`)
  //     .then(response => (this.info = response))
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
</style>
