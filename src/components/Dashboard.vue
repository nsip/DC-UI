<template>
    <div class=dashboard>
        <h4>Application</h4>
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <q-item @click.native="$router.push('/scope&sequnce')">
                    <q-card inline class="q-ma-sm">
                        <q-card-media>
                            <img src="../assets/dog.png">
                            <q-card-title slot="overlay">
                                Scope & Sequence
                            </q-card-title>
                        </q-card-media>
                        </q-card>
                </q-item>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <q-item href="">
                   <q-card inline class="q-ma-sm">
                    <q-card-media>
                        <img src="../assets/dog.png">
                        <q-card-title slot="overlay">
                            Title
                        </q-card-title>
                    </q-card-media>
                    </q-card>
                </q-item>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <q-item href="">
                    <q-card inline class="q-ma-sm">
                    <q-card-media>
                        <img src="../assets/dog.png">
                        <q-card-title slot="overlay">
                            Title
                        </q-card-title>
                    </q-card-media>
                    </q-card>
                </q-item>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <q-item href="">
                    <q-card inline class="q-ma-sm">
                    <q-card-media>
                        <img src="../assets/dog.png">
                        <q-card-title slot="overlay">
                            Title
                        </q-card-title>
                    </q-card-media>
                    </q-card>
                </q-item>
            </div>
              <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <q-item href="">
                    <q-card inline class="q-ma-sm">
                    <q-card-media>
                        <img src="../assets/dog.png">
                        <q-card-title slot="overlay">
                            Title
                        </q-card-title>
                    </q-card-media>
                    </q-card>
                </q-item>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                <q-item href="">
                    <q-card inline class="q-ma-sm">
                    <q-card-media>
                        <img src="../assets/dog.png">
                        <q-card-title slot="overlay">
                            Title
                        </q-card-title>
                    </q-card-media>
                    </q-card>
                </q-item>
            </div>
        </div>
    </div>
</template>
<style scope>
.dashboard {
    padding: 50px 200px;
}
.q-card-title{
    text-align:center
}
.q-ma-sm {
    cursor: pointer;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    border-radius: 0;
    position: relative
}
.q-ma-sm:before,
.q-ma-sm:after {
    content: "";
    width: 0;
    height: 2px;
    background: #4527a0; /*underline color*/
    position: absolute;
    top: 100%;
    left: 50%;
    transition: all .8s ;
}
.q-ma-sm:hover:before{
    left:0%;
    width:50%;
}
.q-ma-sm:hover:after{
    width: 50%;
}
.q-ma-sm:hover,
.q-ma-sm:active {
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
