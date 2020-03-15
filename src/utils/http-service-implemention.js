
// If we execute http calls in websites not owned by you there are chances
// you might get blocked due to Cross-Origin access policies.
// Hence always make network call via background js.
// this file is the central point for making such network calls.
const browserWrapper = require('../utils/browserWrappers');

const requestObject = {
  methodType: 'network',
  requestType: 'post/get/put/patch',
  requestUrl: 'relative url string',
  config: {},
  payload: {
  },
};

export default {
  all() {
    console.error('extension does not support axios.all calls yet. future scope',
      'http-service-implementations.js');
  },
  /**
   * @param {string} relativeUrl
   * @param {{}} config
   */
  get(relativeUrl, config) {
    requestObject.requestUrl = relativeUrl;
    requestObject.config = config || {};
    requestObject.payload = {};
    requestObject.requestType = 'get';
    return browserWrapper.sendMessageToExtension(requestObject);
  },
  /**
   * @param {string} relativeUrl
   * @param {{}} data
   * @param {{}} config
   */
  post(relativeUrl, data, config) {
    requestObject.requestUrl = relativeUrl;
    requestObject.config = config || {};
    requestObject.payload = data || {};
    requestObject.requestType = 'post';
    return browserWrapper.sendMessageToExtension(requestObject);
  },
  /**
   * @param {string} relativeUrl
   * @param {{}} data
   * @param {{}} config
   */
  put(relativeUrl, data, config) {
    requestObject.requestUrl = relativeUrl;
    requestObject.config = config || {};
    requestObject.payload = data || {};
    requestObject.requestType = 'put';
    return browserWrapper.sendMessageToExtension(requestObject);
  },
  /**
   * @param {string} relativeUrl
   * @param {{}} data
   * @param {{}} config
   */
  patch(relativeUrl, data, config) {
    requestObject.requestUrl = relativeUrl;
    requestObject.config = config || {};
    requestObject.payload = data || {};
    requestObject.requestType = 'patch';
    return browserWrapper.sendMessageToExtension(requestObject);
  },
};
