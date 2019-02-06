<template>
    <div>
            <q-layout-header style="box-shadow:none">
      <q-toolbar
        color="deep-purple-9"
        :inverted="$q.theme === 'mat' & 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          <a href="/" style="color:white; text-decoration-line: none">
            App
          </a>
          <div slot="subtitle"></div>
        </q-toolbar-title>
          <app-entry></app-entry>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="['bg-whitesmoke', 'q-pa-sm']"
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
        <q-item @click.native="$router.push('/scope&sequnce')" style="margin-top:50px">
          <q-item-side icon="fas fa-graduation-cap" />
          <q-item-main label="Scope & Sequence" />
        </q-item>
        <q-item @click.native="$router.push('/coursesummary')">
          <q-item-side icon="fas fa-republican" />
          <q-item-main label="Course Summary" />
        </q-item>
        <q-item @click.native="$router.push('/dashboard')">
          <q-item-side icon="fas fa-republican" />
          <q-item-main label="My Dashborad" />
        </q-item>
        <q-item @click.native="$router.push('/account-setting')">
          <q-item-side icon="fas fa-republican" />
          <q-item-main label="Account Setting" />
        </q-item>
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
import Entry from '../components/Entry.vue'
export default {
  name: 'MyLayout',
  components: {
    appEntry: Entry
  },
  data () {
    return {
      leftDrawerOpen: false,
      transitionName: 'slide-left'
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
