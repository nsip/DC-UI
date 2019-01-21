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
                <app-couser-reminder :item="item" />
            </div>
            </transition>
            <div :class="isShow?'col-9':'col-6'">
                <div>
                <app-couser-editor v-for="(lesson, index) in lessons" :key="index"></app-couser-editor>
                </div>
                <!-- <q-btn label="save" @click="print"/> -->
            </div>
            <div class="col-3" style="padding-left:10px;">
                <app-couser-search></app-couser-search>
            </div>
            <!-- <draggable class="col-9" v-model="lines" :options="{handle:'.my-handle'}" style="margin-top:50px;max-height: 220px;overflow-y: auto;">
                <q-card class="addLesson" v-for="(line,index) in lines" :key="index">
                <q-card-main class="row singlerow">
                <div class="col-1" style="text-align:center">
                    <q-icon class="my-handle" name="fas fa-bars" aria-hidden="true" size="25px" color="blue-grey-3" style="padding-top:20%"></q-icon>
                </div>
                <div class="col-4">
                <q-btn
                    class="q-ma-sm full-width"
                    outline
                    style="color: #4527a0;"
                    @click='seletedLesson()'>
                    Lesson: {{ index + 1 }}
                </q-btn>
                </div>
                <div class="col-5">
                <q-field
                    class="q-ma-sm"
                    :label-width="3"
                    icon=""
                    label="Lesson Titile"
                >
                    <q-input
                        v-model="line.name"
                        color="deep-purple-5"/>
                </q-field>
                </div>
                <div class="col-2">
                <q-btn
                    class="q-ma-sm"
                    color="blue-grey-3"
                    @click="removeLine(index)"
                    icon="fas fa-minus"
                    outline
                    round>
                    <q-tooltip
                        anchor="bottom middle"
                        self="top middle"
                        :offset="[10, 10]"
                        :delay="800"
                    >Delete Lesson</q-tooltip>
                </q-btn>
                <q-btn
                    class="q-ma-sm"
                    color="blue-grey-3"
                    @click="addLine"
                    icon="fas fa-plus"
                    outline
                    round>
                    <q-tooltip
                        anchor="bottom middle"
                        self="top middle"
                        :offset="[10, 10]"
                        :delay="800"
                    >Add Lesson</q-tooltip>
                </q-btn>
                </div>
                </q-card-main>
                </q-card>
            </draggable> -->
            <q-card class="col-9" style="margin-bottom: 50px">
                <q-card-title class="relative-position q-ma-sm">
                    <b style="color:gray">Lesson List</b>
                    <q-btn
                        flat
                        outline
                        color="deep-purple-5"
                        icon="fas fa-plus"
                        class="absolute"
                        style="right: 8px;"
                        @click="addLine">
                        <q-tooltip
                            anchor="bottom middle"
                            self="top middle"
                            :offset="[10, 10]"
                            :delay="800"
                        >Add Lesson</q-tooltip>
                    </q-btn>
                </q-card-title>
                <q-item-separator />
                <q-card-main class="lesson-list">
                        <draggable class="row" v-model="lessons" :options="{handle:'.my-handle'}" style="text-align:center; position: relative;">
                            <div class="col-2" v-for="(lesson, index) in lessons" :key="lesson">
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
                                                    @click="removeLine(index)"
                                                    />
                                        </q-item-side>
                                    </q-item>
                                    <q-item>
                                        <q-btn
                                            outline
                                            style="color: #4527a0; width:100%"
                                            @click='seletedLesson()'>Lesson {{ index + 1 }}</q-btn>
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
            </q-card>
        </div>
        <div class="left-btn">
            <q-btn push icon="adb" align="between" label="Reminder" color="deep-purple-9" @click="isShow=!isShow"></q-btn>
        </div>
    </div>
</template>

<script>
import CouserRemainder from './CourseRemainder.vue'
import CouserEditor from './CourseEditor.vue'
import CouserSearch from './CourseSearch.vue'
import draggable from 'vuedraggable'

export default {
  props: ['item'],
  components: {
    appCouserReminder: CouserRemainder,
    appCouserEditor: CouserEditor,
    appCouserSearch: CouserSearch,
    draggable
  },
  data () {
    return {
      lessons: this.$store.state.courseplan.lessons,
      index: this.$store.state.courseplan.lessons.id,
      isShow: true,
      blockRemoval: true,
      title: this.$store.state.courseplan.lessons.title
    }
  },
  computed: {
    lessonGet () {
      return this.$store.getters.courseplan.lessons
    }
  },
  watch: {
    lessons () {
      this.blockRemoval = this.lessons.length <= 1
    }
    // editors () {
    //   this.blockRemoval = this.editor.length <= 1
    // }
  },
  methods: {
    addLine () {
      this.$store.commit('courseplan/addLesson', this.index + 1, '', '', false)
      console.log(this.index)
      this.$store.state.courseplan.lessons.isActive = !this.$store.commit('courseplan/setActive')
    },
    // removeLesson (lesson) {
    //   this.$store.dispatch('courseplan/removeLesson')
    // }
    // editors: this.lines,
    // addLine () {
    //   let checkEmptyLines = this.lines.filter(line => line.number === null)
    //   if (checkEmptyLines.length >= 1 && this.lines.length > 0) return
    //   this.lines.push({
    //     index: this.lines.length
    //   })
    // //   this.editors.push({
    // //     index: this.editors.length
    // //   })
    // //   if (checkEmptyLines.length >= 1 && this.lines.length > 0) {
    // //     let i = this.editors.length
    // //     console.log(i)
    // //     document.querySelector('current-' + i - 1).style.display = 'none'
    // //   }
    // },
    removeLine (index) {
      if (!this.blockRemoval) {
        // this.lines.splice(lineId, 1)
        // this.editors.splice(lineId, 1)
        // console.log(lineId)
        // console.log(this.lines[index])
        this.$delete(this.lessons, index)
        // this.$delete(this.editors, index)
      }
    }
    // selectedLesson () {
    // }
  }
//   mounted () {
//     this.addLesson()
//   }
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
</style>
