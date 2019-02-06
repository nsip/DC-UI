<template>
<div class="search">
  <q-search
    inverted
    icon=""
    color="deep-purple-9"
    v-model="model"
    float-label="Enter the key words"/>
</div>
</template>

<script>
export default {
  data () {
    return {
      model: ''
    }
  }
}
</script>

<style scope>
</style>
