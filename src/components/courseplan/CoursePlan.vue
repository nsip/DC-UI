<template>
  <div>
        <div style="margin:100px 0 0 100px; color:gray">
            <h5><b>Lesson Plan</b></h5>
            <p><i>Design the lesson in the editor, add the lesson by clicking the add button, and delete the lsesson by clicking the minus button</i></p>
        </div>
        <hr>
        <div class="row courseplan">
            <transition name="slide-fade">
            <div v-if="!isShow" class="col-3" style="padding-right:10px">
                <app-couser-reminder
                  :course="course"
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
              </div>
                <!-- <q-btn label="save" @click="print"/> -->
            </div>
            <div class="col-3 search" style="padding-left:10px;">
                <!-- <app-couser-search
                :selectLink="save">
                {{selectLink}}
                </app-couser-search> -->
                <q-chips-input
                  inverted
                  color="deep-purple-9"
                  chips-color="dark"
                  chips-bg-color="white"
                  v-model="keywords"
                  float-label="Enter the key words"
                  @keyup="search">
                </q-chips-input>
                <q-list class="searchResult">
                  <q-item v-for="result in searchResult" :key="result.URL">
                      <q-item-side>
                        <q-checkbox  color="deep-purple-6" v-model="seletedurl" :val="result.URL" />
                        <!-- {{result.DisplayURL}}
                        {{result.Name}}
                        {{result.Snippet}}
                        {{result.URL}} -->
                      </q-item-side>
                      <q-item-main><a :href="result.URL"  target="_blank" class="urllink">{{result.Name}}</a>
                        <q-tooltip class="tip" anchor="bottom middle" self="top middle" :offset="[10, 10]">
                          {{result.Snippet}}
                        </q-tooltip>
                      </q-item-main>
                  </q-item>
                </q-list>
                <div style="float:right; margin:30px 0">
                <q-btn label="Save & Add New Lesson" color="deep-purple-9" @click="save" />
                </div>
            </div>
            <q-card class="col-9 l" style="margin-bottom: 50px">
                <q-card-title class="relative-position q-ma-sm">
                    <b style="color:gray">List of {{coursename}} Lesson</b>
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
                    <!-- <q-btn
                        flat
                        outline
                        color="deep-purple-5"
                        icon="fas fa-plus"
                        class="absolute"
                        style="right: 8px;">
                        <q-tooltip
                            anchor="bottom middle"
                            self="top middle"
                            :offset="[10, 10]"
                            :delay="800"
                        >Add Lesson</q-tooltip>
                    </q-btn> -->
                </q-card-title>
                <q-item-separator />
                <q-card-main class="lesson-list">
                        <draggable class="row" v-model="lessons" :options="{handle:'.my-handle'}" style="text-align:center; position: relative;">
                            <div class="col-2" v-for="(lesson, index) in lessons" :key="index">
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
                    <q-btn
                        flat
                        outline
                        color="deep-purple-5"
                        label="Submit All Lessons"
                        class="absolute"
                        style="right: 8px;"
                        @click="submit"
                        :to="{name:'dashboard'}">
                        </q-btn>
                </q-card-title>
            </q-card>
            <q-card class="col-3 l" style="margin-bottom: 50px; border-left:none">
                <q-card-title class="relative-position q-ma-sm">
                  <b style="color:gray">Related Resouse Link</b>
                  <q-card-separator style="margin-top: 15px; margin-bottom: 15px" />
                </q-card-title>
                <q-card-main class="link-list q-ma-xs" style="color:gray">
                    <q-item v-for="link in seletedurl" :key="link">
                      <q-item-side>
                        <i class="far fa-minus-square"></i>
                      </q-item-side>
                      <a :href="link" target="_blank" class="urllink">{{link}}</a>
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
      lessons: [
        {
          id: 0,
          title: 'A',
          editcontent: 'Content 1',
          isDisplay: true,
          url: []
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
  created () {
    this.coursename = this.course.name
  },
  watch: {
    lessons () {
      this.blockRemoval = this.lessons.length <= 1
    },
    // checkResult () {
    //   this.checkResult = checkResult
    // },
    coursename: function () {
      console.log(this.coursename)
      console.log(this.selectedarea)
      console.log(this.selectedcourse)
      console.log(this.selectedstage)
    }
  },
  methods: {
    save () {
      var index = this.lessons.length
      var i
      for (i = 0; i < this.lessons.length; i++) {
        this.lessons[i].isDisplay = false
        this.lessons[i].url = this.seletedurl
        console.log(this.lessons[i].url)
      }
      this.lessons.push({id: index++, editcontent: '', title: '', isDisplay: true, url: []})
      this.seletedurl = []
      console.log(index)
      // for (i = 0; i < this.lessons.length; i++) {
      //   this.lessons[i].editcontent
      //   this.lessons[i].title
      // }
    },
    selectedLesson (selectedId) {
      var i
      console.log(selectedId)
      for (i = 0; i < this.lessons.length; i++) {
        this.lessons[i].isDisplay = false
      }
      this.lessons[selectedId].isDisplay = true
      this.seletedurl = this.lessons[selectedId].url
      console.log(this.lessons[selectedId].url)
      console.log(this.lessons[selectedId].editcontent)
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
    search () {
      console.log(this.keywords)
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
        console.log(this.searchResult)
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
  margin-bottom: 30px
}
.q-editor {
  box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)
}
.searchResult {
  height: 656px;
  overflow: scroll
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
</style>
