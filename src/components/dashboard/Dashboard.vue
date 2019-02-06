<template>
    <q-page>
        <h4 style="margin-left:50px; margin-top: 100px; color:gray">
            <b>My Dashboard</b>
            <i class="fas fa-tachometer-alt q-ma-md"></i>
            </h4>
        <hr style="color:gray">
        <div class="dashboard">
            <q-card class="q-ma-sm">
                <q-card-media>
                    <q-parallax src="../../assets/gray-background.jpg" :height="300">
                        <div slot="loading">Loading...</div>
                    </q-parallax>
                </q-card-media>
            </q-card>
            <div class="q-ma-sm">
            <h5 class="course-list-title" style="margin-bottom: 20px">
                <b>My Course List</b>
                <i class="fas fa-chalkboard-teacher q-ma-sm"></i>
            </h5>
            <hr>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <q-card inline class="q-ma-sm course-list">
                        <q-card-title>
                            <b>Course Name</b>
                            <span slot="subtitle">Learning Area: HISE | Subject: Geography | Stage: 3</span>
                            <q-btn round flat icon="more_vert" slot="right" color="deep-purple-6">
                            <q-popover>
                                <q-list link class="no-border">
                                <q-item v-close-overlay>
                                    <q-item-main label="Modify Course" />
                                </q-item>
                                <q-item v-close-overlay>
                                    <q-item-main label="Remove" />
                                </q-item>
                                </q-list>
                            </q-popover>
                            </q-btn>
                        </q-card-title>
                        <q-card-separator />
                          <q-card-main>
                            Course information:
                            The significance of the environment in human life, and the important interrelationships between humans and the environment eg natural and human features of a place
                        </q-card-main>
                    </q-card>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <q-card inline class="q-ma-sm course-list">
                        <q-card-title>
                            <b>Course Name</b>
                            <span slot="subtitle">Learning Area: HISE | Subject: Geography | Stage: 3</span>
                            <q-btn round flat icon="more_vert" slot="right" color="deep-purple-6">
                            <q-popover>
                                <q-list link class="no-border">
                                <q-item v-close-overlay>
                                    <q-item-main label="Modify Course" />
                                </q-item>
                                <q-item v-close-overlay>
                                    <q-item-main label="Remove" />
                                </q-item>
                                </q-list>
                            </q-popover>
                            </q-btn>
                        </q-card-title>
                        <q-card-separator />
                          <q-card-main>
                            Course information:
                            The significance of the environment in human life, and the important interrelationships between humans and the environment eg natural and human features of a place
                        </q-card-main>
                    </q-card>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <q-card inline class="q-ma-sm course-list">
                        <q-card-title>
                            <b>Course Name</b>
                            <span slot="subtitle">Learning Area: HISE | Subject: Geography | Stage: 3</span>
                            <q-btn round flat icon="more_vert" slot="right" color="deep-purple-6">
                            <q-popover>
                                <q-list link class="no-border">
                                <q-item v-close-overlay>
                                    <q-item-main label="Modify Course" />
                                </q-item>
                                <q-item v-close-overlay>
                                    <q-item-main label="Remove" />
                                </q-item>
                                </q-list>
                            </q-popover>
                            </q-btn>
                        </q-card-title>
                        <q-card-separator />
                          <q-card-main>
                            Course information:
                            The significance of the environment in human life, and the important interrelationships between humans and the environment eg natural and human features of a place
                        </q-card-main>
                    </q-card>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import CourseList from './CourseList.vue'
import Setting from './Setting.vue'
export default {
  props: ['email'],
  components: {
    appCourseList: CourseList,
    appSetting: Setting
  },
  data () {
    return {
      selectedComponent: 'appCourseList'
    }
  }
}
</script>

<style scope>
.dashboard {
    padding: 50px 200px;
}
.dashboard h4{
    color: gray
}
.course-list-title{
  color: gray
}
.card-link {
    cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 0;
    position: relative
}
.card-link:before,
.card-link:after {
    content: "";
    width: 0;
    height: 2px;
    background: #4527a0; /*underline color*/
    position: absolute;
    top: 100%;
    left: 50%;
    transition: all .8s ;
}
.card-link:hover:before{
    left:0%;
    width:50%;
}
.card-link:hover:after{
    width: 50%;
}
.card-link:hover,
.card-link:active {
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.course-list{
    transition: background-color 1.5s, color 1.5s;
    cursor: default
}
.course-list:hover {
    background-color: #d1c4e9;
    color:#673ab7;
    /* box-shadow: */
}
</style>
