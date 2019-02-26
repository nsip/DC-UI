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
                <q-item v-for="detail in course.content_areas" :key="detail">{{detail.name}}</q-item>
            <q-item-separator />
            <q-list-header>
                The Tools
            </q-list-header>
                <q-item v-for="concept in Overview.concepts" :key="concept.name">
                    {{concept.name}}
                </q-item>
            <q-item-separator />
            <q-list-header>
                The Skills
            </q-list-header>
            <q-item-separator />
            <q-list-header>
                The Concepts
            </q-list-header>
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
b{
    color: gray;
}
.reminder {
    margin-top:0px
}
.reminder p{
    color: gray
}
</style>
