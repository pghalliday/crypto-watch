import * as app from '../../src';

describe('app', () => {
  it('should export the store', () => {
    app.store.should.be.ok;
  });
});
