<template>
    <div>
        <h6><b>Unit Focus</b></h6>
        <p style="color:#424242">{{course.focus}}</p>
        <h6><b>Key Inquiry questions</b></h6>
            <q-list class="text-dark" v-for="injury in course.inquiry_questions" :key="injury">
                <q-item>
                    <q-item-main>
                        {{injury}}
                    </q-item-main>
                </q-item>
            </q-list>
    </div>
</template>

<script>
export default {
  props: ['course']
}
</script>

<style scoped>
h6{
    margin-bottom: 20px;
    color: rgb(117, 117, 117)
}
hr {
    width: 100%;
}
</style>
