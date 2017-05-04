import localforage from 'localforage';
import sha256 from 'crypto-js/sha256';
import aes from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

function immutableDelete(object, key) {
  const newObject = {
    ...object,
  };
  delete newObject[key];
  return newObject;
}

export default class {
  constructor(namespace) {
    this.namespace = namespace;
  }

  get count() {
    return Object.keys(this.data).length;
  }

  async write(data) {
    await localforage.setItem(this.namespace, data);
    this.data = data;
  }

  async initialize() {
    await localforage.ready();
    this.data = await localforage.getItem(this.namespace) || {};

    // These commented out lines are here to allow visual verification
    // of unusual UI test cases.
    //
    // This line delays initialization so that the pending view
    // can be checked.
    //
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    //
    // This line fails initialization so that the error view can
    // be checked.
    //
    // throw new Error('FAIL');

    return this.count;
  }

  async clear() {
    await localforage.removeItem(this.namespace);
    delete this.secret;
    delete this.key;
    this.data = {};
    return this.count;
  }

  async delete() {
    await this.write(immutableDelete(this.data, this.key));
    delete this.secret;
    delete this.key;
    return this.count;
  }

  async update(data) {
    await this.write({
      ...this.data,
      [this.key]: aes.encrypt(
        JSON.stringify(data),
        this.secret,
      ).toString(),
    });
  }

  async create(secret, data) {
    const key = sha256(secret).toString();
    await this.write({
      ...this.data,
      [key]: aes.encrypt(
        JSON.stringify(data),
        secret,
      ).toString(),
    });
    this.secret = secret;
    this.key = key;
    return this.count;
  }

  async changeSecret(secret, data) {
    const key = sha256(secret).toString();
    await this.write({
      ...immutableDelete(this.data, this.key),
      [key]: aes.encrypt(
        JSON.stringify(data),
        secret,
      ).toString(),
    });
    this.secret = secret;
    this.key = key;
  }

  unlock(secret) {
    this.secret = secret;
    this.key = sha256(secret).toString();
    const encrypted = this.data[this.key];
    if (typeof encrypted === 'undefined') {
      throw new Error('unknown secret');
    }
    return JSON.parse(aes.decrypt(encrypted, this.secret).toString(Utf8));
  }
}
