<template>
    <div>
        <div class="reminder">
            <q-card class="reminder-list" text-color="dark">
            <q-card-title class="reminder-title">
                <b>The content must be included</b>
            </q-card-title>
            <q-card-separator inset/>
            <q-list style="max-height:703">
                <q-list-header class="reminder-header">
                    <i class="fas fa-chalkboard" />
                    {{coursename}}
                </q-list-header>
                <div class="fix-hight">
                    <q-item v-for="detail in coursecontent" :key="detail">
                        <q-item-main>{{detail.name}}</q-item-main>
                    </q-item>
                </div>
                <q-item-separator />
                <q-list-header class="reminder-header">
                    <i class="far fa-file-alt" />
                    The Concepts
                </q-list-header>
                <div class="fix-hight">
                <q-item v-for="concept in Overview.concepts" :key="concept.name">
                    <q-item-main>{{concept.name}}</q-item-main>
                </q-item>
                </div>
                <q-item-separator />
                <q-list-header class="reminder-header">
                    <i class="fas fa-atom" />
                    The Skills
                </q-list-header>
                <div class="fix-hight">
                    <q-item v-for="skill in Overview.inquiry_skills" :key="skill.name">
                        <q-item-main>{{skill.name}}</q-item-main>
                    </q-item>
                </div>
                <q-item-separator />
               <q-list-header class="reminder-header">
                   <i class="fas fa-hammer" />
                  The Tools
                </q-list-header>
                <div class="fix-hight">
                    <q-item v-for="tool in Overview.tools" :key="tool.name">
                        <q-item-main>{{tool.name}}</q-item-main>
                    </q-item>
                </div>
            </q-list>
            </q-card>
        </div>
    </div>
</template>
<script>
export default {
  props: ['course', 'coursename', 'selectedarea', 'selectedcourse', 'selectedstage'],
  data: () => {
    return {
      Overview: [],
      Content: [],
      coursecontent: []
    }
  },
  mounted () {
    const axios = require('axios')
    axios({
      url: 'http://localhost:1330/graphql',
      method: 'post',
      data: {
        query: `query ContentQuery($state: String!, $learning_area: String!, $subject: String!, $stage: String!) {
                overview(state: $state, learning_area: $learning_area, subject: $subject, stage: $stage){
                    concepts {
                        name
                    }
                    inquiry_skills {
                        name
                    }
                    tools {
                        name
                    }
                }
                content(state: $state, learning_area: $learning_area, subject: $subject, stage: $stage){
                    courses {
                        name
                        content_areas {
                            name
                        }
                    }
                }
            }`,
        variables: {
          state: 'nsw',
          learning_area: this.selectedarea,
          subject: this.selectedcourse,
          stage: this.selectedstage
        }
      }
    }).then((result) => {
      this.Overview = result.data.data.overview
      this.Content = result.data.data.content.courses
      // console.log(this.Content)
      var i
      for (i = 0; i < this.Content.length; i++) {
        if (this.coursename === this.Content[i].name) {
          this.coursecontent = this.Content[i].content_areas
        }
      }
    })
  }
}
</script>
<style scoped>
b {
    color:#311b92;
}
.reminder {
    margin-top:0px
}
.reminder-list {
    box-shadow: none;
    border: 1px solid #e0e0e0;
    transition: box-shadow 1.5s;
}
.reminder-list:hover {
    box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)
}
.reminder p{
    color: gray
}
.fix-hight {
    max-height: 117px;
    overflow: scroll
}
.reminder-header i {
    margin-right: 5px;
    color: #ffc107;
}
.reminder-header {
    max-height: 48px;
    overflow: scroll
}
.reminder-title {
    max-height: 64px;
    overflow: scroll
}
</style>
