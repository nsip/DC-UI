<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page id="landingpage">
    <div>
        <q-card class="row top" text-color="dark">
          <div class="col-7" style="height:503px">
            <q-card-title>
              <h2>
              <i class="fab fa-drupal" style="color:#ffc107; font-size:70px"></i>
              Title
              </h2>
            </q-card-title>
            <q-card-main>
              <p>
                You will find here below a number of short paragraphs on the topic Importance of Education of varying word lengths. We hope these paragraphs on Importance of Education will help students in completing their school assignments. These will also help children write and read out paragraphs in simple words and with small sentences. Students can select any paragraph on Importance of Education according to their particular requirement.
              </p>
              <p>
                You will find here below a number of short paragraphs on the topic Importance of Education of varying word lengths. We hope these paragraphs on Importance of Education will help students in completing their school assignments. These will also help children write and read out paragraphs in simple words and with small sentences. Students can select any paragraph on Importance of Education according to their particular requirement.
              </p>
            </q-card-main>
            <q-card-actions>
              <q-btn size="md" color="deep-purple-9" text-color="white" label="Login" @click="$router.push('/auth/login')" />
              <q-btn size="md" outline color="deep-purple-9" label="Signup" @click="$router.push('/auth/register')" />
            </q-card-actions>
          </div>
          <div class="col-5">
              <q-card-media class="img-position">
                <img src="../assets/enducation.png" style="height:503px; width:503px"/>
              </q-card-media>
          </div>
        </q-card>
    <!-- <div class="row top">
    <div class="col-6">
      <div class="q-ma-sm" style="color:gray">
        <h2>
          <i class="fab fa-drupal" style="color:#ffc107; font-size:70px;margin: 0 10px"></i>
          <b>Title</b>
        </h2>
        <p>
          You will find here below a number of short paragraphs on the topic Importance of Education of varying word lengths. We hope these paragraphs on Importance of Education will help students in completing their school assignments. These will also help children write and read out paragraphs in simple words and with small sentences. Students can select any paragraph on Importance of Education according to their particular requirement.
        </p>
        <p>
          You will find here below a number of short paragraphs on the topic Importance of Education of varying word lengths. We hope these paragraphs on Importance of Education will help students in completing their school assignments. These will also help children write and read out paragraphs in simple words and with small sentences. Students can select any paragraph on Importance of Education according to their particular requirement.
        </p>
      </div>
        <div class="row" style="margin-top:150px">
          <div class="col-8"></div>
          <div class="col-2">
            <div class="q-ma-sm">
              <q-btn class="full-width" color="deep-purple-9" text-color="white" label="Login" />
            </div>
          </div>
          <div class="col-2">
            <div class="q-ma-sm">
              <q-btn class="full-width" outline color="deep-purple-9" label="Signup" />
            </div>
          </div>
        </div>
      </div>
    <div class="col-6">
      <q-card inline class="q-ma-sm">
      <q-card-media overlay-position="full">
        <img src="../assets/enducation.png" style="width:750px; height:650px">
        <q-card-title>
        </q-card-title>
      </q-card-media>
    </q-card>
    </div>
    </div> -->
    <vue-canvas-nest :config="{color:'0,0,255', opacity: 1, count: 199}" :el="'#landingpage'"></vue-canvas-nest>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import vueCanvasNest from 'vue-canvas-nest'

export default {
  name: 'PageIndex',
  components: { vueCanvasNest }
}
</script>
<style scoped>
.top {
  margin: 100px 200px 0 200px;
  box-shadow: none
}
.img-position{
  text-align: -webkit-center;
  /* text-align: center */
}
</style>
