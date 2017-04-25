import Utf8 from 'crypto-js/enc-utf8';

const PREFIX = 'aes-encrypted:';
const ENCODING_ERROR = new Error('INVALID_ENCODING');

function encodeSecret(secret) {
  return `${secret}:`;
}

function encrypt(text, secret) {
  return `${PREFIX}${encodeSecret(secret)}${text}`;
}

function decrypt(encryptedText, secret) {
  if (encryptedText.startsWith(PREFIX)) {
    encryptedText = encryptedText.slice(PREFIX.length);
    const encodedSecret = encodeSecret(secret);
    if (encryptedText.startsWith(encodedSecret)) {
      return encryptedText.slice(encodedSecret.length);
    }
    return '';
  }
  return '';
}

class CipherText {
  constructor(text, secret) {
    this.encryptedText = encrypt(text, secret);
  }

  toString() {
    return this.encryptedText;
  }
};

class Bytes {
  constructor(encryptedText, secret) {
    this.text = decrypt(encryptedText, secret);
  }

  toString(enc) {
    if (enc !== Utf8) {
      throw ENCODING_ERROR;
    }
    return this.text;
  };
};

module.exports = {
  encrypt: (text, secret) => new CipherText(text, secret),
  decrypt: (encryptedText, secret) => new Bytes(encryptedText, secret),
  helpers: {
    encrypt,
    decrypt,
    ENCODING_ERROR,
  },
};
