<template>
    <div>
        <q-item-side
            right>
                <q-btn
                    class="q-ma-xs icon-delete-btn"
                    icon="fas fa-trash-alt"
                    size="6px"
                    outline
                    round
                    v-if="withButton"
                    @mousedown="remove"
                    />
        </q-item-side>
        <slot></slot>
    </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number
    },
    withButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    remove () {
      this.$emit('remove', {
        index: this.index
      })
    }
  }
}
</script>

<style scoped>
.icon-delete-btn {
  display: block;
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 7px;
  right: 6px;
  top: 6px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.2);
}
</style>
