<!--
  Copyright (c) 2021 Oracle and/or its affiliates.
  Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
-->

<!--
 Component representing an Article List Item displayed in the list of articles.
-->

<template>
  <router-link
    :to="{ name: 'article',
    params: {articleId: article.id},
    query: {topicId: topicId, topicName: topicName} }">

  <div class="article">

      <div class="title-date">
        <h4 class="title">{{article.name}}</h4>
        <div class="date">{{formattedDate}}</div>
      </div>

      <picture v-if="article.renditionUrls">
        <source
          type="image/webp"
          :srcset="article.renditionUrls.srcset"
          sizes="80px" />
        <source :srcset="article.renditionUrls.jpgSrcset" sizes="80px" />
        <img src="article.renditionUrls.small" alt="Article thumbnail"
          :width="article.renditionUrls.width"
          :height="article.renditionUrls.height"/>
      </picture>

      <div class="description">
        {{article.description}}
      </div>

    </div>
  </router-link>
</template>

<script>

import { dateToMDY } from '../scripts/utils';

export default {
  name: 'ArticleListItem',
  props: ['article', 'topicId', 'topicName'],
  computed: {
    formattedDate() {
      return `Posted on ${dateToMDY(this.article.fields.published_date.value)}`;
    },
  },
};
</script>
