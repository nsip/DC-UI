<template>
    <div>
        <h6><b>Unit Focus</b></h6>
        <p>{{course.focus}}</p>
        <h6><b>Key Inquiry questions</b></h6>
            <q-list v-for="injury in course.inquiry_questions" :key="injury">
                <q-item>
                    <q-item-main>
                        {{injury}}
                    </q-item-main>
                </q-item>
                <!--
                <q-item>
                    <q-item-main>
                        How does migration impact on the concentration of people into urban places?
                    </q-item-main>
                </q-item>
                <q-item-separator />
                <q-item>
                    <q-item-main>
                        How does urbanisation change environments and places?
                    </q-item-main>
                </q-item>
                <q-item-separator />
                <q-item>
                    <q-item-main>
                        What strategies are used to manage environmental change in urban places to enhance sustainability?
                    </q-item-main>
                </q-item>
                -->
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
