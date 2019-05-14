<template>
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 q-ma-sm">
    <div v-for="lesson in lessons" :key="lesson.lessonId">
        <q-card inline class="course-card" text-color="dark">
            <q-card-title class="text-deep-purple-6">
                <b>{{lesson.thecourse}}</b>
                <span slot="subtitle">Learning Area: {{lesson.thearea}} | Subject: {{lesson.thesubject}} | Stage: {{lesson.thestage}}</span>
                <q-btn round flat icon="fas fa-edit" slot="right" color="deep-purple-6" :to="{name: 'modify', params:{ lessonId: lesson.lessonId, username: username, lesson }}">
                    <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    Modify
                    </q-tooltip>
                </q-btn>
                <q-btn round flat icon="fas fa-calendar-plus" slot="right" color="deep-purple-6" :to="{name: 'schedule', params:{ lessonId: lesson.lessonId, username: username }}">
                    <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    Add Schedule
                    </q-tooltip>
                </q-btn>
                <q-btn round flat icon="fas fa-trash-alt" slot="right" color="deep-purple-6" @click="deleteLesson(lesson.lessonId)">
                    <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                    Delete
                    </q-tooltip>
                </q-btn>
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
</template>

<script>
export default {
  props: ['lessons', 'username'],
  data () {
    return {
      blockRemoval: false
    }
  },
  methods: {
    deleteLesson (index) {
      this.$q.dialog({
        title: 'Comfirm',
        message: 'Are you sure to delete this lesson?',
        color: 'deep-purple-6',
        ok: true,
        cancel: true
      }).then(() => {
        this.$store.dispatch('user/deleteLesson', index)
      }).catch(() => {})
    }
    // remove (index) {
    //   this.$store.dispatch('user/deleteschdule', index)
    // }
    // deletethis (index) {
    //   this.$store.dispatch('user/deleteschdule', index)
    // }
  }
}
</script>
