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
function seedRequireCache(name, exports) {
  const path = require.resolve(name);
  require.cache[path] = {
    id: path,
    exports: exports,
  };
}

// stub the localforage API for testing in node
import localforage from './localforage';
seedRequireCache('localforage', localforage);

// stub the crypto-js AES API as it is non-deterministic
import aes from './aes';
seedRequireCache('crypto-js/aes', aes);
