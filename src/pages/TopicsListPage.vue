<!--
  Copyright (c) 2021 Oracle and/or its affiliates.
  Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
-->

<!-- Component for the Topics List Page. -->

<template>
  <div>
    <!-- Display spinner whilst data is loading (client side rendering only) -->
    <div v-if="loading">
      <div class="progress-spinner" />
    </div>
    <div v-else>
      <!-- The header section -->
      <Header :companyTitle="topicsListPageData.companyTitle"
              :companyThumbnailRenditionUrls="topicsListPageData.companyThumbnailRenditionUrls"
              :aboutUrl="topicsListPageData.aboutUrl"
              :contactUrl="topicsListPageData.contactUrl"  />

      <!-- The list of topics -->
      <div id="topics">
        <div v-for="(topic, i) in topics" v-bind:key="i">
          <TopicsListItem :topic="topic"  />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import any components this page uses here
import Header from '../components/Header.vue';
import TopicsListItem from '../components/TopicsListItem.vue';

export default {
  name: 'TopicsListPage',

  components: {
    Header,
    TopicsListItem,
  },

  data() {
    return {
      // client side rendering only
      loading: false,
    };
  },

  // computed properties will watch for any changes in the data within it,
  // when it changes it will update itself based on some function
  computed: {
    topicsListPageData() {
      return this.$store.state.topicsListPageData;
    },
    topics() {
      return this.$store.state.topicsListPageData.topics;
    },
    aboutUrl() {
      return this.$store.state.topicsListPageData.aboutUrl;
    },
  },

  // Server-side only: called by server renderer automatically
  serverPrefetch() {
    return this.fetchData();
  },

  // Client-side only : get data if its not already been obtained
  mounted() {
    document.title = 'Topics';
    if (!(this.topicsListPageData && this.topicsListPageData.topics)) {
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
      return this.$store.dispatch('getTopicsListPageData');
    },
  },

};
</script>
