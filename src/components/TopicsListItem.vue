<!--
  Copyright (c) 2021 Oracle and/or its affiliates.
  Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
-->

<!--
 Component representing a Topic displayed in the list of topics.
-->

<template>
  <router-link
    :to="{ name: 'articles',
    params: {topicId: topic.id},
    query: {topicName: topic.name} } ">

    <div  class="topic" >

      <div class="button-wrapper">
        <div class="button">{{topic.name}}</div>
      </div>

      <picture v-if="topic.renditionUrls">
        <source type="image/webp" :srcset="topic.renditionUrls.srcset" sizes="300px" />
        <source :srcset="topic.renditionUrls.jpgSrcset" sizes="300px" />
        <img :src="topic.renditionUrls.thumbnail" alt="Topic Thumbnail" />
      </picture>

      <div class="desc-wrapper">
        <div class="description">{{topic.description}}</div>
      </div>

    </div>
  </router-link>
</template>

<script>
export default {
  name: 'TopicsListItem',
  // properties passed into the component in HTML
  props: ['topic'],
};
</script>
