import 'babel-polyfill';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {
  createLogger,
} from 'redux-logger';
import {
  composeWithDevTools,
} from 'redux-devtools-extension';
import resolve from 'redux-duckling';

import appFactory from './ducklings/app';
import Storage from './services/storage';

const logger = createLogger();
const composeEnhancers = composeWithDevTools({
  // devtool options
});

const duckling = appFactory(new Storage('crypto-watch'));
const {app, reducer} = resolve(duckling);

module.exports = {
  ...app,
  store: createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk, promise, logger)),
  ),
};
