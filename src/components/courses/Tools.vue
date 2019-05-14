<template>
    <div class="tool">
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
