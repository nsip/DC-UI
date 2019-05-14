<template>
    <div class="course">
        <h6><b>Outcomes</b></h6>
            <div class="outcome-list" v-for="outcome in course.outcomes" :key="outcome.id">
                <q-list>
                <q-item>
                    <q-item-side>
                        <q-item-tile>
                            {{outcome.id}}
                        </q-item-tile>
                    </q-item-side>
                    <q-item-main class="text-dark">
                        A student {{outcome.description}}
                    </q-item-main>
                </q-item>
                <q-item-separator inset/>
                </q-list>
            </div>
    </div>
</template>

<script>
export default {
  props: ['course']
}
</script>
