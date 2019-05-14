<template>
<q-page class="card-postion" id="signup">
    <q-card class="row card" style="height:650px">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <img src="../../assets/register.png" alt="">
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 sign-up">
            <div>
                <img src="../../assets/homelogo.png" style="height:100px; width:100px">
                <h6 style="margin: 10px 0; color:gray"><b>Please enter your information</b></h6>
            </div>
            <div>
                <q-field
                    :error="$v.username.$error"
                    error-label="Please type a valid user name, only accept alphabet characters and number"
                >
                <q-input
                    color="deep-purple-9"
                    v-model="username"
                    type="text"
                    :before="[{icon: 'account_circle'}]"
                    float-label="Set your user name"
                    @blur="$v.username.$touch"/>
                </q-field>
                <q-field
                    :error="$v.useremail.$error"
                    error-label="Please type a valid email"
                >
                <q-input
                    color="deep-purple-9"
                    v-model="useremail"
                    type="email"
                    :before="[{icon: 'mail'}]"
                    float-label="Enter your email address"
                    @blur="$v.useremail.$touch" />
                </q-field>
                <q-field
                    :error="$v.userpassword.$error"
                    error-label="Please type a valid password"
                >
                <q-input
                    id="password"
                    color="deep-purple-9"
                    v-model="userpassword"
                    type="password"
                    :before="[{icon: 'fas fa-unlock'}]"
                    float-label="Set your password"
                    @blur="$v.userpassword.$touch" />
                </q-field>
                <q-field
                    :error="$v.cpassword.$error"
                    error-label="Dosen't match"
                >
                <q-input
                    color="deep-purple-9"
                    v-model="cpassword"
                    type="password"
                    :before="[{icon: 'fas fa-lock'}]"
                    float-label="Confirm your password"
                    @blur="$v.cpassword.$touch" />
                </q-field>
            </div>
            <div style="text-align: center; margin-top:20px">
                <q-btn @click="register" :loading="loading" :percentage="percentage" icon="fas fa-user-plus" label="SIGN UP" style="width: 50%" color="deep-purple-9">
                  <span slot="loading">
                    <q-spinner class="on-left" />
                    SIGN UP
                  </span>
                </q-btn>
            </div>
            </div>
    </q-card>
    <!-- <vue-canvas-nest :config="{color:'49,27,146', opacity: 1, count: 299}" :el="'#signup'"></vue-canvas-nest> -->
</q-page>
</template>
<script>
// import createCaptcha from '../../utils/createCaptcha'
// import ls from '../../utils/localStorage'

import { required, sameAs, email, alphaNum } from 'vuelidate/lib/validators'
// import vueCanvasNest from 'vue-canvas-nest'

export default {
  // components: { vueCanvasNest },
  data () {
    return {
      username: '',
      useremail: '',
      userpassword: '',
      cpassword: '',
      loading: false,
      percentage: 0
    }
  },
  validations: {
    username: { required, alphaNum },
    useremail: { required, email },
    userpassword: { required },
    cpassword: {
      sameAsPassword: sameAs('userpassword')
    }
  },
  methods: {
    // Register
    // provide data to local storage
    register () {
      if (this.username === '' || this.useremail === '' || this.userpassword === '') {
        this.$q.notify({
          message: `Please fill all the empty box`,
          color: 'pink-5',
          icon: 'fas fa-info-circle',
          position: 'top'
        })
      } else {
        const user = {
          name: this.username,
          email: this.useremail,
          password: this.userpassword
        }
        // const username = this.username
        // const useremail = this.useremail
        // const userpassword = this.userpassword
        // const localUser = JSON.parse(localStorage.user)
        const localUser = this.$store.state.user.user
        this.loading = true
        this.percentage = 0
        const interval = setInterval(() => {
          this.percentage += Math.floor(Math.random() * 8 + 10)
          if (this.percentage >= 100) {
            if (localUser) {
              if (localUser.name === user.name) {
                this.$q.notify({
                  message: `User is already exsiting`,
                  color: 'pink-5',
                  icon: 'fas fa-info-circle',
                  position: 'top'
                })
              } else {
                // this.$store.dispatch('user/login', {username, useremail, userpassword})
                // this.$q.notify({
                //   message: `Thank you for signup`,
                //   color: 'amber-5',
                //   icon: 'far fa-laugh-wink',
                //   position: 'top'
                // })
                this.login(user)
              }
            } else {
              this.login(user)
              // this.$store.dispatch('user/login', {username, useremail, userpassword})
              // this.$q.notify({
              //   message: `Thank you for signup`,
              //   color: 'amber-5',
              //   icon: 'far fa-laugh-wink',
              //   position: 'top'
              // })
            }
            clearInterval(interval)
            this.loading = false
          }
        }, 700)
      }
    },
    login (user) {
      this.$store.dispatch('user/login', user)
      this.$q.notify({
        message: `Thank you for signup`,
        color: 'amber-5',
        icon: 'far fa-laugh-wink',
        position: 'top'
      })
    }
  }
}
</script>
