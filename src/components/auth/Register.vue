<template>
<q-page class="card-postion">
    <div class="row card" style="margin:100px auto; height:600px; width:1000px">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 background">
            <div style="color:white">
                <h5>Welcome to our website</h5>
            </div>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 sign-up">
            <div>
                <img src="../../assets/115.jpg" style="height:100px; width:100px">
                <h6>Please enter your information</h6>
            </div>
            <div style="margin-top:30px">
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
            <div style="text-align: center; margin-top:30px">
                <q-btn @click="register" icon="fas fa-user-plus" label="SIGN UP" style="width: 50%" color="deep-purple-9" />
            </div>
            </div>
    </div>
</q-page>
</template>
<script>
// import createCaptcha from '../../utils/createCaptcha'
// import ls from '../../utils/localStorage'
import { required, sameAs, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      // captchaTpl: '',
      password: '',
      cpassword: ''
      // captcha: ''
    }
  },
  validations: {
    email: { required, email },
    password: { required },
    cpassword: {
      sameAsPassword: sameAs('password')
    }
  },
  // created () {
  //   this.getCaptcha()
  // },
  methods: {
    // getCaptcha () {
    //   const { tpl, captcha } = createCaptcha(6)
    //   this.captchaTpl = tpl
    //   this.localCaptcha = captcha
    // },
    //  Register
    register (e) {
      this.$nextTick(() => {
        const target = e.target.type === 'submit' ? e.target : e.target.parentElement
        if (target.canSubmit) {
          this.submit()
        }
      })
    },
    // provide data to local storage
    submit () {
      // check picture
      // if (this.captcha.toUpperCase() !== this.localCaptcha) {
      //   this.getCaptcha()
      // } else {
      // check user
      const user = {
        name: this.email,
        password: this.password,
        avatar: `https://api.adorable.io/avatars/200/${this.username}.png`
      }
      console.log(user)
      const localUser = this.$store.state.user
      if (localUser) {
        if (localUser.name === user.name) {
        // this.showMsg('User name exist')
        } else {
          this.login(user)
        }
      } else {
        this.login(user)
      }
      // }
    },
    login (user) {
      this.store.dispatch('login', user)
    }
  }
}
</script>
<style scoped>
.background{
    border-radius: 9px 0 0 9px;
    background-image: url("../../assets/register.png");
    -webkit-filter: brightness(0.90);
    filter: brightness(0.90);
    background-repeat: no-repeat;
    padding: 20px;
}
.card {
    background-color: white;
    border:1px solid rgb(185, 172, 202);
    border-radius:10px;
    box-shadow: 2px 2px 2px #888888;
}
.sign-up {
     padding: 50px 50px 50px 10px;
}
</style>
