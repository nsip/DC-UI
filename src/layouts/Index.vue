<template>
  <!-- <q-page class="flex flex-center"> -->
  <q-page id="landingpage">
    <div>
        <q-card class="row top" text-color="dark">
          <div class="col-7" style="height:503px">
            <q-card-title>
              <h2>
                <img src="../assets/logo-2.jpg">
              </h2>
            </q-card-title>
            <q-card-main>
              <p>
                Welcome.
                This is a nias3 demostration application that consumes sylabus data from the nias3 infarstructure and allows users to build lessons based on available syallbus information.
                Lessons can then be saved back into the nias3 data store to be triangulated against other school data such as classes, students, teaching-groups, attendance, assessment results etc.
              </p>
              <p>
                Note this demo version only contains machine-readable syllabuses for HSIE Geography and History, Stages 1-5.
              </p>
              <p>
                The demo apps and infrastrucure have been created under the NSW Digital Classroom initiative.
              </p>
            </q-card-main>
            <q-card-actions v-if="auth" class="home-btn-right">
              <q-btn size="md" rounded outline class="log-btn btn" color="deep-purple-9" @click="$router.push({ name: 'dashboard', params: { username: user.name } })" >
              <p>Go to my dashboard</p>
              </q-btn>
            </q-card-actions>
            <q-card-actions v-else class="home-btn-right">
              <q-btn size="md" class="log-btn btn" rounded outline color="deep-purple-9" @click="$router.push('/auth/login')" >
                <img src="../assets/login-3.png">
                <p>Login</p>
              </q-btn>
              <q-btn size="md" class="log-btn bc-btn" rounded  color="deep-purple-9" @click="$router.push('/auth/register')" >
                <img src="../assets/singup.png">
                <p>Signup</p>
              </q-btn>
            </q-card-actions>
          </div>
          <div class="col-5">
              <q-card-media class="img-position">
                <img src="../assets/enducation.png" style="height:503px; width:503px"/>
              </q-card-media>
          </div>
        </q-card>
    <!-- <vue-canvas-nest :config="{color:'0,0,255', opacity: 1, count: 199}" :el="'#landingpage'"></vue-canvas-nest> -->
    </div>
  </q-page>
</template>

<style>
</style>

<script>
// import vueCanvasNest from 'vue-canvas-nest'

export default {
  name: 'PageIndex',
  // components: { vueCanvasNest }
  computed: {
    auth () {
      return this.$store.state.user.auth
    },
    user () {
      return this.$store.state.user.user
    }
  }
}
</script>
