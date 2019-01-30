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
.search{
  box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)
}
</style>
