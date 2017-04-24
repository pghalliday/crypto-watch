import * as app from '../../src';

describe('app', () => {
  it('should export the store', () => {
    app.store.should.be.ok;
  });

  it('should export the start method', () => {
    app.start.should.be.ok;
  });
});
