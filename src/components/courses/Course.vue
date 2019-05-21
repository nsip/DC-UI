<template>
    <div class="course">
        <h6><b>Unit Focus</b></h6>
        <p style="color:#424242">{{course.focus}}</p>
        <hr class="dot">
        <h6><b>Key Inquiry questions</b></h6>
            <q-list class="text-dark">
                <q-item v-for="injury in course.inquiry_questions" :key="injury">
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
