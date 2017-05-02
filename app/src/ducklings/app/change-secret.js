import factory from '../../lib/factory';
import asyncBehavior from '../../lib/ducklings/async-behavior';

export default factory(
  'ducklings/app/change-secret',
  (service) => [asyncBehavior, ({
    selector,
    app: {start, complete},
  }) => {
    return {
      initialState: {
        complete: false,
      },
      handlers: {
        [complete]: {
          next: () => ({
            complete: true,
          }),
        },
      },
      app: {
        isComplete: selector((state) => state.complete),
        submit: (secret, settings) => (dispatch) => {
          dispatch(start());
          return dispatch(complete(service.changeSecret(secret, settings)));
        },
      },
    };
  }],
);
