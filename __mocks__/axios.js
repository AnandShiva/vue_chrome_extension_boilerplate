// // ./__mocks__/axios.js
"use strict";
var mockDelay = 1;
var axiosMock = jest.genMockFromModule("axios");

let responseCollection = {
  byUrl: {
  },
  bySequence: [],
  defaultResponse : undefined
}
let errorCollection = JSON.parse(JSON.stringify(responseCollection));
let initialResponseCollection = JSON.parse(JSON.stringify(responseCollection));
let initialErrorCollection = JSON.parse(JSON.stringify(errorCollection));

function clear(){
  responseCollection = initialResponseCollection;
  errorCollection = initialErrorCollection;
}
// success responders
function __setMockResponse(inputResponse){
  responseCollection.defaultResponse = JSON.parse(JSON.stringify(inputResponse));
}
function __setMockResponseForUrl(url, mResponse){
  responseCollection.byUrl[url] = mResponse;
}
function __setMockResponseBySequence(mSequencedResponseList){
  if(Array.isArray(mSequencedResponseList)){
    responseCollection.bySequence = mSequencedResponseList
  }else{
    console.error("__setMockResponseBySequence expects an Array")
  }
}
// error responders
function __setMockError(inputResponse){
  errorCollection.defaultResponse = JSON.parse(JSON.stringify(inputResponse));
}
function __setMockErrorForUrl(url, mResponse){
  errorCollection.byUrl[url] = mResponse;
}
function __setMockErrorBySequence(mSequencedResponseList){
  if(Array.isArray(mSequencedResponseList)){
    errorCollection.bySequence = mSequencedResponseList
  }else{
    console.error("__setMockErrorBySequence expects an Array")
  }
}

function responseDecider(url, data, config){
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if(errorCollection.bySequence.length){
        resolve(errorCollection.bySequence.shift());
      }else if(errorCollection.byUrl[url]){
        resolve(errorCollection.byUrl[url])
      }else if(errorCollection.defaultResponse !== undefined){
        resolve(errorCollection.defaultResponse)
      }else if(responseCollection.bySequence.length){
        resolve(responseCollection.bySequence.shift());
      }else if(responseCollection.byUrl[url]){
        resolve(responseCollection.byUrl[url])
      }else if(responseCollection.defaultResponse !== undefined){
        resolve(responseCollection.defaultResponse)
      }else{
        console.warn("No Mock Response Available, returning empty response");
        resolve({})
      }
    }, mockDelay);
  });
}

function createInstance() {
  return axiosMock;
};

axiosMock.get.mockImplementation(responseDecider);
axiosMock.post.mockImplementation(responseDecider);
axiosMock.put.mockImplementation(responseDecider);
axiosMock.delete.mockImplementation(responseDecider);
axiosMock.create.mockImplementation(createInstance);
axiosMock.__setMockResponse = __setMockResponse;
axiosMock.__setMockResponseForUrl = __setMockResponseForUrl;
axiosMock.__setMockResponseBySequence = __setMockResponseBySequence;
axiosMock.__setMockError = __setMockError
axiosMock.__setMockErrorForUrl = __setMockErrorForUrl
axiosMock.__setMockErrorBySequence = __setMockErrorBySequence
axiosMock.clear = clear;

axiosMock._setDelay = (mD) => { mockDelay = mD };
axiosMock.finishRequest = () => { jest.runOnlyPendingTimers() };

module.exports = axiosMock;