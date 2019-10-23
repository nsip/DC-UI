<template>
    <div class="skill">
        <h6><b>Skills</b></h6>
            <q-list v-for="inquiry_skill in resultOverview.inquiry_skills" :key="inquiry_skill.name">
                <q-list-header>
                        <b>{{inquiry_skill.name}}</b>
                    </q-list-header>
                <q-item>
                    <q-item-main class="text-dark">
                        <ul>
                            <li v-for="skill in inquiry_skill.skills" :key="skill.skill">
                                {{skill.skill}}
                            </li>
                        </ul>
                    </q-item-main>
                </q-item>
            </q-list>
    </div>
</template>
<script>
export default {
  props: ['resultOverview']

}
</script>
