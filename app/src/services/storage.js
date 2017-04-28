import localforage from 'localforage';
import sha256 from 'crypto-js/sha256';
import aes from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

const EMPTY_DATA = {};

export default class {
  constructor(namespace) {
    this.namespace = namespace;
  }

  async write() {
    await localforage.setItem(this.namespace, this.data);
  }

  async initialize() {
    await localforage.ready();
    this.data = await localforage.getItem(this.namespace) || EMPTY_DATA;
    return Object.keys(this.data).length;
  }

  async clear() {
    await localforage.removeItem(this.namespace);
    delete this.secret;
    delete this.key;
  }

  async delete() {
    delete this.data[this.key];
    delete this.secret;
    delete this.key;
    await this.write();
  }

  async update(data) {
    this.data[this.key] = aes.encrypt(
      JSON.stringify(data),
      this.secret,
    ).toString();
    await this.write();
  }

  async create(secret, data) {
    this.secret = secret;
    this.key = sha256(secret).toString();
    await this.update(data);
  }

  async changeSecret(secret, data) {
    await this.delete();
    this.secret = secret;
    this.key = sha256(secret).toString();
    await this.update(data);
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
