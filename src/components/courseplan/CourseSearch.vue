<template>
<div class="search">
  <q-chips-input
    inverted
    color="deep-purple-9"
    chips-color="dark"
    chips-bg-color="white"
    v-model="keywords"
    float-label="Enter the key words"
    @keyup="search">
  </q-chips-input>
  <q-list>
    <q-item v-for="result in searchResult" :key="result.URL">
      <q-item-main>
        <q-checkbox  v-model="checkResult" :val="result.URL">{{result.URL}}</q-checkbox>
        </q-item-main>
    </q-item>
  </q-list>
</div>
</template>

<script>
export default {
  props: ['selectLink'],
  data () {
    return {
      keywords: [],
      searchResult: [],
      checkResult: []
    }
  },
  created () {
    this.checkResult = this.selectLink
  },
  methods: {
    search () {
      console.log(this.keywords)
      const axios = require('axios')
      axios({
        url: 'http://localhost:1330/search/graphql',
        method: 'post',
        data: {
          query: `query SearchQuery($terms: SearchInput) {
            searchRequest(terms: $terms) {
              WebPages {
                Value {
                  Name
                  URL
                  DisplayURL
                  Snippet
                }
              }
            }
          }`,
          variables: {
            terms: {
              learning_area: 'hise',
              subject: 'history',
              stage: '3',
              course_name: '',
              content_area: '',
              keywords: this.keywords
            }
          }
        }
      }).then((res) => {
        this.searchResult = res.data.data.searchRequest.WebPages.Value
        console.log(this.searchResult)
      })
    },
    save () {
      this.$root.$emit('save', this.checkResult)
    }
  }
}
</script>

<style scope>
</style>
