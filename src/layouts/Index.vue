<template>
  <q-page class="flex flex-center">
    <div class="row top">
    <div class="col-6">
        <h2>Title</h2>
        <p>................</p>
        <p>................................</p>
        <div class="row">
          <div class="col-6">
            <q-btn color="deep-purple-9" text-color="white" label="Login" />
          </div>
          <div class="col-6">
            <q-btn outline color="deep-purple-9" label="Signup" />
          </div>
        </div>
      </div>
    <div class="col-6">
      <q-card inline class="q-ma-sm">
      <q-card-media overlay-position="full">
        <img src="../assets/dog.png">
        <q-card-title>
          <!--
          Title
          <span slot="subtitle">Subtitle</span>
          -->
        </q-card-title>
      </q-card-media>
    </q-card>
    </div>
    </div>
    <!--
    <img src="~assets/pig.png">
    -->
  </q-page>
</template>

<style>
</style>

<script>

export default {
  name: 'PageIndex'
}
</script>
<style scoped>
img {

}
.q-card {
  box-shadow: none
}
.top {
  margin: 100px 200px 0 200px
}
</style>
