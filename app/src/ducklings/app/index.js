import factory from '../../lib/factory';
import unlockFactory from './unlock';
import createFactory from './create';
import deleteFactory from './delete';
import clearFactory from './clear';
import changeSecretFactory from './change-secret';
import asyncBehavior from '../../lib/ducklings/async-behavior';
import {
  createSelector,
} from 'reselect';

export default factory(
  'ducklings/app',
  (service) => [asyncBehavior, {
    unlock: unlockFactory(service),
    create: createFactory(service),
    delete: deleteFactory(service),
    clear: clearFactory(service),
    changeSecret: changeSecretFactory(service),
  }, ({
    action,
    selector,
    reduce,
    app: {start, complete},
  }) => {
    const count = selector((state) => state.count);
    const getSettings = selector((state) => state.settings);
    const completeUnlock = action('COMPLETE_UNLOCK');
    const completeCreate = action('COMPLETE_CREATE');
    const completeDelete = action('COMPLETE_DELETE');
    const completeClear = action('COMPLETE_CLEAR');
    return {
      initialState: {
        pending: true,
        count: 0,
        settings: undefined,
      },
      handlers: {
        [start]: () => ({
          count: 0,
        }),
        [complete]: {
          next: (_, {payload: count}) => ({
            count,
          }),
        },
        [completeUnlock]: (state, {payload: settings}) => ({
          ...reduce(state, {
            unlock: [['reset']],
          }),
          settings,
        }),
        [completeCreate]: (state, {payload: {settings, count}}) => ({
          ...reduce(state, {
            create: [['reset']],
          }),
          settings,
          count,
        }),
        [completeDelete]: (state, {payload: count}) => ({
          ...reduce(state, {
            delete: [['reset']],
          }),
          settings: undefined,
          count,
        }),
        [completeClear]: (state) => ({
          ...reduce(state, {
            clear: [['reset']],
          }),
          settings: undefined,
          count: 0,
        }),
      },
      app: {
        hasSettings: createSelector(
          count,
          (count) => count > 0,
        ),
        isUnlocked: createSelector(
          getSettings,
          (settings) => typeof settings !== 'undefined',
        ),
        getSettings,
        initialize: () => (dispatch) => {
          dispatch(start());
          return dispatch(complete(service.initialize()));
        },
        completeUnlock,
        completeCreate,
        completeDelete,
        completeClear,
      },
    };
  }],
);
