import factory from '../../lib/factory';
import asyncBehavior from '../../lib/ducklings/async-behavior';

export default factory(
  'ducklings/app/delete',
  (service) => [asyncBehavior, ({
    selector,
    app: {start, complete},
  }) => {
    return {
      initialState: {
        count: 0,
        complete: false,
      },
      handlers: {
        [complete]: {
          next: (_, {payload: count}) => ({
            count,
            complete: true,
          }),
        },
      },
      app: {
        getCount: selector((state) => state.count),
        isComplete: selector((state) => state.complete),
        submit: () => (dispatch) => {
          dispatch(start());
          return dispatch(complete(service.delete()));
        },
      },
    };
  }],
);
