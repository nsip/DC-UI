<template>
    <div>
        <div class="reminder">
            <q-card>
            <q-card-title>
                <b>The content must be included</b>
            </q-card-title>
            <q-card-separator inset/>
            <q-list>
                <q-list-header>
                    Course Name
                </q-list-header>
                <div class="fix-hight">
                    <q-item v-for="detail in course.content_areas" :key="detail">
                        <q-item-main>{{detail.name}}</q-item-main>
                    </q-item>
                </div>
                <q-item-separator />
                <q-list-header>
                    The Tools
                </q-list-header>
                <div class="fix-hight">
                <q-item v-for="concept in Overview.concepts" :key="concept.name">
                    <q-item-main>{{concept.name}}</q-item-main>
                </q-item>
                </div>
                <q-item-separator />
                <q-list-header>
                    The Skills
                </q-list-header>
                <div class="fix-hight">
                    <q-item v-for="skill in Overview.inquiry_skills" :key="skill.name">
                        <q-item-main>{{skill.name}}</q-item-main>
                    </q-item>
                </div>
                <q-item-separator />
               <q-list-header>
                  The Concepts
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
  props: ['course', 'selectedarea', 'selectedcourse', 'selectedstage'],
  data: () => {
    return {
      Overview: []
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
      console.log(result.data.data)
    })
  }
}
</script>
<style scoped>
b {
    color: gray;
}
.reminder {
    margin-top:0px
}
.reminder p{
    color: gray
}
.fix-hight {
    max-height: 103px;
    overflow: scroll
}
</style>
