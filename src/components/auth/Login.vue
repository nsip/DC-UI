<template>
<q-page class="card-postion">
    <div class="row card" style="margin:100px auto; height:600px; width:1000px">
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 background">
            <div style="color:white">
                <h5>Welcome back :)</h5>
            </div>
        </div>
        <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 sign-up">
            <div>
                <img src="../../assets/115.jpg" style="height:100px; width:100px">
                <h6></h6>
            </div>
            <div style="margin-top:30px">
                <q-input
                    color="deep-purple-9"
                    v-model="email" type="email"
                    :before="[{icon: 'mail'}]"
                    float-label="Enter your email address" />
                <q-input color="deep-purple-9" v-model="password" type="password" :before="[{icon: 'fas fa-unlock'}]" float-label="Enter your password" />
                <div style="margin-top: 20px">
                    <!--
                    <q-checkbox color="deep-purple-9" />
                    -->
                    <a href="">Fogotten your password?</a>
                </div>
            </div>
            <div style="text-align: center; margin-top:80px">
                <q-btn icon="fas fa-sign-in-alt" label="Log in" style="width: 50%" color="deep-purple-9" to="/dashboard"/>
            </div>
            <div style="text-align:center; margin-top:20px">
                <router-link to="/auth/register"><a>Create a new account?</a></router-link>
            </div>
            </div>
    </div>
</q-page>
</template>
<script>
// import createCaptcha from '../../utils/createCaptcha'
export default {
// data() {
//     return {
//         // captcha
//         captchaTpl: ''
//     }
// },
// created() {
//     this.getCaptcha()
// },
// methods: {
//     getCaptcha() {
//         const { tpl, capt }
//     }
// }
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
a {
    font-size: 11px
}
.card {
    background-color: white;
    border:1px solid rgb(185, 172, 202);
    border-radius:10px;
    box-shadow: 2px 2px 2px #888888;
}
.sign-up {
     padding: 100px 50px 100px 10px;
}
</style>
