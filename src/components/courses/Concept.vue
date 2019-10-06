<template>
    <div class="concept">
        <h6><b>Concepts</b></h6>
        <div class="row" v-for="concept in resultOverview.concepts" :key="concept.name">
            <q-card inline class="q-ma-sm">
                <q-card-title>
                    <b>{{concept.name}}</b>
                </q-card-title>
                <q-card-main>
                    {{concept.description}}
                </q-card-main>
            </q-card>
        </div>
    </div>
</template>

<script>
export default {
  props: ['resultOverview']
  // props: ['course']
}
</script>
