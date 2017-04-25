import localforage from 'localforage';
import sha256 from 'crypto-js/sha256';
import aes from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

export default class {
  async initialize() {
    await localforage.ready();
    return await localforage.length();
  }

  async clear() {
    await localforage.clear();
    delete this.secret;
    delete this.key;
  }

  async delete() {
    await localforage.removeItem(this.key);
    delete this.secret;
    delete this.key;
  }

  async update(data) {
    await localforage.setItem(this.key, aes.encrypt(
      JSON.stringify(data),
      this.secret,
    ).toString());
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

  async unlock(secret) {
    this.secret = secret;
    this.key = sha256(secret).toString();
    const encrypted = await localforage.getItem(this.key);
    if (encrypted === null) {
      throw new Error('unknown secret');
    }
    return JSON.parse(aes.decrypt(encrypted, this.secret).toString(Utf8));
  }
}
