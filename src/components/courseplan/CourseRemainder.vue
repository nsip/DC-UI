<template>
    <div>
        <div class="reminder">
            <q-card class="reminder-list" text-color="dark">
                <q-card-title class="reminder-title">
                    <b>Syllabus Summary</b>
                </q-card-title>
                <q-card-separator inset />
                <q-list style="max-height:703">
                    <q-list-header class="reminder-header">
                        <i class="fas fa-chalkboard" />
                        {{coursename}}
                    </q-list-header>
                    <div class="fix-hight">
                        <q-item v-for="detail in course.content_areas" :key="detail.name">
                            <q-item-main>{{detail.name}}</q-item-main>
                        </q-item>
                    </div>
                    <q-item-separator />
                    <q-list-header class="reminder-header">
                        <i class="far fa-file-alt" />
                        The Concepts
                    </q-list-header>
                    <div class="fix-hight">
                        <q-item v-for="concept in resultOverview.concepts" :key="concept.name">
                            <q-item-main>{{concept.name}}</q-item-main>
                        </q-item>
                    </div>
                    <q-item-separator />
                    <q-list-header class="reminder-header">
                        <i class="fas fa-atom" />
                        The Skills
                    </q-list-header>
                    <div class="fix-hight">
                        <q-item v-for="skill in resultOverview.inquiry_skills" :key="skill.name">
                            <q-item-main>{{skill.name}}</q-item-main>
                        </q-item>
                    </div>
                    <q-item-separator />
                    <q-list-header class="reminder-header">
                        <i class="fas fa-hammer" />
                        The Tools
                    </q-list-header>
                    <div class="fix-hight">
                        <q-item v-for="tool in resultOverview.tools" :key="tool.name">
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
    props: ['course', 'resultOverview', 'coursename', 'selectedarea', 'selectedcourse', 'selectedstage'],
    data: () => {
        return {
            Overview: [],
            Content: [],
            coursecontent: []
        }
    },
    created() {
    }
}
</script>