<template>
    <div v-show="show" :class="`alter-${type}`">
        <q-btn @click="close"><span>x</span></q-btn>
        {{ msg }}
    </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    // if show massage box
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'Success'
    },
    msg: {
      type: String,
      default: ''
    }
  },
  watch: {
    show (value) {
      if (value) {
        this.$nextTick(() => {
          this.$el.scrollIntoView(true)
        })
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:show', false)
    }
  }
}
</script>
