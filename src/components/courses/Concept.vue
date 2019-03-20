<template>
    <div>
        <h6><b>Concepts</b></h6>
        <div class="row">
            <q-card inline class="q-ma-sm" v-for="concept in Overview.concepts" :key="concept.name">
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
  props: ['Overview']
}
</script>

<style scoped>
h6 {
    margin-bottom: 20px;
    color: rgb(117, 117, 117)
}
.q-card {
    width: 100%;
    transition: background-color 1.5s, color 1.5s;
    color: #424242;
    cursor: default
}
.q-card:hover {
    background-color: #d1c4e9;
    color:#673ab7;
    /* box-shadow: */
}
</style>
