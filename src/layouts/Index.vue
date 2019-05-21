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
                You will find here below a number of short paragraphs on the topic Importance of Education of varying word lengths. We hope these paragraphs on Importance of Education will help students in completing their school assignments. These will also help children write and read out paragraphs in simple words and with small sentences. Students can select any paragraph on Importance of Education according to their particular requirement.
              </p>
              <p>
                You will find here below a number of short paragraphs on the topic Importance of Education of varying word lengths. We hope these paragraphs on Importance of Education will help students in completing their school assignments. These will also help children write and read out paragraphs in simple words and with small sentences. Students can select any paragraph on Importance of Education according to their particular requirement.
              </p>
            </q-card-main>
            <q-card-actions v-if="auth" class="home-btn-right">
              <q-btn size="md" rounded outline color="deep-purple-9" class="log-btn" @click="$router.push({ name: 'dashboard', params: { username: user.name } })" >
              <p>Go to my dashboard</p>
              </q-btn>
            </q-card-actions>
            <q-card-actions v-else class="home-btn-right">
              <q-btn size="md" class="log-btn" rounded outline color="deep-purple-9" @click="$router.push('/auth/login')" >
                <img src="../assets/login-3.png">
                <p>Login</p>
              </q-btn>
              <q-btn size="md" class="log-btn" rounded color="deep-purple-9" @click="$router.push('/auth/register')" >
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
