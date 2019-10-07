<template>
    <div class="header">
    <q-layout-header reveal @scroll="handleSCroll">
      <!-- <q-toolbar color="white" :inverted= "$q.theme === 'mat' & 'ios'"> -->
      <q-toolbar color="white" :inverted='true'>        
        <q-btn
          flat
          dense
          round
          color="deep-purple-7"
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          <a href="/" style="color:white; text-decoration-line: none">
           <img src="../assets/digital-classroom-copy.png">
          </a>
          <div slot="subtitle"></div>
        </q-toolbar-title>
        <div v-if="auth">
            <!-- <q-btn
                flat
                color="deep-purple-7"
                size="md"
                icon="fas fa-user"
                :label="user.name" /> -->
                <q-btn
                  flat
                  color="purple-14"
                  size="md"
                  rounded
                  class="log-btn"
                  @click="$router.push({ name: 'dashboard', params: { username: user.name } })">
                  <img src="../assets/crown.png">
                  <p>My Dashboard</p>
                </q-btn>
                <!-- <span v-if="user.name">{{ user.name }}</span> -->
            <q-btn
                outline
                color="purple-14"
                size="md"
                rounded
                class="log-btn"
                @click="logout" >
                  <img src="../assets/logout.png">
                  <p>Logout</p>
            </q-btn>
        </div>
        <div v-else>
          <q-btn
            class="q-ma-sm log-btn"
            flat
            rounded
            color="purple-14"
            @click="$router.push('/auth/register')">
            <img src="../assets/register-2.png">
            <p>Register</p>
          </q-btn>
        <q-btn
            class="q-ma-sm log-btn"
            outline
            rounded
            color="purple-14"
            @click="$router.push('/auth/login')">
            <img src="../assets/login-2.png">
            <p>Login</p>
        </q-btn>
        </div>
      </q-toolbar>
    </q-layout-header>
    <!-- <q-layout-footer class="footer-container">
    <div class="row footer">
      <div class="col-3">1</div>
      <div class="col-3">2</div>
      <div class="col-3">3</div>
      <div class="col-3">4</div>
    </div>
  </q-layout-footer> -->
    <q-layout-drawer
      v-model="leftDrawerOpen"
      persistent="false"
      :content-class="['bg-white', 'q-pa-sm']"
      class="leftdrawer"
      :width='300'
    >
      <q-list
        no-border
        link
        inset-delimiter
        class="drawer"
      >
        <q-list-header style="text-align:center; padding: 0px">
          <img src="../assets/logo-2.jpg">
          <!-- <i class="fab fa-reddit" style="font-size:20px"></i>
          <i class="fab fa-reddit" style="font-size:15px"></i> -->
        </q-list-header>
        <!-- <q-item @click.native="$router.push('/scope&sequnce')" style="margin-top:50px">
          <q-item-side icon="fas fa-graduation-cap" />
          <q-item-main label="Scope & Sequence" />
        </q-item> -->
        <q-list-header />
        <q-list-header v-if="auth">
          <div class="user">
            <img src="https://img.icons8.com/dusk/64/000000/son-goku.png">
            <p>Hello, {{user.name}} !</p>
          </div>
        </q-list-header>
        <q-list-header v-else>
          <div class="user">
            <img src="../assets/login.png">
            <p>Please Login First</p>
          </div>
        </q-list-header>
        <q-item @click.native="$router.push({ name: 'scopeandsequnce', params: { username: user.name } })">
          <q-item-side><img src="../assets/sequece.png"></q-item-side>
          <q-item-main label="Scope & Sequence" />
        </q-item>
        <q-item @click.native="$router.push({ name: 'coursesummary', params: { username: user.name } })">
          <q-item-side><img src="../assets/summary.png"></q-item-side>
          <q-item-main label="Course Summary" />
        </q-item>
        <q-item @click.native="$router.push({ name: 'dashboard', params: { username: user.name } })">
          <q-item-side><img src="../assets/crown-2.png"></q-item-side>
          <q-item-main label="My Dashboard" />
        </q-item>
        <!-- <q-item @click.native="$router.push('/account-setting')">
          <q-item-side icon="fas fa-republican" />
          <q-item-main label="Account Setting" />
        </q-item> -->
        <!--
        <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
          <q-item-side icon="chat" />
          <q-item-main label="Discord Chat Channel" sublabel="https://discord.gg/5TDhbDg" />
        </q-item>
        <q-item @click.native="openURL('http://forum.quasar-framework.org')">
          <q-item-side icon="record_voice_over" />
          <q-item-main label="Forum" sublabel="forum.quasar-framework.org" />
        </q-item>
        <q-item @click.native="openURL('https://twitter.com/quasarframework')">
          <q-item-side icon="rss feed" />
          <q-item-main label="Twitter" sublabel="@quasarframework" />
        </q-item>
        -->
      </q-list>
    </q-layout-drawer>
    </div>
</template>

<script>
// import Entry from '../components/Entry.vue'
export default {
  name: 'MyLayout',
  props: ['username'],
  // components: {
  //   appEntry: Entry
  // },
  data () {
    return {
      leftDrawerOpen: false,
      miniState: false,
      transitionName: 'slide-left'
      // localuser: undefined
    }
  },
  // created () {
  //   this.localuser = this.$store.state.user.user
  //   console.log(this.localuser)
  //   console.log(this.username)
  // },
  computed: {
    auth () {
      return this.$store.state.user.auth
    },
    user () {
      return this.$store.state.user.user
    }
  },
  methods: {
    logout () {
      this.$q.dialog({
        title: 'Comfirm',
        message: 'Are you sure to log out?',
        color: 'deep-purple-6',
        ok: true,
        cancel: true
      }).then(() => {
        this.$store.dispatch('user/logout')
      }).catch(() => {})
    },
    handleSCroll (event) {
      let header = document.querySelector('.q-layout-header')
      if (window.scrollY > 100 && !header.className.includes('act')) {
        header.classList.add('act')
      } else if (window.scrollY < 100) {
        header.classList.remove('act')
      }
    }
  },
  watch: {
    mask () {
      if (this.leftDrawerOpen === true) {
        console.log('mask')
      }
    }
  },
  created () {
    window.addEventListener('scroll', this.handleSCroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleSCroll)
  },
  beforeRouteUpdate (to, from, next) {
  // if isBack = true，user click back，slide-right transition
    let isBack = this.$router.isBack
    if (isBack) {
      this.transitionName = 'slide-right'
    } else {
      this.transitionName = 'slide-left'
    }
    // set back
    this.$router.isBack = false
    next()
  }
  // methods: {
  //   openURL
  // }
}
</script>
<style scoped>
.q-btn {
  margin-right: 5px;
}
</style>
