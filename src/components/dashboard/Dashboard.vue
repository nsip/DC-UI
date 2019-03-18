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
            <div class="row q-ma-sm">
                <div v-for="lesson in lessons" :key="lesson.lessonId" class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <q-card inline class="course-card">
                        <q-card-title>
                            <b>{{lesson.thecourse}}</b>
                            <span slot="subtitle">Learning Area: {{lesson.thearea}} | Subject: {{lesson.thesubject}} | Stage: {{lesson.thestage}}</span>
                            <q-btn round flat icon="fas fa-edit" slot="right" color="deep-purple-6" @click="editLesson"/>
                            <q-btn round flat icon="fas fa-trash-alt" slot="right" color="deep-purple-6" @click="deleteLesson(lesson.lessonId)" />
                        </q-card-title>
                        <q-card-separator />
                          <q-card-main>
                            <q-list>
                                <q-item>
                                    <q-item-side>
                                        <q-item-tile>
                                            Lesson Description
                                        </q-item-tile>
                                    </q-item-side>
                                    <q-item-main>
                                        <q-item-tile label>{{lesson.thedescription}}</q-item-tile>
                                    </q-item-main>
                                </q-item>
                            </q-list>
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
      selectedComponent: 'appCourseList',
      lessons: []
    }
  },
  created () {
    console.log(this.$store.state.user.lessons)
    // this.lessons = this.$store.state.user.lessons[24]
    this.lessons = this.$store.state.user.lessons
    // const lessonId = this.$route.params.lessonId
    // console.log(this.$route.params.lessonId)
    // console.log(this.$store.getters.user.getLessonById(2))
  },
  methods: {
    deleteLesson (index) {
      this.$store.dispatch('user/deleteLesson', index)
      console.log(index)
      console.log(this.$store.state.user.lessons)
    },
    editLesson () {
      this.$router.push({ name: 'courseplaner', params: { lessonId: this.lessonId } })
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
/* .card-link:before,
.card-link:after {
    content: "";
    width: 0;
    height: 2px;
    background: #4527a0;
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
} */
.course-card {
    width: 100%;
    background-color: white;
    /* transition: background-color 1.5s, color 1.5s; */
    cursor: default;
    border: whitesmoke 1px solid;
    box-shadow: none;
    transition: box-shadow 1s, border 1s;
}
.course-card:hover {
  box-shadow: 0 5px 5px rgba(0,0,0,0.2), 0 5px 5px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);
  border: whitesmoke 1px solid
}
/* .course-list:hover {
    background-color: #d1c4e9;
    color:#673ab7;
} */
</style>
