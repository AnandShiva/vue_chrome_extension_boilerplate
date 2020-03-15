
const browserWrapper = require('./browserWrappers');
const httpService = require('./network');

exports.dummyUtitlityExampleFunction = async () => {
  console.log('dummyUtitlityExampleFunction called');
};

exports.dummyNetworkCallFunction = async () => {
  console.log('dummyNetworkCallFunction called');
  const requestObject = {
    methodType: 'network',
    requestType: 'post',
    requestUrl: '/dummy/url',
    payload: {
    },
  };
  const status = await httpService.makeNetworkCall(requestObject);
  return status;
};
