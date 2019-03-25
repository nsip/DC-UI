<template>
  <div>
        <div style="margin:100px 0 0 100px; color:gray">
            <h4><b>Lesson Plan
              <i class="fas fa-scroll q-ma-sm"></i>
            </b></h4>
            <p><i>Design the lesson in the editor, add the lesson by clicking the add button, and delete the lesson by clicking the delete button</i></p>
        </div>
        <hr>
        <div class="row courseplan">
            <transition name="slide-fade">
            <div v-if="!isShow" class="col-3" style="padding-right:10px">
                <app-couser-reminder
                  :course="course"
                  :coursename="coursename"
                  :selectedarea="selectedarea"
                  :selectedcourse="selectedcourse"
                  :selectedstage="selectedstage" />
            </div>
            </transition>
            <div :class="isShow?'col-9':'col-6'">
              <div
                  class="editor" v-for="(lesson, index) in lessons" :key="index"
                  :style="lesson.isDisplay?'display:block':'display:none'">
                <q-editor
                  toolbar-text-color="white"
                  toolbar-outline
                  toolbar-bg="deep-purple-9"
                  min-height="42rem"
                  v-model="lesson.editcontent"
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
                      <p>Title: {{ lesson.title }}</p>
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
                  <q-btn label="Save this lesson" color="deep-purple-9" icon="save" @click="save(index)" />
                </div>
              </div>
                <!-- <q-btn label="save" @click="print"/> -->
            </div>
            <div class="col-3" style="padding-left:10px;">
                <q-chips-input
                  inverted
                  color="deep-purple-9"
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
            <q-card class="col-9 l" style="margin-bottom: 50px">
                <q-card-title class="relative-position q-ma-sm">
                    <b style="color:gray">List of {{coursename}} Lesson</b>
                     <q-btn
                        class="absolute"
                        icon="fas fa-plus"
                        outline
                        flat
                        color="deep-purple-9"
                        style="right: 8px;"
                        @click="add"/>
                    <q-card-separator style="margin-top: 15px; margin-bottom: 15px"/>
                    <span slot="subtitle">
                      <q-field
                        :label-width="2"
                        icon="far fa-file-alt"
                        label="Lesson Description"
                      >
                        <q-input
                          v-model="description"
                          color="deep-purple-9" />
                      </q-field>
                    </span>
                </q-card-title>
                <q-item-separator />
                <q-card-main class="lesson-list">
                        <draggable class="row" v-model="lessons" :options="{handle:'.my-handle'}" style="text-align:center; position: relative;">
                            <div class="col-lg-2 col-md-4 col-sm-6 col-xs-12" v-for="(lesson, index) in lessons" :key="index">
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
                                                v-model="lesson.title"/>
                                        </div>
                                    </q-item>
                                </q-list>
                            </div>
                            </draggable>
                </q-card-main>
                <q-item-separator />
                <q-card-title class="relative-position q-ma-sm">
                  <b style="color:gray">Learning Arae: {{selectedarea}} | Subject: {{selectedcourse}} | Stage: {{selectedstage}}</b>
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
            <q-card class="col-3 l" style="margin-bottom: 50px; border-left:none">
                <q-card-title class="relative-position q-ma-sm">
                  <i style="color:#ffc107; margin-right:10px" class="fas fa-link" />
                  <b style="color:gray">Related Resouse Link</b>
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
            <q-btn push icon="adb" align="between" label="Reminder" color="deep-purple-9" @click="isShow=!isShow"></q-btn>
        </div>
    </div>
</template>
<script>
import CouserRemainder from './CourseRemainder.vue'
// import CouserEditor from './CourseEditor.vue'
// import CouserSearch from './CourseSearch.vue'
import draggable from 'vuedraggable'

