import factory from '../../lib/factory';
import asyncBehavior from '../../lib/ducklings/async-behavior';

export default factory(
  'ducklings/app/create',
  (service) => [asyncBehavior, ({
    selector,
    app: {start, complete},
  }) => {
    return {
      initialState: {
        count: 0,
        settings: undefined,
        complete: false,
      },
      handlers: {
        [start]: (_, {payload: settings}) => ({
          settings,
        }),
        [complete]: {
          next: (_, {payload: count}) => ({
            count,
            complete: true,
          }),
        },
      },
      app: {
        getCount: selector((state) => state.count),
        getSettings: selector((state) => state.settings),
        isComplete: selector((state) => state.complete),
        submit: (secret, settings) => (dispatch) => {
          dispatch(start(settings));
          return dispatch(complete(service.create(secret, settings)));
        },
      },
    };
  }],
);
