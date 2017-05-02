import resolve from 'redux-duckling';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import ServiceHelper from '../../../helpers/service';
import Service from '../../../../src/services/storage';

import errorBehavior from '../../../../src/lib/ducklings/error-behavior';
import factory from '../../../../src/ducklings/app/unlock';

const namespace = 'crypto-watch';
const error = new Error('FAIL');
const settings = {};
const secret = 'secret';

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
    describe('unlock', () => {
      beforeEach(() => {
        service = new Service(namespace);
        serviceHelper = new ServiceHelper(service, {
          unlock: false,
        });
        duckling = factory(service);
        ({app, reducer} = resolve(duckling));
        store = createStore(reducer, applyMiddleware(record));
        initialState = store.getState();
      });

      it('should have the correct type string', () => {
        duckling.is.should.eql('ducklings/app/unlock');
      });

      it('should extend errorBehavior', () => {
        duckling[0].should.equal(errorBehavior);
      });

      describe('initial state', () => {
        it('should not be complete', () => {
          app.isComplete(initialState).should.be.false;
        });

        it('should not have settings', () => {
          expect(app.getSettings(initialState)).to.be.undefined;
        });
      });

      describe('then submit', () => {
        describe('with no error', () => {
          beforeEach(() => {
            serviceHelper.reset();
            serviceHelper.setResults([{
              success: settings,
            }]);
            changes = [];
            store.dispatch(app.submit(secret));
          });

          it('should unlock the settings', () => {
            service.unlock.should.have.been.calledWith(secret);
          });

          it('should go through the correct changes', () => {
            changes.length.should.eql(1);
            changes[0].action.type.should.eql(app.submit.toString());
            changes[0].action.payload.should.eql(settings);
            app.isComplete(changes[0].state).should.be.true;
            app.getSettings(changes[0].state).should.eql(settings);
          });
        });

        describe('with an error', () => {
          beforeEach(() => {
            serviceHelper.reset();
            serviceHelper.setResults([{
              error,
            }]);
            changes = [];
            store.dispatch(app.submit(secret));
          });

          it('should try to unlock the settings', () => {
            service.unlock.should.have.been.calledWith(secret);
          });

          it('should go through the correct changes', () => {
            changes.length.should.eql(1);
            changes[0].action.type.should.eql(app.submit.toString());
            changes[0].action.payload.should.eql(error);
            changes[0].action.error.should.be.true;
            app.hasError(changes[0].state).should.be.true;
            app.isComplete(changes[0].state).should.be.false;
            expect(app.getSettings(changes[0].state)).to.be.undefined;
          });
        });
      });
    });
  });
});
