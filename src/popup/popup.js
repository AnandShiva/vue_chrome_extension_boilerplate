import Vue from 'vue';
import popCSS from './popup.css';

const browserWrapper = require('../utils/browserWrappers');

const vue = new Vue({
  el: '#popover-vue-container',
  data() {
    return {

    };
  },
  created() {
  },
  methods: {
    triggerDummyCallToUtilityFunctions() {
      const requestObject = {
        methodType: 'utility',
        utilFunctionName: 'dummyUtitlityExampleFunction',
        utilFunctionArgs: null,
      };
      /**
       * @param {any} response
       */
      browserWrapper.sendMessageToExtension(requestObject).then((response) => {
        console.debug(response);
      });
    },
  },
});
