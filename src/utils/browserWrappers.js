
// @ts-check
import { GENERIC_TIMEOUT_SECONDS } from '../constants/constants.json';
/**
 * @param {{ url: string; name: string; }} cookieParams
 */
export async function getCookie(cookieParams) {
  let bPromiseResolved = false;
  const promise = new Promise((resolve, reject) => {
    chrome.cookies.get(cookieParams, (value) => {
      bPromiseResolved = true;
      resolve(value);
    });
    setTimeout(() => {
      if (!bPromiseResolved) {
        console.error('request failed with timeout');
        reject();
      }
    }, GENERIC_TIMEOUT_SECONDS * 1000);
  });
  return promise;
}

/**
 * @param {any} cookieParams
 */
export async function setCookie(cookieParams) {
  let bPromiseResolved = false;
  const promise = new Promise((resolve, reject) => {
    chrome.cookies.set(cookieParams, (value) => {
      bPromiseResolved = true;
      resolve(value);
    });
    setTimeout(() => {
      if (!bPromiseResolved) {
        console.error('request failed with timeout');
        reject();
      }
    }, GENERIC_TIMEOUT_SECONDS * 1000);
  });
  return promise;
}


/**
 *
 * @param {string} key
 *
 * @param {{}} value
 */
export async function setStorageValue(key, value) {
  let bPromiseResolved = false;
  const promise = new Promise((resolve, reject) => {
    const obj = {};
    obj[key] = value;
    chrome.storage.sync.set(obj, (setValue) => {
      bPromiseResolved = true;
      resolve(setValue);
    });
    setTimeout(() => {
      if (!bPromiseResolved) {
        console.error('request failed with timeout');
        reject();
      }
    }, GENERIC_TIMEOUT_SECONDS * 1000);
  });
  return promise;
}

/**
 *
 * @param {string} key - list of keys to get values
 */
export async function getStorageValueForKey(key) {
  let bPromiseResolved = false;
  const promise = new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], (values) => {
      bPromiseResolved = true;
      resolve(values[key]);
    });
    setTimeout(() => {
      if (!bPromiseResolved) {
        console.error('request failed with timeout');
        reject();
      }
    }, GENERIC_TIMEOUT_SECONDS * 1000);
  });
  return promise;
}

/**
 *
 * @param {Array} keys - list of keys to get values
 */
export async function getStorageValues(keys) {
  let bPromiseResolved = false;
  const promise = new Promise((resolve, reject) => {
    chrome.storage.sync.get(keys, (values) => {
      bPromiseResolved = true;
      resolve(values);
    });
    setTimeout(() => {
      if (!bPromiseResolved) {
        console.error('request failed with timeout');
        reject();
      }
    }, GENERIC_TIMEOUT_SECONDS * 1000);
  });
  return promise;
}

export async function sendMessageToExtension(requestObject) {
  let bPromiseResolved = false;
  const promise = new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(requestObject, (response) => {
      bPromiseResolved = true;
      resolve(response);
    });
    setTimeout(() => {
      if (!bPromiseResolved) {
        console.error('request failed with timeout browserWrapper/sendMessageToExtension', requestObject);
        reject();
      }
    }, GENERIC_TIMEOUT_SECONDS * 1000);
  });
  return promise;
}
