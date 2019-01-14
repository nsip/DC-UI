<template>
    <div>
        <h6><b>Tools</b></h6>
        <div class="row">
            <q-card inline class="q-ma-sm">
                <q-card-title>
                    <b>Maps</b>
                </q-card-title>
                <q-card-main>
                    <ul>
                        <li>relief maps, political maps, topographic maps, choropleth maps, flowline maps, cadastral maps, thematic maps, isoline maps, land use maps, précis maps, special-purpose maps, cartograms, synoptic charts</li>
                        <li>maps to identify direction, scale and distance, area and grid references, degrees and minutes of latitude and longitude, bearings, aspect, altitude, area, density, contour lines, gradient, local relief</li>
                    </ul>
                </q-card-main>
            </q-card>
            <q-card inline class="q-ma-sm">
                <q-card-title>
                    <b>Fieldwork</b>
                </q-card-title>
                <q-card-main>
                    <ul>
                        <li>observing, measuring, collecting and recording data, developing and conducting surveys and interviews</li>
                        <li>fieldwork instruments such as weather instruments, vegetation identification charts, compasses, clinometers, GPS, GIS or remote sensing</li>
                    </ul>
                </q-card-main>
            </q-card>
            <q-card inline class="q-ma-sm">
                <q-card-title>
                    <b>Graphs and statistics</b>
                </q-card-title>
                <q-card-main>
                    <ul>
                        <li>data tables, pie graphs, column graphs, compound column graphs, line graphs, scatter graphs, climate graphs, population profiles, multiple tables and graphs presented on a geographical theme, statistics to find patterns and trends, and to account for change</li>
                    </ul>
                </q-card-main>
            </q-card>
        </div>
    </div>
</template>

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
