<template>
  <div class="editor">
    <q-editor
      toolbar-text-color="white"
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
  </div>
</template>

<script>
export default {
  props: ['editor'],
  data () {
    return {
      model: '<h3>Header 3</h3><div>Normal text;'
    }
  }
}
</script>

<style scoped>
.editor{
    margin-top: 0px
}
.q-editor {
  box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)
}
</style>
