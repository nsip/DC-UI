<template>
    <div>
        <h6><b>Skills</b></h6>
            <q-list v-for="inquiry_skill in Overview.inquiry_skills" :key="inquiry_skill.name">
                <q-list-header>
                        <b>{{inquiry_skill.name}}</b>
                    </q-list-header>
                <q-item>
                    <q-item-main>
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
  props: ['Overview']

}
</script>

<style scoped>
h6 {
    margin-bottom: 20px;
    color: rgb(117, 117, 117)
}
li {
    margin: 10px;
}
ul {
    text-align: justify;
    list-style: none
}
.q-list {
    margin-top: 10px
}
</style>
