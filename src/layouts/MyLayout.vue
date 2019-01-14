<template>
<div class="body">
  <q-layout view="hHh Lpr lFf">
    <app-header></app-header>
    <!--
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
      </q-list>
    </q-layout-drawer>
    -->
    <q-page-container>
      <transition :name="transitionName" mode="out-in">
         <keep-alive>
           <router-view v-if="$route.meta.keepAlive" class="child-view"></router-view>
         </keep-alive>
      </transition>
      <transition :name="transitionName" mode="out-in">
          <router-view v-if="!$route.meta.keepAlive" class="child-view"></router-view>
      </transition>
    </q-page-container>
     <vue-particles
        color="#dedede"
        :particleOpacity="1"
        :particlesNumber="100"
        shapeType="polygon"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1.5"
        :lineLinked="true"
        :lineOpacity="0.8"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push">
    </vue-particles>
  </q-layout>
</div>
</template>

<script>
// import { openURL } from 'quasar'
// import Entry from '../components/Entry.vue'
import Header from './Header.vue'

export default {
  name: 'MyLayout',
  components: {
  //   appEntry: Entry
    appHeader: Header
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

<style>
body {
  /* font-family:Arial,Helvetica,sans-serif;
  font-size:100%; */
  height: 100%;
  width: 100%;
  background-color:whitesmoke;
  font-family: Verdana, Geneva, sans-serif;
  font-size: 16px;
}
.body {
  height: 100%;
  width: 100%;
}
.child-view {
   position: absolute;
   width:100%;
   transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
   opacity: 0;
   -webkit-transform: translate(50px, 0);
   transform: translate(50px, 0);
}
.slide-left-leave-active, .slide-right-enter {
   opacity: 0;
   -webkit-transform: translate(-50px, 0);
   transform: translate(-50px, 0);
}
/* Logo */
.fa-reddit {
  color: #9575cd;
}
.fa-graduation-cap{
  color: rgb(119, 83, 185)
}
.fa-republican {
  color: rgb(152, 90, 194)
}
#particles-js{
  height: 1000px;
  width: 100%
}
</style>
