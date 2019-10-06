<template>
  <div>
        <div style="margin:100px 0 0 100px; color:gray">
            <h4>
                <img src="../../assets/plan-2.png" class="img-item">
                <b>{{lesson.thecourse}} Lesson Planner
            </b></h4>
            <p><i>Design the lesson in the editor, add the lesson by clicking the add button, and delete the lesson by clicking the delete button</i></p>
        </div>
        <hr class="line">
        <div class="row courseplan">
            <transition name="slide-fade">
            <div v-if="!isShow" class="col-3" style="padding-right:10px">
                <app-couser-reminder
                  :coursename="lesson.thecourse"
                  :selectedarea="lesson.thearea"
                  :selectedcourse="lesson.thesubject"
                  :selectedstage="lesson.thestage" />
            </div>
            </transition>
            <div :class="isShow?'col-9':'col-6'">
              <div
                  class="editor" v-for="(l, index) in lessons" :key="index"
                  :style="l.isDisplay ? 'display:block' : 'display:none'">
                <q-editor
                  toolbar-text-color="white"
                  toolbar-outline
                  toolbar-bg="deep-purple-4"
                  min-height="40rem"
                  v-model="l.editcontent"
                  :toolbar="[
                    ['bold', 'italic', 'underline'],
                    ['token', 'hr', 'link', 'custom_btn'],
                    [
                      {
                        label: $q.i18n.editor.formatting,
                        icon: $q.icon.editor.formatting,
                        list: 'no-icons',
                        options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
                      },
                      {
                        label: $q.i18n.editor.defaultFont,
                        icon: $q.icon.editor.font,
                        fixedIcon: true,
                        list: 'no-icons',
                        options: ['default_font', 'arial', 'arial_black', 'comic_sans', 'courier_new', 'impact', 'lucida_grande', 'times_new_roman', 'verdana']
                      },
                      'removeFormat'
                    ],
                    [
                      {
                        label: $q.i18n.editor.align,
                        icon: $q.icon.editor.align,
                        fixedLabel: true,
                        options: ['left', 'center', 'right', 'justify']
                      }
                    ],
                    ['fullscreen'],
                    ['undo', 'redo']
                  ]"
                  :fonts="{
                    arial: 'Arial',
                    arial_black: 'Arial Black',
                    comic_sans: 'Comic Sans MS',
                    courier_new: 'Courier New',
                    impact: 'Impact',
                    lucida_grande: 'Lucida Grande',
                    times_new_roman: 'Times New Roman',
                    verdana: 'Verdana'
                  }"
                ></q-editor>
                <q-list class="bottom-tips">
                  <q-item>
                    <q-item-side>
                      <p>Title: {{ l.summary }}</p>
                    </q-item-side>
                    <q-item-main style="text-align:center" text-color="dark">
                      <p style="font-size:14px;"><i class="far fa-smile" style="margin-right:10px;"/>Please remeber click save button, when you make any changes.</p>
                    </q-item-main>
                    <q-item-side right>
                      <p>Lesson No.{{ index + 1 }}</p>
                    </q-item-side>
                  </q-item>
                </q-list>
                <div style="float:right; margin:30px 0">
                <q-btn label="Save this lesson" outline rounded color="deep-purple-9" icon="save" @click="save(index)" />
                </div>
              </div>
            </div>
            <div class="col-3" style="padding-left:10px;">
                <q-chips-input
                  inverted
                  color="deep-purple-4"
                  chips-color="dark"
                  chips-bg-color="white"
                  v-model="keywords"
                  float-label="Enter the key words"
                  class="search-input"
                  @keyup="search">
                </q-chips-input>
                <div class="search">
                <q-list class="searchResult">
                  <q-item v-for="result in searchResult" :key="result.URL">
                      <q-item-side>
                        <q-checkbox  color="deep-purple-6" v-model="seletedurl" :val="result" />
                      </q-item-side>
                      <q-item-main><a :href="result.URL"  target="_blank" class="urllink">{{result.Name}}</a>
                        <q-tooltip class="tip" anchor="bottom middle" self="top middle" :offset="[10, 10]">
                          {{result.Snippet}}
                        </q-tooltip>
                      </q-item-main>
                  </q-item>
                </q-list>
                <q-list class="bottom-tips">
                  <q-item>
                    <q-item-side style="text-align:center">
                      <i class="far fa-smile" />
                    </q-item-side>
                    <q-item-main>
                      <p class="tips">Please remeber click save button when you make any change in each lesson.</p>
                    </q-item-main>
                  </q-item>
                </q-list>
              </div>
            </div>
            <q-card class="col-9 l list-of-lesson">
                <q-card-title class="relative-position q-ma-sm">
                    <b style="color:gray">List of {{lesson.thecourse}} Lesson</b>
                    <q-btn
                        class="absolute"
                        icon="fas fa-plus"
                        outline
                        rounded
                        flat
                        color="deep-purple-9"
                        style="right: 8px;"
                        @click="add"/>
                    <q-card-separator style="margin-top: 15px; margin-bottom: 15px"/>
                    <span slot="subtitle">
                      <img src="../../assets/list.png" class="lesson-sequence-logo">
                      <q-field
                        :label-width="2"
                        label="Lesson Sequence"
                      >
                        <q-input
                          v-model="lesson.thedescription"
                          color="deep-purple-9" />
                      </q-field>
                    </span>
                </q-card-title>
                <q-item-separator />
                <q-card-main class="lesson-list">
                        <draggable class="row" v-model="lessons" :options="{handle:'.my-handle'}" style="text-align:center; position: relative;">
                            <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12" v-for="(l, index) in lessons" :key="index">
                                <q-list class="q-ma-xs addLesson">
                                    <q-item>
                                    <q-item-side left>
                                        <q-icon class="my-handle q-ma-sm" name="fas fa-bars" aria-hidden="true" size="18px" color="blue-grey-3"></q-icon>
                                    </q-item-side>
                                    <q-item-main></q-item-main>
                                        <q-item-side
                                            right>
                                                <q-btn
                                                    class="q-ma-xs"
                                                    icon="fas fa-trash-alt"
                                                    size="8px"
                                                    outline
                                                    round
                                                    @click='removeLesson(index)'
                                                    />
                                        </q-item-side>
                                    </q-item>
                                    <q-item>
                                        <q-btn
                                            outline
                                            style="color: #4527a0; width:100%"
                                            @click='selectedLesson(index)'>Lesson {{ index + 1 }}</q-btn>
                                    </q-item>
                                    <q-item>
                                        <div>
                                            <q-input
                                                class="q-ma-sm"
                                                color="deep-purple-5"
                                                placeholder="Lesson title"
                                                v-model="l.summary"/>
                                        </div>
                                    </q-item>
                                </q-list>
                            </div>
                            </draggable>
                </q-card-main>
                <q-item-separator />
                <q-card-title class="relative-position q-ma-sm">
                  <b style="color:gray">Learning Arae: {{lesson.thearea}} | Subject: {{lesson.thesubject}} | Stage: {{lesson.thestage}}</b>
                  <div slot="right" class="row items-center">
                    <q-btn
                        flat
                        outline
                        color="deep-purple-5"
                        label="Submit All Lessons"
                        @click="submit">
                    </q-btn>
                  </div>
                </q-card-title>
            </q-card>
            <q-card class="col-3 l list-of-link">
                <q-card-title class="relative-position q-ma-sm">
                  <!-- <i style="color:#ffc107; margin-right:10px" class="fas fa-link" /> -->
                  <img src="../../assets/link-resource.png" class="img-item link-logo">
                  <b style="color:gray">Related Resource Link</b>
                  <q-card-separator style="margin-top: 15px; margin-bottom: 15px" />
                </q-card-title>
                <q-card-main class="link-list q-ma-xs" style="color:gray">
                    <q-item v-for="(link,index) in seletedurl" :key="index">
                      <q-item-side>
                        <q-btn
                          flat
                          round
                          icon="fas fa-minus-circle"
                          outline
                          color="deep-purple-5"
                          @click="deletelink(index)"/>
                      </q-item-side>
                      <a :href="link.URL" target="_blank" class="urllink">{{link.Name}}</a>
                    </q-item>
                </q-card-main>
            </q-card >
        </div>
        <div class="left-btn">
            <q-btn push icon="fas fa-info-circle"  align="between" label="Get lesson inforamtion" color="deep-purple-9" @click="isShow=!isShow"></q-btn>
        </div>
  </div>
