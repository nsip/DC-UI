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
                <div style="float:right; margin:30px 0">
                <q-btn label="Save & Add New Lesson" color="deep-purple-9" @click="save" />
                </div>
              </div>
                <!-- <q-btn label="save" @click="print"/> -->
            </div>
            <div class="col-3" style="padding-left:10px;">
                <app-couser-search></app-couser-search>
            </div>
            <q-card class="col-9" style="margin-bottom: 50px">
                <q-card-title class="relative-position q-ma-sm">
                    <b style="color:gray">List of {{coursename}} Lesson</b>
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
                        @click="submit" />
                </q-card-title>
            </q-card>
        </div>
        <div class="left-btn">
            <q-btn push icon="adb" align="between" label="Reminder" color="deep-purple-9" @click="isShow=!isShow"></q-btn>
        </div>
    </div>
</template>
<script>
import CouserRemainder from './CourseRemainder.vue'
// import CouserEditor from './CourseEditor.vue'
import CouserSearch from './CourseSearch.vue'
import draggable from 'vuedraggable'

export default {
  props: ['course', 'selectedarea', 'selectedcourse', 'selectedstage'],
  components: {
    appCouserReminder: CouserRemainder,
    // appCouserEditor: CouserEditor,
    appCouserSearch: CouserSearch,
    draggable
  },
  data () {
    return {
      lessons: [
        {
          id: 0,
          title: 'A',
          editcontent: 'Content 1',
          isDisplay: true
        }
      ],
      j: 0,
      isShow: true,
      blockRemoval: true,
      coursename: ''
    }
  },
  created () {
    this.coursename = this.course.name
  },
  watch: {
    lessons () {
      this.blockRemoval = this.lessons.length <= 1
    },
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
      }
      this.lessons.push({id: index++, editcontent: '', title: '', isDisplay: true})
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
      console.log(this.lessons[selectedId].editcontent)
    },
    submit () {
      const submitLessons = this.lessons
      // console.log(submitLessons[0])
      this.$store.dispatch('user/post', {submitLessons})
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
</style>
