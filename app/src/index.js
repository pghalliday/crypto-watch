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

const logger = createLogger();
const composeEnhancers = composeWithDevTools({
  // devtool options
});

export const store = createStore(
  () => ({}),
  composeEnhancers(applyMiddleware(thunk, promise, logger)),
);
