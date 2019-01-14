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
        <q-field
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
        </q-field>
    </div>
    <div class="row list">
      <!-- <q-input v-model="selectedstage" /> -->
      <!-- {{resultData}} -->
        <transition-group
          appear
          enter-active-class="animated fadeInUp"
          class="group">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 one-card" v-for="item in resultData" :key="item">
        <q-card inline square class="q-ma-sm">
          <q-card-title class="text-deep-purple-4">
            {{item.name}}
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
            {{item.focus}}
          </q-card-main>
          <q-card-separator />
          <q-card-actions>
            <q-btn flat color='deep-purple-4'>
              <router-link style="text-decoration: none; color:#9575cd" :to="{name: 'subject', params: {item, selectedstage}}">Get more information</router-link>
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
import axios from 'axios'

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
      resultData: null,
      info: null
    }
  },
  watch: {
    // selectedarea (newArea) {
    //   axios
    //     .get()
    // },
    selectedstage (newValue, oldValue) {
      axios
        .get(`./../../demoData/stage${newValue}/content.json`)
        // .get(`./../../demoData/stage${newValue}/overview.json`)
        .then(response => {
          this.$store.commit('stage/setStageData', response)
          this.resultData = response.data.courses
        })
    },
    selectedyear () {
      let stageData = this.$store.getters['stage/getStageData']
      if (stageData.data.yrLvls.includes(this.selectedyear)) {
        this.resultData = stageData.data.courses
      }
    }
  },
  computed: {
    // searchResult () {
    //   if (this.selectedstage && this.selectedyear) {
    //     let stageData = this.$store.getters['stage/getStageData']
    //     if (stageData.data.yrLvls.includes(this.selectedyear)) return stageData.data.courses
    //   }
    // },
    yearsList () {
      if (this.selectedstage) {
        let stageData = this.$store.getters['stage/getStageData']
        let a = years.filter(el => el.value === stageData.data.yrLvls[0] || el.value === stageData.data.yrLvls[1])
        return a
      }
      return years
    }
  },
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
  created () {
    axios
      .get('./../../demoData/stage5.json')
      .then(response => {
        this.$store.commit('stage/setStageData', response)
      })
  }
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
  margin-top: 50px;
  text-align: center
}
</style>
