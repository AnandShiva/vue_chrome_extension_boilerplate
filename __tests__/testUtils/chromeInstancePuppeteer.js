let chromeInstance = null;

let mockBrowserData = {
  cookies: [],
  storage: {}
};
chromeInstance = {
  cookies: {
    get: (cookie, retunFunc) => {
      mockBrowserData.cookies.forEach((cookieItem) => {
        if (cookie.url === cookieItem.url && cookie.name === cookieItem.name) {
          retunFunc(cookieItem);
        }
      })
    },
    set: (cookie, returnFunc) => {
      mockBrowserData.cookies.push(cookie);
      if (mockBrowserData.cookies.length) {
        returnFunc(mockBrowserData.cookies[mockBrowserData.cookies.length - 1])
      }
    }
  },
  storage: {
    sync:{
      get: (keys, returnFunc) => {
        let returnValue = {};
        keys.forEach((key) => {
          if(mockBrowserData.storage[key]){
            returnValue[key] = mockBrowserData.storage[key]
          }
        });
        returnFunc(returnValue);
      },
      set: (obj,retunFunc)=> {
        Object.assign(mockBrowserData.storage,obj);
        retunFunc(obj)
      }
    }
  }
}

/**
 * @param {Object} [initialMockData] 
 */
exports.getChromeInstance = (initialMockData) =>{
  if(initialMockData){
    mockBrowserData = JSON.parse(JSON.stringify(initialMockData));
  }
  return chromeInstance;
}

/**
 * @param {Object} incomingMock
 */
exports.setMockBrowserData = (incomingMock)=> {
  mockBrowserData = JSON.parse(JSON.stringify(incomingMock));
}