<template>
<q-page class="card-postion">
    <q-card class="row card">
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
                    :error="$v.email.$error"
                    error-label="Please type a valid email"
                >
                <q-input
                    color="deep-purple-9"
                    v-model="email"
                    type="email"
                    :before="[{icon: 'mail'}]"
                    float-label="Enter your email address"
                    @blur="$v.email.$touch" />
                </q-field>
                <q-field
                    :error="$v.password.$error"
                    error-label="Please type a valid password"
                >
                <q-input
                    id="password"
                    color="deep-purple-9"
                    v-model="password"
                    type="password"
                    :before="[{icon: 'fas fa-unlock'}]"
                    float-label="Set your password"
                    @blur="$v.password.$touch" />
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
                <!--
                <q-input
                    color="deep-purple-9"
                    v-model.trim="captcha"
                    v-validator.required="{ title: 'Picture' }"
                    type="text"
                    :before="[{icon: 'fas fa-image'}]"
                    float-label="Enter the picture Number" />
                <div title="Press and get new picture" @click="getCaptcha">
                    <div class="captcha" v-html="captchaTpl"></div>
                </div>
                -->
            </div>
            <div style="text-align: center; margin-top:20px">
                <q-btn @click="register" icon="fas fa-user-plus" label="SIGN UP" style="width: 50%" color="deep-purple-9" />
            </div>
            </div>
    </q-card>
</q-page>
</template>
<script>
// import createCaptcha from '../../utils/createCaptcha'
// import ls from '../../utils/localStorage'

import { required, sameAs, email, alphaNum } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
      cpassword: ''
    }
  },
  validations: {
    username: { required, alphaNum },
    email: { required, email },
    password: { required },
    cpassword: {
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    //  Register
    // provide data to local storage
    register () {
      // check picture
      // if (this.captcha.toUpperCase() !== this.localCaptcha) {
      //   this.getCaptcha()
      // } else {
      // check user
      const user = {
        name: this.username,
        email: this.email,
        password: this.password
        // avatar: `https://api.adorable.io/avatars/200/${this.username}.png`
      }
      const localUser = this.$store.state.user.user
      if (localUser) {
        if (localUser.name === user.name) {
          this.$q.notify({
            message: `User is already exsiting`,
            color: 'pink-5',
            icon: 'fas fa-info-circle',
            position: 'top'
          })
        } else {
          this.login(user)
        }
      } else {
        this.login(user)
      }
      // }
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
<style scoped>
.background{
    /* border-radius: 9px 0 0 9px;
    background-image: url("../../assets/register.png"); */
    -webkit-filter: brightness(0.90);
    filter: brightness(0.90);
    /* background-repeat: no-repeat;
    padding: 20px; */
}
.card {
    background-color: white;
    margin:100px auto;
    height:600px;
    width:1000px;
    overflow: hidden;
}
.sign-up {
     padding: 50px 50px 50px 10px;
}
</style>
