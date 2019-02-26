<template>
    <div>
        <div class="summary">
            <!--
            <div class="right-btn">
            <q-btn push icon="lightbulb_outline" align="between" label="lesson plan" color="deep-purple-9" :to="{name:'couserplaner', params:{data,selectedstage}}">
                </q-btn>
            </div>
            -->
            <div class="searchbox">
                <p><b>Choose Learning area, Subject and Stage to get the courses summary</b></p>
                <div class="row">
                    <div class="col-3">
                        <q-select
                            class="q-ma-sm"
                            float-label="Learning area"
                            color="deep-purple"
                            v-model="selectedarea"
                            :options="areas"
                        />
                    </div>
                    <div class="col-1 arrow">
                        <i class="fas fa-long-arrow-alt-right q-ma-lg"></i>
                    </div>
                    <div class="col-4">
                        <q-select
                            float-label="Subject"
                            class="q-ma-sm"
                            color="deep-purple"
                            v-model="selectedcourse"
                            :options="courses"/>
                    </div>
                    <div class="col-1 arrow" style="text-align:center">
                        <i class="fas fa-long-arrow-alt-right q-ma-lg"></i>
                    </div>
                    <div class="col-3">
                        <q-select
                            float-label="Stage"
                            class="q-ma-sm"
                            color="deep-purple"
                            v-model="selectedstage"
                            :options="stages"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-10"></div>
                    <div class="col-2" style="text-align:right">
                        <q-btn
                            class="q-ma-lg full-width"
                            label="Search"
                            color="deep-purple-9"
                            @click="getReslut" />
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="summary">
        <transition-group
          appear
          enter-active-class="animated fadeInRight"
          class="group">
            <q-card inline class="q-ma-sm" v-for="course in resultCotent.courses" :key="course.name">
                <q-card-title class="relative-position">
                    <p><b>{{course.name}}</b></p>
                    <span slot="subtitle">10 weeks - 25 hours</span>
                    <q-btn round flat icon="more_vert" slot="right">
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
    </div>
</template>

<script>
import {areas, courses, stages} from '../../data'
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
      resultCotent: [],
      resultOverview: [],
      resultAll: []
    }
  },
  // watch: {
  // selectedstage (newValue, oldValue) {
  //   this.resultData = null
  //   axios
  //     .get(`./../../demoData/stage${newValue}/content.json`)
  //     .then(response => {
  //       this.$store.commit('stage/setStageData', response)
  //       this.resultData = response.data.courses
  //     })
  //     //   console.log(this.selectedarea)
  //     //   console.log(this.selectedcourse)
  //     //   console.log(this.selectedstage)
  // }
  // },
  // created () {
  // axios
  //   .get('./../../demoData/stage5.json')
  //   .then(response => {
  //     this.$store.commit('stage/setStageData', response)
  //   })
  // }
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
        this.resultAll = result.data.data
        this.resultCotent = result.data.data.content
        this.resultOverview = result.data.data.overview
        console.log(result.data.data)
        console.log(result.data.data.content)
      })
    }
  }
}
</script>

<style scoped>
h6 {
    color: grey
}
.summary {
    margin: 0px 200px;
    text-align: justify
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
    margin: 100px 0 0 0
}
hr {
    margin: 24px 0 50px 0
}
.right-btn{
    position:fixed;
    bottom: -4px;
    right: 10px
}
.link{
    text-decoration:none;
}
.no-border{
  color: #4527a0;
}
.arrow {
    text-align:center;
    color:gray;
    font-size:30px
}
</style>
