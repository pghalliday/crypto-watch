import resolve from 'redux-duckling';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import ServiceHelper from '../../../helpers/service';
import Service from '../../../../src/services/storage';

import asyncBehavior from '../../../../src/lib/ducklings/async-behavior';
import factory from '../../../../src/ducklings/app';

const namespace = 'crypto-watch';
const count = 0;
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
    beforeEach(() => {
      service = new Service(namespace);
      serviceHelper = new ServiceHelper(service, {
        initialize: true,
        unlock: false,
        create: true,
        delete: true,
        clear: true,
        update: true,
      });
      duckling = factory(service);
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

    it('should contain the unlock duckling', () => {
      duckling[1].unlock.is.should.eql('ducklings/app/unlock');
      duckling[1].unlock.args.should.eql([service]);
    });

    it('should contain the create duckling', () => {
      duckling[1].create.is.should.eql('ducklings/app/create');
      duckling[1].create.args.should.eql([service]);
    });

    it('should contain the delete duckling', () => {
      duckling[1].delete.is.should.eql('ducklings/app/delete');
      duckling[1].delete.args.should.eql([service]);
    });

    it('should contain the clear duckling', () => {
      duckling[1].clear.is.should.eql('ducklings/app/clear');
      duckling[1].clear.args.should.eql([service]);
    });

    it('should contain the changeSecret duckling', () => {
      duckling[1].changeSecret.is.should.eql('ducklings/app/change-secret');
      duckling[1].changeSecret.args.should.eql([service]);
    });

    describe('initial state', () => {
      it('should not have settings entries', () => {
        app.hasSettings(initialState).should.be.false;
      });

      it('should not be unlocked', () => {
        app.isUnlocked(initialState).should.be.false;
      });

      it('should not have active settings', () => {
        expect(app.getSettings(initialState)).to.be.undefined;
      });
    });

    describe('then initialize', () => {
      describe('with no error', () => {
        beforeEach(async () => {
          serviceHelper.reset();
          serviceHelper.setResults([{
            success: count,
          }]);
          changes = [];
          await store.dispatch(app.initialize());
        });

        it('should initialize the service', () => {
          service.initialize.should.have.been.calledOnce;
        });

        it('should go through the correct changes', () => {
          changes.length.should.eql(2);
          changes[0].action.type.should.eql(app.start.toString());
          app.hasSettings(changes[0].state).should.be.false;
          app.isUnlocked(changes[0].state).should.be.false;
          expect(app.getSettings(changes[0].state)).to.be.undefined;
          changes[1].action.type.should.eql(app.complete.toString());
          changes[1].action.payload.should.eql(count);
          expect(changes[1].action.error).to.be.undefined;
          app.hasSettings(changes[1].state).should.be.false;
          app.isUnlocked(changes[1].state).should.be.false;
          expect(app.getSettings(changes[1].state)).to.be.undefined;
        });

        describe('then complete unlock', () => {
          beforeEach(() => {
            serviceHelper.reset();
            serviceHelper.setResults([{
              success: settings,
            }]);
            store.dispatch(app.unlock.submit(secret));
            changes = [];
            store.dispatch(app.completeUnlock(settings));
          });

          it('should change the state once', () => {
            changes.length.should.eql(1);
          });

          it('should set the isUnlocked flag', () => {
            app.isUnlocked(changes[0].state).should.be.true;
          });

          it('should set the settings', () => {
            app.getSettings(changes[0].state).should.equal(settings);
          });

          it('should reset the unlock operation', () => {
            app.unlock.isComplete(changes[0].state).should.be.false;
          });
        });

        describe('then complete create', () => {
          beforeEach(() => {
            serviceHelper.reset();
            serviceHelper.setResults([{
              success: count + 1,
            }]);
            store.dispatch(app.create.submit(secret, settings));
            changes = [];
            store.dispatch(app.completeCreate({
              settings,
              count: count + 1,
            }));
          });

          it('should change the state once', () => {
            changes.length.should.eql(1);
          });

          it('should set the isUnlocked flag', () => {
            app.isUnlocked(changes[0].state).should.be.true;
          });

          it('should set the settings', () => {
            app.getSettings(changes[0].state).should.equal(settings);
          });

          it('should update the count', () => {
            app.hasSettings(changes[0].state).should.be.true;
          });

          it('should reset the create operation', () => {
            app.create.isComplete(changes[0].state).should.be.false;
          });

          describe('then complete delete', () => {
            beforeEach(() => {
              serviceHelper.reset();
              serviceHelper.setResults([{
                success: count,
              }]);
              store.dispatch(app.delete.submit());
              changes = [];
              store.dispatch(app.completeDelete({
                count,
              }));
            });

            it('should change the state once', () => {
              changes.length.should.eql(1);
            });

            it('should set the isUnlocked flag', () => {
              app.isUnlocked(changes[0].state).should.be.false;
            });

            it('should unset the settings', () => {
              expect(app.getSettings(changes[0].state)).to.be.undefined;
            });

            it('should update the count', () => {
              app.hasSettings(changes[0].state).should.be.false;
            });

            it('should reset the delete operation', () => {
              app.delete.isComplete(changes[0].state).should.be.false;
            });
          });

          describe('then complete clear', () => {
            beforeEach(() => {
              serviceHelper.reset();
              serviceHelper.setResults([{
                success: count,
              }]);
              store.dispatch(app.clear.submit());
              changes = [];
              store.dispatch(app.completeClear());
            });

            it('should change the state once', () => {
              changes.length.should.eql(1);
            });

            it('should set the isUnlocked flag', () => {
              app.isUnlocked(changes[0].state).should.be.false;
            });

            it('should unset the settings', () => {
              expect(app.getSettings(changes[0].state)).to.be.undefined;
            });

            it('should update the count', () => {
              app.hasSettings(changes[0].state).should.be.false;
            });

            it('should reset the clear operation', () => {
              app.clear.isComplete(changes[0].state).should.be.false;
            });
          });
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
          app.hasSettings(changes[0].state).should.be.false;
          app.isUnlocked(changes[0].state).should.be.false;
          expect(app.getSettings(changes[0].state)).to.be.undefined;
          changes[1].action.type.should.eql(app.complete.toString());
          changes[1].action.payload.should.eql(error);
          changes[1].action.error.should.be.true;
          app.hasSettings(changes[1].state).should.be.false;
          app.isUnlocked(changes[1].state).should.be.false;
          expect(app.getSettings(changes[1].state)).to.be.undefined;
        });
      });
    });
  });
});
