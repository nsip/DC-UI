<template>
<q-page class="card-postion" id="login">
    <q-card class="row card">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <img src="../../assets/register.png" alt="">
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 sign-up">
            <div>
                <img src="../../assets/homelogo.png" style="height:100px; width:100px">
                <h6 style="margin: 10px 0; color:gray"><b>Welecome back :)</b></h6>
            </div>
            <div style="margin-top:30px">
                <q-input
                    color="deep-purple-9"
                    v-model="username" type="text"
                    :before="[{icon: 'account_circle'}]"
                    float-label="Enter your user name" />
                <q-input color="deep-purple-9" v-model="password" type="password" :before="[{icon: 'fas fa-unlock'}]" float-label="Enter your password" />
                <div style="margin-top: 20px">
                    <!--
                    <q-checkbox color="deep-purple-9" />
                    -->
                    <a href="">Fogotten your password?</a>
                </div>
            </div>
            <div style="text-align: center; margin-top:80px">
                <q-btn icon="fas fa-sign-in-alt" :loading="loading" label="Log in" style="width: 50%" color="deep-purple-9" @click="submit">
                  <span slot="loading">
                    <q-spinner class="on-left" />
                    Log in
                  </span>
                </q-btn>
            </div>
            <div style="text-align:center; margin-top:20px">
                <router-link to="/auth/register"><a>Create a new account?</a></router-link>
            </div>
            </div>
    </q-card>
    <!-- <vue-canvas-nest :config="{color:'49,27,146', opacity: 1, count: 299}" :el="'#login'"></vue-canvas-nest> -->
</q-page>
</template>
<script>
// import createCaptcha from '../../utils/createCaptcha'
// import vueCanvasNest from 'vue-canvas-nest'
export default {
  // components: { vueCanvasNest },
  data () {
    return {
      username: '',
      password: '',
      loading: false
      // percentage: 0
    }
  },
  methods: {
    submit () {
      const user = {
        name: this.username,
        password: this.password
      }
      const localUser = this.$store.state.user.user
      this.loading = true
      // this.percentage = 0
      setTimeout(() => {
        // this.percentage += Math.floor(Math.random() * 8 + 10)
        // if (this.percentage >= 100) {
        if (localUser) {
          if (localUser.name !== user.name || localUser.password !== user.password) {
            this.$q.notify({
              message: `Username or password isn't correct.`,
              color: 'red-8',
              icon: 'fas fa-exclamation-circle',
              position: 'top'
            })
          } else {
            this.$store.dispatch('user/login', user)
            this.$q.notify({
              message: `Welecome back!!!`,
              color: 'amber-5',
              icon: 'far fa-laugh-wink',
              position: 'top'
            })
          }
        } else {
          this.$q.notify({
            message: `User doesn't exsit.`,
            color: 'pink-5',
            icon: 'fas fa-info-circle',
            position: 'top'
          })
        }
        // clearInterval(interval)
        this.loading = false
        // }
      }, 1000)
    }
  }
}
</script>
<style scoped>
.background{
    /* border-radius: 9px 0 0 9px; */
    /* background-image: url("../../assets/register.png"); */
    -webkit-filter: brightness(0.90);
    filter: brightness(0.90);
    /* padding: 20px; */
}
a {
    font-size: 11px
}
.card {
    background-color: white;
    margin:100px auto;
    height:600px;
    width:1000px;
    overflow: hidden;
}
.sign-up {
     padding: 100px 50px 100px 10px;
}
</style>
