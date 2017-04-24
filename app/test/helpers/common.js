// assertion styles
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);
global.expect = chai.expect;
global.sinon = sinon;

// helper to seed the require cache with our own exports
function _seedRequireCache(name, exports) {
  const path = require.resolve(name);
  require.cache[path] = {
    id: path,
    exports: exports,
  };
}
