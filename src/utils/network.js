
const axios = require('axios').default;
const utilHelpers = require('./utils');

const instance = axios.create({
  timeout: 3000,
});

exports.makeNetworkCall = async (requestObj) => {
  const clientUrl = await utilHelpers.getClientUrl();
  let response;
  const requestUrl = clientUrl + requestObj.requestUrl;
  if (requestObj.requestType === 'get') {
    response = await instance.get(requestUrl, requestObj.config);
  } else if (requestObj.requestType === 'put') {
    response = await instance.put(requestUrl, requestObj.payload, requestObj.config);
  } else if (requestObj.requestType === 'post') {
    response = await instance.post(requestUrl, requestObj.payload, requestObj.config);
  } else if (requestObj.requestType === 'patch') {
    response = await instance.patch(requestUrl, requestObj.payload, requestObj.config);
  }
  return response;
};
