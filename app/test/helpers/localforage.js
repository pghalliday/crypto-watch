import cloneDeep from 'lodash/cloneDeep';
const INITIAL_ERROR = undefined;
const INITIAL_DATA = {};

let nextError = INITIAL_ERROR;
let data = INITIAL_DATA;

function reset(initialData = INITIAL_DATA) {
  nextError = INITIAL_ERROR;
  data = cloneDeep(initialData);
}

function setNextError(error) {
  nextError = error;
}

function getData() {
  return data;
}

function createPromise(callback) {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      if (nextError) {
        reject(nextError);
        nextError = undefined;
      } else {
        callback(resolve);
      }
    });
  });
};

function getItem(key) {
  return createPromise((resolve) => {
    resolve(typeof data[key] === 'undefined' ? null : data[key]);
  });
}

function setItem(key, value) {
  return createPromise((resolve) => {
    data[key] = value;
    resolve();
  });
}

function removeItem(key) {
  return createPromise((resolve) => {
    delete data[key];
    resolve();
  });
}

function clear() {
  return createPromise((resolve) => {
    data = cloneDeep(INITIAL_DATA);
    resolve();
  });
}

function length() {
  return createPromise((resolve) => {
    resolve(Object.keys(data).length);
  });
}

function ready() {
  return createPromise((resolve) => resolve());
}

module.exports = {
  getItem,
  setItem,
  removeItem,
  clear,
  length,
  ready,
  helpers: {
    reset,
    setNextError,
    getData,
  },
};
