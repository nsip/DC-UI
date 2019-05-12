<template>
    <div>
    <q-layout-header reveal>
      <q-toolbar
        color="grey-11"
        :inverted="$q.theme === 'mat' & 'ios'"
      >
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
            <q-btn
                flat
                color="deep-purple-7"
                size="md"
                icon="fas fa-user"
                :label="user.name" />
                <q-btn
                  flat
                  color="deep-purple-7"
                  size="md"
                  label="My Dashboard"
                  icon="fas fa-crown"
                  @click="$router.push({ name: 'dashboard', params: { username: user.name } })"/>
                <!-- <span v-if="user.name">{{ user.name }}</span> -->
            <q-btn
                outline
                color="deep-purple-7"
                size="md"
                label="Logout"
                icon="fas fa-sign-in-alt"
                @click="logout" />
        </div>
        <div v-else>
          <q-btn
            class="q-ma-sm"
            flat
            color="deep-purple-7"
            label="Register"
            icon="fas fa-user-plus"
            @click="$router.push('/auth/register')"
          />
        <q-btn
            class="q-ma-sm"
            outline
            color="deep-purple-7"
            label="Login"
            icon="fas fa-sign-in-alt"
            @click="$router.push('/auth/login')"
            >
        </q-btn>
        </div>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="['bg-grey-11', 'q-pa-sm']"
      class="leftdrawer"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header style="text-align:center; margin-top:30px">
          <i class="fab fa-reddit" style="font-size:55px"></i>
          <i class="fab fa-reddit" style="font-size:45px"></i>
          <i class="fab fa-reddit" style="font-size:35px"></i>
          <i class="fab fa-reddit" style="font-size:20px"></i>
          <i class="fab fa-reddit" style="font-size:15px"></i>
        </q-list-header>
        <!-- <q-item @click.native="$router.push('/scope&sequnce')" style="margin-top:50px">
          <q-item-side icon="fas fa-graduation-cap" />
          <q-item-main label="Scope & Sequence" />
        </q-item> -->
        <q-item @click.native="$router.push({ name: 'scopeandsequnce', params: { username: user.name } })">
          <q-item-side icon="fas fa-republican" />
          <q-item-main label="Scope & Sequence" />
        </q-item>
        <q-item @click.native="$router.push({ name: 'coursesummary', params: { username: user.name } })">
          <q-item-side icon="fas fa-republican" />
          <q-item-main label="Course Summary" />
        </q-item>
        <q-item @click.native="$router.push({ name: 'dashboard', params: { username: user.name } })">
          <q-item-side icon="fas fa-republican" />
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
      this.$store.dispatch('user/logout')
    }
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
