<template>
    <div>
        <div class="left-btn">
            <q-btn push icon="adb" align="between" label="Reminder" color="deep-purple-9" @click="isShow=!isShow"></q-btn>
        </div>
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
                <app-couser-editor v-for="(editor, index) in editors" :key="index"></app-couser-editor>
                </div>
            </div>
            <div class="col-3" style="padding-left:10px;">
                <app-couser-search></app-couser-search>
            </div>
            <draggable class="col-9" v-model="lines" :options="{handle:'.my-handle'}" style="margin-top:50px;max-height: 220px;overflow-y: auto;">
                <q-card class="addLesson" v-for="(line, index) in lines" :key="index">
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
            </draggable>
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
      lines: [],
      editors: [],
      isShow: true,
      blockRemoval: true
    }
  },
  watch: {
    lines () {
      this.blockRemoval = this.lines.length <= 1
    },
    editors () {
      this.blockRemoval = this.editor.length <= 1
    }
  },
  methods: {
    // editors: this.lines,
    addLine () {
      let checkEmptyLines = this.lines.filter(line => line.number === null)
      if (checkEmptyLines.length >= 1 && this.lines.length > 0) return
      this.lines.push({
        index: this.lines.length
      })
      this.editors.push({
        index: this.editors.length
      })
    //   if (checkEmptyLines.length >= 1 && this.lines.length > 0) {
    //     let i = this.editors.length
    //     console.log(i)
    //     document.querySelector('current-' + i - 1).style.display = 'none'
    //   }
    },
    removeLine (lineId) {
      if (!this.blockRemoval) {
        this.lines.splice(lineId, 1)
        this.editors.splice(lineId, 1)
        console.log(lineId)
      }
    },
    selectedLesson () {
    }
  },
  mounted () {
    this.addLine()
  }
}
</script>

<style scoped>
.left-btn {
    position:fixed;
    bottom: -4px;
    left: 10px
}
.courseplan {
    margin: 50px 100px
}
.addLesson{
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
  cursor: -webkit-grabbing;

}
</style>
