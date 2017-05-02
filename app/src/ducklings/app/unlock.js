import factory from '../../lib/factory';
import errorBehavior from '../../lib/ducklings/error-behavior';
import {
  createSelector,
} from 'reselect';

export default factory(
  'ducklings/app/unlock',
  (service) => [errorBehavior, ({
    action,
    selector,
  }) => {
    const getSettings = selector((state) => state.settings);
    const submit = action('SUBMIT', (secret) => {
      try {
        return service.unlock(secret);
      } catch (error) {
        return error;
      }
    });
    return {
      initialState: {
        settings: undefined,
      },
      handlers: {
        [submit]: {
          next: (_, {payload: settings}) => ({
            settings,
          }),
          throw: (_, {payload: error}) => ({
            error,
          }),
        },
      },
      app: {
        getSettings,
        isComplete: createSelector(
          getSettings,
          (settings) => typeof settings !== 'undefined',
        ),
        submit,
      },
    };
  }],
);
