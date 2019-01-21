<template>
  <div class="editor" v-show="isActive">
    <q-editor
      toolbar-text-color="white"
      toolbar-outline
      toolbar-bg="deep-purple-9"
      min-height="40rem"
      v-model="model"
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
    <q-btn label="Save" color="deep-purple-9" @click="print" />
    <q-btn label="Clear" color="deep-purple-9" outline style="margin-left: 10px"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['editor', 'index'],
  data () {
    return {
      model: this.$store.state.courseplan.lessons.content,
      isActive: !this.$store.state.courseplan.lessons.isActive
    }
  },
  // computed: {
  //   model: {
  //     get () {
  //       return this.$store.state.courseplan.model
  //     },
  //     set (value) {
  //       this.$store.commit('courseplan/getWy', value)
  //     }
  //   }
  // },
  methods: {
    print () {
      // console.log(this.$store)
      this.$store.commit('courseplan/getWy', this.model)
      this.$q.notify({
        message: `You have saved the content and created a new lesson`,
        timeout: 2000,
        color: 'amber',
        icon: 'fas fa-grin',
        position: 'center'
      })
      this.$store.commit('courseplan/addLesson', 1)
      this.isActive = this.$store.commit('courseplan/setActive')
      // console.log(this.$store.state.course.model)
      // console.log(this.value)
      console.log(this.model)
      console.log(this.isActive)
      // console.log(typeof this.model)
    }
  }
}
</script>

<style scoped>
.editor{
  margin-bottom: 30px
}
.q-editor {
  box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)
}
</style>
