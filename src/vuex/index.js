/* eslint-disable no-param-reassign */
/**
 * Copyright (c) 2021 Oracle and/or its affiliates.
 * Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

/**
 * The VUEX store containing all the data this application uses.
 */
import Vuex from 'vuex';

import { getTopicsListPageData, fetchTopicArticles, fetchArticleDetails } from '../scripts/services';

export default Vuex.createStore({
  // wrap state in a function so that it does not leak into other server runs
  state() {
    return {
      topicsListPageData: {},
      articlesListPageData: {},
      articleDetailsPageData: {},
    };
  },

  actions: {
    // get the data for the home page
    getTopicsListPageData({ commit }) {
      return getTopicsListPageData()
        .then((data) => {
          commit('setTopicsListPageData', data);
        });
    },

    // get the data for the Image Grid Page
    fetchTopicArticles({ commit }, categoryId) {
      return fetchTopicArticles(categoryId)
        .then((data) => {
          commit('setArticlesListPageData', data);
        });
    },

    // get the data for the Image Grid Page
    fetchArticleDetails({ commit }, categoryId) {
      return fetchArticleDetails(categoryId)
        .then((data) => {
          commit('setArticleDetailsPageData', data);
        });
    },
  },

  // mutations have to be synchronous.
  mutations: {
    setTopicsListPageData(state, data) {
      state.topicsListPageData = data;
    },

    setArticlesListPageData(state, data) {
      state.articlesListPageData = data;
    },

    setArticleDetailsPageData(state, data) {
      state.articleDetailsPageData = data;
    },
  },

});
