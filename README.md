    Chrome Extension built with Vuejs Boilerplate 


    Different Build commands and their meanins. Using npm instead of yarn might change your syntax a bit
    yarn build:crx - Builds a CRX version of the extension which can be installed locally if developer mode is enabled. 
    yarn build:dev - Transforms the Code to pureJS functions to be run on browser. Gives a outputs the contents to dist/un_packed_extension_build
    yarn build:dev:watch - Same as yarn build:dev with hot reload. Hot reload takes care of updating extension also. But css hot reload has some issues. 
    yarn build:prod - Optimized Code Addition to yarn build:dev
    yarn build - Optimised folder and crx as ouput. 
        This requries .pem file to be places in temp folder. 
        generate it following this link steps. http://www.adambarth.com/experimental/crx/docs/packaging.html
    yarn lint - ESLint check. 
    yarn test - Runs Unit tests in watch mode. 