<template>
    <div>
        <div class="reminder">
            <q-card>
            <q-card-title>
                <b>The content must be included</b>
            </q-card-title>
            <q-card-separator inset/>
            <q-list>
                <q-list-header>
                    Course Name
                </q-list-header>
                <q-item v-for="content in item.content_areas" :key="content">{{content.name}}</q-item>
            <q-item-separator />
            <q-list-header>
                The Tools
            </q-list-header>
            <q-item-separator />
            <q-list-header>
                The Skills
            </q-list-header>
            <q-item-separator />
            <q-list-header>
                The Concepts
            </q-list-header>
            </q-list>
            </q-card>
        </div>
    </div>
</template>
<script>
export default {
  props: ['item']
}
</script>
<style scoped>
b{
    color: gray;
}
.reminder {
    margin-top:0px
}
.reminder p{
    color: gray
}
</style>