export default {
  props: ['course', 'selectedarea', 'selectedcourse', 'selectedstage'],
  components: {
    appCouserReminder: CouserRemainder,
    // appCouserEditor: CouserEditor,
    // appCouserSearch: CouserSearch,
    draggable
  },
  data () {
    return {
      lessonId: undefined,
      lessons: [
        {
          id: 0,
          title: 'A',
          editcontent: 'Content 1',
          isDisplay: true,
          url: ''
        }
      ],
      j: 0,
      isShow: true,
      blockRemoval: true,
      coursename: '',
      keywords: [],
      searchResult: [],
      seletedurl: []
      // lessonurl: []
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     vm.setLessonId(vm.$route.params.lessonId)
  //   })
  // },
  created () {
    this.coursename = this.course.name
  },
  watch: {
    lessons () {
      this.blockRemoval = this.lessons.length <= 1
    },
    // save (index) {
    //   this.lessons[index].url = this.seletedurl
    //   // console.log(this.lessons[index].url)
    // },
    coursename: function () {
      console.log(this.coursename)
      console.log(this.selectedarea)
      console.log(this.selectedcourse)
      console.log(this.selectedstage)
      console.log(this.lessons.length)
    }
  },
  methods: {
    // save every single lesson
    save (index) {
      this.lessons[index].url = this.seletedurl
      // console.log(this.lessons[index].url)
    },
    // create new lesson
    add () {
      var index = this.lessons.length
      var i
      for (i = 0; i < this.lessons.length; i++) {
        this.lessons[i].isDisplay = false
      }
      this.seletedurl = []
      this.lessons.push({id: index++, editcontent: '', title: '', isDisplay: true, url: ''})
    },
    // select lesson
    selectedLesson (selectedId) {
      var i
      // console.log(selectedId)
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
    // submit course plan to local storage
    submit () {
      const description = this.description
      const submitLessons = this.lessons
      const area = this.selectedarea
      const course = this.course.name
      const subject = this.selectedcourse
      const stage = this.selectedstage
      // console.log(submitLessons)
      // console.log({submitLessons})
      this.$store.dispatch('user/post', {submitLessons, area, course, subject, stage, description})
    },
    // delete lesson
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
      // console.log(this.keywords)
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
        // console.log(this.searchResult)
      })
    }
  }
}
</script>

<style scoped>
.left-btn {
  position:fixed;
  bottom: -4px;
  left: 10px;
  display:block
}
.courseplan {
  margin: 50px 100px
}
.addLesson{
  padding-top:0px;
  margin-top:10px;
  border: 1px solid #ccc;
  transition: box-shadow 1.5s
}
.addLesson:hover{
  box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)
}
.singlerow{
  margin-left:0%;
}
.q-card-container{
  padding: 5px
}
.xs {
  padding:0 5px
}
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
h5{
  margin-bottom: 20px
}
.my-handle {
  cursor: move;
  cursor: -webkit-grabbing
}
.lesson-list {
  max-height: 500px;
  overflow-y:scroll
}
.editor{
  margin-bottom: 30px;
  transition: box-shadow 1.5s
}
.editor:hover {
  box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)
}
.q-editor {
  height: 711px;
  max-height: 711px;
  border: 1px solid #e0e0e0;
  border-bottom: none;
  overflow: scroll;
  /* box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12) */
}
.searchResult {
  height: 655px;
  max-height: 655px;
  border-bottom: none;
  overflow: scroll
}
.search {
  transition: box-shadow 1.5s;
  overflow: scroll;
}
.search:hover {
  box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)
}
.tip {
  width: 420px;
}
.urllink {
  text-decoration: none;
  color: gray;
}
.urllink:hover {
  color: #4527a0;
}
.link-list {
  overflow-x: scroll
}
.l {
  box-shadow: none;
  border: 1px lightgray solid;
}
.tips {
  font-size:10px;
  margin: 0px;
  color: #737373
}
.bottom-tips p {
  margin: 0px;
  color: #737373;
}
.bottom-tips i {
  color:#ffc107;
  font-size: 16px;
}
.bottom-tips {
  max-height: 58px;
  overflow: scroll
}
.search-input {
  height: 56px;
  max-height: 56px;
  overflow: scroll
}
</style>
