<!--
  Copyright (c) 2021 Oracle and/or its affiliates.
  Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
-->

<!-- Component for the Articles List Page. -->

<template>
  <!-- Display spinner whilst data is loading (client side rendering only) -->
  <div v-if="loading">
    <div class="progress-spinner" />
  </div>
  <div v-else>
    <!-- Breadcrumbs -->
    <div id="breadcrumb">
      <ul>
        <li>
          <router-link :to="{ name: 'home'}">Home</router-link>
        </li>
        <li>
          {{topicName}}
        </li>
      </ul>
    </div>

    <!-- List of articles -->
    <div id="articles">
      <div v-for="(article, i) in articles" v-bind:key="i">
        <ArticleListItem :article="article" :topicId="topicId" :topicName="topicName"  />
      </div>
    </div>

  </div>

</template>

<script>
// import any components this page uses here
import ArticleListItem from '../components/ArticleListItem.vue';

export default {
  name: 'ArticlesListPage',

  components: {
    ArticleListItem,
  },
  data() {
    return {
      // data passed in on the URL
      topicId: String,
      topicName: String,
      // client side rendering only
      loading: false,
    };
  },
  created() {
    // get data passed in on the URL
    this.topicId = this.$route.params.topicId;
    this.topicName = this.$route.query.topicName;
  },
  // computed properties will watch for any changes in the data within it,
  // when it changes it will update itself based on some function
  computed: {
    articles() {
      return this.$store.state.articlesListPageData.articles;
    },
  },

  // Server-side only: called by server renderer automatically
  serverPrefetch() {
    return this.fetchData();
  },

  // Client-side only : get data if its not already been obtained
  mounted() {
    document.title = 'Articles';
    if (this.$store.state.articlesListPageData.topicId !== this.topicId
        || !this.articles) {
      this.loading = true;
      this.fetchData()
        .then(() => {
          this.loading = false;
        });
    }
  },

  methods: {
    fetchData() {
      // return the Promise from the action
      return this.$store.dispatch('fetchTopicArticles', this.topicId);
    },
  },

};
</script>
