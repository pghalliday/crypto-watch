import resolve from 'redux-duckling';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import ServiceHelper from '../../helpers/service';
import Service from '../../../src/services/storage';

import asyncBehavior from '../../../src/lib/ducklings/async-behavior';
import appFactory from '../../../src/ducklings/app';

const namespace = 'crypto-watch';
const count = 5;
const error = new Error('FAIL');

let service;
let serviceHelper;
let duckling;
let app;
let reducer;
let store;
let changes = [];
let initialState;

const record = (store) => (next) => (action) => {
  const result = next(action);
  changes.push({
    action,
    state: store.getState(),
  });
  return result;
};

describe('ducklings', () => {
  describe('app', () => {
    beforeEach(() => {
      service = new Service(namespace);
      serviceHelper = new ServiceHelper(service, {
        initialize: true,
      });
      duckling = appFactory(service);
      ({app, reducer} = resolve(duckling));
      store = createStore(reducer, applyMiddleware(thunk, promise, record));
      initialState = store.getState();
    });

    it('should have the correct type string', () => {
      duckling.is.should.eql('ducklings/app');
    });

    it('should extend asyncBehavior', () => {
      duckling[0].should.equal(asyncBehavior);
    });

    describe('initial state', () => {
      it('should have 0 encrypted settings entries', () => {
        app.getCount(initialState).should.eql(0);
      });
    });

    describe('after initialize', () => {
      describe('with no error', () => {
        beforeEach(async () => {
          serviceHelper.reset();
          serviceHelper.setResults([{
            success: count,
          }]);
          changes = [];
          await store.dispatch(app.initialize());
        });

        it('should go through the correct changes', () => {
          changes.length.should.eql(2);
          changes[0].action.type.should.eql(app.start.toString());
          app.getCount(changes[0].state).should.eql(0);
          changes[1].action.type.should.eql(app.complete.toString());
          changes[1].action.payload.should.eql(count);
          expect(changes[1].action.error).to.be.undefined;
          app.getCount(changes[1].state).should.eql(count);
        });
      });

      describe('with an error', () => {
        beforeEach(async () => {
          serviceHelper.reset();
          serviceHelper.setResults([{
            error,
          }]);
          changes = [];
          await store.dispatch(app.initialize());
        });

        it('should go through the correct changes', () => {
          changes.length.should.eql(2);
          changes[0].action.type.should.eql(app.start.toString());
          app.getCount(changes[0].state).should.eql(0);
          changes[1].action.type.should.eql(app.complete.toString());
          changes[1].action.payload.should.eql(error);
          changes[1].action.error.should.be.true;
          app.getCount(changes[1].state).should.eql(0);
        });
      });
    });
  });
});