</template>

<script>
import CouserRemainder from './CourseRemainder.vue'
// // import CouserEditor from './CourseEditor.vue'
// // import CouserSearch from './CourseSearch.vue'
import draggable from 'vuedraggable'
import { QSpinnerPie } from 'quasar'
export default {
  // props: {
  //   lesson: {
  //     type: Object,
  //     default: () => {}
  //   }
  // },
  props: [ 'lesson' ],
  components: {
    appCouserReminder: CouserRemainder,
    // appCouserEditor: CouserEditor,
    // appCouserSearch: CouserSearch,
    draggable
  },
  data () {
    return {
      lessonId: undefined,
      username: undefined,
      lessons: undefined,
      isShow: true,
      blockRemoval: true,
      coursename: '',
      keywords: [],
      searchResult: [],
      seletedurl: []
    }
  },
  watch: {
    lessons () {
      this.blockRemoval = this.lessons.length <= 1
    }
  },
  created () {
    console.log(this.lesson)
    this.username = this.lesson.userId
    this.lessonId = this.lesson.lessonId
    this.lessons = this.lesson.lessonList
    this.j = this.lessons.length
    for (let i = 0; i < this.j; i++) {
      this.lessons[i].isDisplay = false
    }
    this.lessons[this.j - 1].isDisplay = true
    console.log(this.lesson)
  },
  // computed: {
  //   seletedurl () {

  //   }
  // },
  methods: {
    save (index) {
      this.lessons[index].url = this.seletedurl
      console.log(this.lessons[index].url)
    },
    add () {
      // var index = this.lessons.length
      var i
      for (i = 0; i < this.lessons.length; i++) {
        this.lessons[i].isDisplay = false
      }
      this.seletedurl = []
      this.lessons.push({editcontent: '', summary: '', isDisplay: true, url: [{DisplayURL: '', Name: '', Snippet: '', URL: ''}], start: {dateTime: ''}, end: {dateTime: ''}})
    },
    selectedLesson (selectedId) {
      var i
      for (i = 0; i < this.lessons.length; i++) {
        this.lessons[i].isDisplay = false
      }
      this.lessons[selectedId].isDisplay = true
      if (this.lessons[selectedId].url === '') {
        this.seletedurl = []
      } else {
        this.seletedurl = this.lessons[selectedId].url
      }
    },
    submit () {
      const lessonId = this.lessonId
      const userid = this.username
      const des = this.lesson.thedescription
      const submitLessons = this.lessons
      const area = this.lesson.thearea
      const course = this.lesson.thecourse
      const subject = this.lesson.thesubject
      const stage = this.lesson.thestage
      this.$q.loading.show({
        spinner: QSpinnerPie,
        spinnerColor: 'amber',
        spinnerSize: 100,
        message: 'Updating the content...'
      })
      setTimeout(() => {
        this.$q.loading.hide()
        this.$store.dispatch('user/postlessons', {submitLessons, area, course, subject, stage, des, userid, lessonId})
      }, 3000)
    },
    removeLesson (index) {
      if (!this.blockRemoval) {
        if (index === this.lessons.length - 1) {
          this.lessons[index - 1].isDisplay = true
          this.lessons.splice(index, 1)
        } else {
          this.lessons.splice(index, 1)
        }
      }
    },
    deletelink (index) {
      this.seletedurl.splice(index, 1)
    },
    search () {
      const axios = require('axios')
      axios({
        url: 'http://localhost:1330/search/graphql',
        method: 'post',
        data: {
          query: `query SearchQuery($terms: SearchInput) {
            searchRequest(terms: $terms) {
              WebPages {
                Value {
                  Name
                  URL
                  DisplayURL
                  Snippet
                }
              }
            }
          }`,
          variables: {
            terms: {
              learning_area: 'hise',
              subject: this.selectedcourse,
              stage: this.selectedstage,
              course_name: this.coursename,
              content_area: this.selectedarea,
              keywords: this.keywords
            }
          }
        }
      }).then((res) => {
        this.searchResult = res.data.data.searchRequest.WebPages.Value
      })
    }
  }
}
</script>
