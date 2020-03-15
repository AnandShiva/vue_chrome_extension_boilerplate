# Chrome Extension built with VueJS. 

Hello DevDude, 

This is a production grade boiler plate for Chrome Extension with out of the box setup for **web-pack**, **hot reloading** of extension in browser, **unit testing**, **CRX builder** and **SCSS**

## Why this boiler plate

 - Webpack 4+. 
 - Vue 2.6
 - Inbuilt SCSS support
 - Avoid [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) 
			
	 - Source websites can block your call if your content scripts make call to backend. 
	 - Boiler plate provides easy design to reroute all your network call to background.js which makes call to backend without with any additional effort. 

 - Modular Code splitting 
	 - No need to write complicated if/else clause to reroute your code via background.js. 

	 - Scalable code architecture. Write any function in utitlity and call it with out API methods without making any code change in background.js. Check Making call to utility function for more info. 

# Installation steps. 

We use yarn. If using npm either replace package.json file yarn references to npm or install yarn. 
***Different Build commands and their meanings.*** 

 1. **build:dev** - Transforms the Code to pureJS functions to be run on browser. Gives a outputs the contents to dist/un_packed_extension_build
 2. **build:dev:watch** - Same as yarn build:dev with hot reload. Hot reload takes care of updating extension also. But css hot reload has some issues.
 3. **build:prod** - Optimized Code Addition to yarn build:dev
 4. **build:crx** - Builds a CRX version of the extension which can be installed locally if developer mode is enabled.
 5. **build** - Optimised folder and crx as ouput.
 6. **lint**    - ESLint check.
 7.  **test**  - Runs Unit tests in watch mode.

Step 4,5 requries .pem file to be places in temp folder.
generate it following the steps from [here](http://www.adambarth.com/experimental/crx/docs/packaging.html)
## Folder Structure

    ├── ChromeStoreDescription.txt
    ├── README.md
    ├── __mocks__
    │   └── axios.js
    ├── __tests__
    │   ├── browserApi.test.js
    │   ├── popup.test.js
    │   ├── sanity.test.js
    │   └── testUtils
    │       └── chromeInstancePuppeteer.js
    ├── babel.config.js
    ├── build_config
    │   └── build.js
    ├── dist
    │   └── crx
    │   |    └── VueChromeExtension.crx
    |   └── un_packed_extension_build
    |         └──    
    ├── jest.config.js
    ├── jsconfig.json
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── background
    │   │   └── background.js
    │   ├── constants
    │   │   └── constants.json
    │   ├── icons
    │   │   └── extension-icon.png
    │   ├── manifest.json
    │   ├── options
    │   │   ├── options.html
    │   │   └── options.js
    │   ├── page_injects
    │   │   ├── ExtensionContainer.vue
    │   │   ├── icon_injector.js
    │   │   └── index.js
    │   ├── popup
    │   │   ├── popup.css
    │   │   ├── popup.html
    │   │   └── popup.js
    │   ├── style
    │   └── utils
    │       ├── browserWrappers.js
    │       ├── http-service-implemention.js
    │       ├── network.js
    │       └── utils.js
    ├── temp
    │   └── dist.pem
    ├── webpack.config.js


## Making a call to Utility function. 

  

    const requestObject = {
       methodType:'utility',
       utilFunctionName: 'dummyUtitlityExampleFunction',
       utilFunctionArgs:  null,
    };
    browserWrapper.sendMessageToExtension(requestObject).then((response) => { 
	     console.debug(response);
    });
The sendMessageToExtension API takes care of rerouting your request to proper function in utils file. 

## Making a network call. 

Never make http call directly from content scripts. They might be blocked due to CORS. Use the below example method to reroute the call via background.js which does not have any restrictions on domains it can call. 

    const requestObject = {
	    methodType:  'network',
	    requestType:  'post',
	    requestUrl:  'absolute url',
	    config : {
		    // axios config object.
	    }
	   payload: {},
    };
    
    const  status = await  httpService.makeNetworkCall(requestObject);


## Issues. 

Any issues in the boiler plate feel free to raise a issue request. Will look into it as soon as possible. 