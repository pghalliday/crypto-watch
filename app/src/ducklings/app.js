import factory from '../lib/factory';
import asyncBehavior from '../lib/ducklings/async-behavior';

export default factory(
  'ducklings/app',
  (service) => [asyncBehavior, ({
    selector,
    app: {start, complete},
  }) => ({
    initialState: {
      count: 0,
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
    },
    app: {
      getCount: selector((state) => state.count),
      initialize: () => (dispatch) => {
        dispatch(start());
        return dispatch(complete(service.initialize()));
      },
    },
  })],
);
