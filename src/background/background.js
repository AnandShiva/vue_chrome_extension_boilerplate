
const browserWrapper = require('../utils/browserWrappers');
const utilsHelpers = require('../utils/utils');
const httpService = require('../utils/network');

// exporting this function since its being consumed in test utils
// so that we can redirect the chrome mock events to actual implementation
exports.messsageListener = function (message, source, sendResponse) {
  // listener for global messages send event.
  // always check for specific messages to accept before writing processing logic.
  // Don't use await function here, doesn't work.
  if (message.methodType === 'network') {
    // network redirect
    httpService.makeNetworkCall(message).then((response) => {
      sendResponse(response);
    });
  } else if (message.methodType === 'utility') {
    // wrapper for all utility functions. pass utilFunctionName to call,
    // its utilFunctionArgs and util flag denoting its a util call
    utilsHelpers[message.utilFunctionName].apply(this, message.utilFunctionArgs)
      .then((response) => {
        sendResponse(response);
      });
  } else if (message.methodType === 'browserApi') {
    // wrapper for all browser api call's (chrome calls for now).
    // pass browserApiName to call, its browserApiArgs for passing args.
    browserWrapper[message.browserApiName].apply(this, message.browserApiArgs).then((response) => {
      sendResponse(response);
    });
  }
  return true; // Required for async sendResponse()
};
// internal message event listener
chrome.runtime.onMessage.addListener(this.messsageListener);
// externla message event listener
chrome.runtime.onMessageExternal.addListener(this.messsageListener);
