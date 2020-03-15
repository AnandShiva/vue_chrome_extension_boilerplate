// @ts-check
import Vue from 'vue';

import httpServiceImplementationApi from '../utils/http-service-implemention';


const CONSTANTS = require('../constants/constants.json');


const iconAdderUtils = require('./icon_injector');

const ExtensionContainer = require('./ExtensionContainer.vue').default;

// icon click handler..
const launcherClickHandler = function () {

};


iconAdderUtils.injectStaticLaunchIcon(launcherClickHandler);

// overlay container section
const body = document.getElementsByTagName('body')[0];

// Instantiate Vue and tada !
const ContainerElement = document.createElement('div');
ContainerElement.id = CONSTANTS.IDS.VUE_INSTANCE_INFLATE_ID;
body.appendChild(ContainerElement);

const vue = new Vue({
  el: `#${CONSTANTS.IDS.VUE_INSTANCE_INFLATE_ID}`,
  render: (h) => h(ExtensionContainer),
});
