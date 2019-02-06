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
                    <div class="col-4">
                        <q-select
                            class="q-ma-sm"
                            float-label="Learning area"
                            color="deep-purple"
                            v-model="selectedarea"
                            :options="areas"
                        />
                    </div>
                    <div class="col-4">
                        <q-select
                            float-label="Subject"
                            class="q-ma-sm"
                            color="deep-purple"
                            v-model="selectedcourse"
                            :options="courses"/>
                    </div>
                    <div class="col-4">
                        <q-select
                            float-label="Stage"
                            class="q-ma-sm"
                            color="deep-purple"
                            v-model="selectedstage"
                            :options="stages"/>
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
            <q-card inline class="q-ma-sm" v-for="(item, index) in resultData" :key="index">
                <q-card-title class="relative-position">
                    <p><b>{{item.name}}</b></p>
                    <span slot="subtitle">10 weeks - 25 hours</span>
                    <q-btn round flat icon="more_vert" slot="right">
                        <q-popover>
                            <q-list link class="no-border">
                            <q-item v-close-overlay>
                                <q-item-main><router-link :to="{name:'courseplaner', params:{item, selectedarea, selectedcourse, selectedstage}}" class="link">Go to Lesson Plan</router-link></q-item-main>
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
                    <p>{{item.focus}}</p>
                    <q-card-separator />
                    <p><b>Outcomes</b></p>
                        <p><i v-for="id in item.outcomes" :key="id" >{{id.id}}, </i></p>
                    <q-card-separator />
                    <p><b>Geographical concepts, skills and tools</b></p>
                    <ul>
                        <li>Concepts - <i>place, space, environment, interconnection, scale, sustainability, change</i></li>
                        <li>Skills - <i>acquiring, processing and communicating geographical information</i></li>
                        <li>Tools - <i>maps, graphs and statistics, spatial technologies, visual representations, fieldwork investigation of a farm</i></li>
                    </ul>
                    <q-card-separator />
                    <p><b>Key inquiry questions</b></p>
                    <ul v-for="list in item.inquiry_questions" :key="list">
                        <li>{{list}}</li>
                    </ul>
                    <q-card-separator />
                    <p><b>Content</b></p>
                    <ul v-for="name in item.content_areas" :key="name">
                        <li>{{name.name}}</li>
                    </ul>
                </q-card-main>
            </q-card>
        </transition-group>
        </div>
    </div>
</template>

<script>
import {areas, courses, stages} from '../../data'
import axios from 'axios'

export default {
  data: () => {
    return {
      selectedarea: '',
      selectedcourse: '',
      selectedstage: '',
      areas,
      courses,
      stages,
      resultData: null
    }
  },
  watch: {
    selectedstage (newValue, oldValue) {
      this.resultData = null
      axios
        .get(`./../../demoData/stage${newValue}/content.json`)
        .then(response => {
          this.$store.commit('stage/setStageData', response)
          this.resultData = response.data.courses
        })
    //   console.log(this.selectedarea)
    //   console.log(this.selectedcourse)
    //   console.log(this.selectedstage)
    }
  },
  created () {
    axios
      .get('./../../demoData/stage5.json')
      .then(response => {
        this.$store.commit('stage/setStageData', response)
      })
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
    margin: 50px 0
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
</style>
