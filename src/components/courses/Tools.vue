<template>
    <div>
        <h6><b>Tools</b></h6>
        <div class="row">
            <q-card inline class="q-ma-sm" v-for="tool in Overview.tools" :key="tool.name">
                <q-card-title>
                    <b>{{tool.name}}</b>
                </q-card-title>
                <q-card-main>
                    <ul>
                        <li v-for="example in tool.examples" :key="example">{{example}}</li>
                    </ul>
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
ul{
    list-style:square;
    text-align: justify;
}
li {
    margin: 10px
}
.q-card {
    width: 100%;
    transition: background-color 1.5s, color 1.5s;
    cursor: default
}
.q-card:hover {
    background-color: #d1c4e9;
    color:#673ab7;
    /* box-shadow: */
}
</style>
