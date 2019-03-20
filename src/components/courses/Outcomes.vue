<template>
    <div>
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

<style scoped>
h6{
    margin-bottom: 20px;
    color: rgb(117, 117, 117)
}
.q-list {
    position: relative
}
.q-list:before, .q-list:after {
    content:"";
    display:block;
    width: 0;
    height:0;
    border:1px solid transparent;
    box-sizing: border-box;
    position: absolute;
}
.q-list:before {
    top:0;
    left:0;
    transition: border-color 0s ease-in 0.8s,width 0.2s ease-in 0.6s,height 0.2s ease-in 0.4s;
}
.q-list:after {
    right:0;
    bottom:0;
    transition: border-color 0s ease-in 0.4s,width 0.2s ease-in 0.2s,height 0.2s ease-in ;
}
.q-list:hover:before {
    width:100%;
    height:100%;
    transition:width 0.2s ease-in ,height 0.2s ease-in 0.2s;
    border-top-color:#673ab7;
    border-right-color:#673ab7;
    }
.q-list:hover:after {
    width:100%;
    height:100%;
    transition: border-color 0s ease-in 0.4s,width 0.2s ease-in 0.4s,height 0.3s ease-in 0.6s;
    border-bottom-color:#673ab7;
    border-left-color:#673ab7;
    }

.q-card {
    width: 100%;
    text-align: center;
    transition: background-color 1s;
}
.skill-outcome{
    padding: 0 2px;
    cursor: default
}
.q-card:hover {
    background-color: #673ab7;
    color:whitesmoke;
    /* box-shadow: */
}
</style>
