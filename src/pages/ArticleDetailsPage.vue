<!--
  Copyright (c) 2021 Oracle and/or its affiliates.
  Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
-->

<!-- Component for the Article Details Page. -->

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
          <router-link
            :to="{ name: 'articles',
            params: {topicId: topicId},
            query: {topicName: topicName} }">
              {{topicName}}
          </router-link>
        </li>
        <li>
          {{article.name}}
        </li>
      </ul>
    </div>

    <!-- Details about the specific article-->
    <div id="article">
      <div class="author">
        <!-- Avatar -->
        <picture v-if="article.authorRenditionUrls">
          <source
            type="image/webp"
            :srcset="article.authorRenditionUrls.srcset"
            sizes="80px" />
          <source :srcset="article.authorRenditionUrls.jpgSrcset" sizes="80px" />
          <img :src="article.authorRenditionUrls.small" alt="Author Avatar" />
        </picture>

        <!-- Author Name / Date -->
        <div class="name_date">
          <h4 class="title">{{article.title}}</h4>
          <div class="date">{{formattedDate}}</div>
        </div>
      </div>

      <!-- Article Image and caption -->
      <figure>
        <picture v-if="article.renditionUrls">
          <source type="image/webp" :srcset="article.renditionUrls.srcset" />
          <source :srcset="article.renditionUrls.jpgSrcset" />
          <img :src="article.renditionUrls.large" alt="Article"
            :width="article.renditionUrls.width"
            :height="article.renditionUrls.height"/>
        </picture>
        <figcaption>{{article.imageCaption}}</figcaption>
      </figure>

      <!-- Article Content -->
      <div class="content" v-html=cleanContent></div>
    </div>
  </div>

</template>

<script>
import filterXSS from 'xss';
import { dateToMDY } from '../scripts/utils';

export default {
  name: 'ArticleDetailsPage',

  data() {
    return {
      // data passed in on the URL
      articleId: String,
      topicId: String,
      topicName: String,
      // client side rendering only
      loading: false,
    };
  },

  created() {
    // get data passed in on the URL
    this.articleId = this.$route.params.articleId;
    this.topicId = this.$route.query.topicId;
    this.topicName = this.$route.query.topicName;
  },

  // computed properties will watch for any changes in the data within it,
  // when it changes it will update itself based on some function
  computed: {
    article() {
      return this.$store.state.articleDetailsPageData;
    },
    formattedDate() {
      const article = this.$store.state.articleDetailsPageData;
      return article && article.date ? `Posted on ${dateToMDY(article.date.value)}` : '';
    },
    cleanContent() {
      const article = this.$store.state.articleDetailsPageData;
      const { content } = article;
      const options = {
        stripIgnoreTag: true, // filter out all HTML not in the whitelist
        stripIgnoreTagBody: ['script'], // the script tag is a special case, we need
        // to filter out its content
      };
      return filterXSS(content, options);
    },
  },

  // Server-side only: called by server renderer automatically
  serverPrefetch() {
    return this.fetchData();
  },

  // Client-side only : get data if its not already been obtained
  mounted() {
    document.title = 'Article';
    if (this.$store.state.articleDetailsPageData.id !== this.articleId
        || !this.article) {
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
      return this.$store.dispatch('fetchArticleDetails', this.articleId);
    },
  },

};
</script>
