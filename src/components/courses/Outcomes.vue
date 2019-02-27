<template>
    <div>
        <h6><b>Outcomes</b></h6>
            <div class="outcome-list" v-for="outcome in course.outcomes" :key="outcome.id">
                <q-list>
                    <!--
                    <q-list-header>
                        A student:
                    </q-list-header>
                    -->
                <q-item>
                    <q-item-side>
                        <q-item-tile>
                            {{outcome.id}}
                        </q-item-tile>
                    </q-item-side>
                    <q-item-main>
                        A student {{outcome.description}}
                    </q-item-main>
                </q-item>
                <q-item-separator inset/>
                <!--
                    <q-item>
                    <q-item-side>
                        <q-item-tile>
                            GE5-3
                        </q-item-tile>
                    </q-item-side>
                    <q-item-main>
                        Analyses the effect of interactions and connections between people, places and environments
                    </q-item-main>
                </q-item>
                <q-item-separator inset/>
                                <q-item>
                    <q-item-side>
                        <q-item-tile>
                            GE5-5
                        </q-item-tile>
                    </q-item-side>
                    <q-item-main>
                        Assesses management strategies for places and environments for their sustainability
                    </q-item-main>
                </q-item>
                <q-item-separator inset/>
                                <q-item>
                    <q-item-side>
                        <q-item-tile>
                            GE5-6
                        </q-item-tile>
                    </q-item-side>
                    <q-item-main>
                        Analyses differences in human wellbeing and ways to improve human wellbeing
                    </q-item-main>
                </q-item>
                <q-item-separator inset/>
                                <q-item>
                    <q-item-side>
                        <q-item-tile>
                            GE5-7
                        </q-item-tile>
                    </q-item-side>
                    <q-item-main>
                        Acquires and processes geographical information by selecting and using appropriate and relevant geographical tools for inquiry
                    </q-item-main>
                </q-item>
                <q-item-separator inset/>
                -->
                </q-list>
            </div>
            <!-- <h6><b>Related Life Skills outcomes</b></h6>
            <div class="row">
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 skill-outcome" v-for="lifeskill in course.lifeskills_outcomes" :key="lifeskill">
                <q-card inline class="q-ma-sm">
                    <q-card-main>
                        {{lifeskill}}
                    </q-card-main>
                </q-card>
            </div>
            </div> -->
            <!--
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 skill-outcome">
            <q-card inline class="q-ma-sm">
                <q-card-main>
                    GELS-2
                </q-card-main>
            </q-card>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 skill-outcome">
            <q-card inline class="q-ma-sm">
                <q-card-main>
                    GELS-6
                </q-card-main>
            </q-card>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 skill-outcome">
            <q-card inline class="q-ma-sm">
                <q-card-main>
                    GELS-7
                </q-card-main>
            </q-card>
            </div>
            <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 skill-outcome">
            <q-card inline class="q-ma-sm">
                <q-card-main>
                    GELS-8
                </q-card-main>
            </q-card>
            </div>
            -->
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
