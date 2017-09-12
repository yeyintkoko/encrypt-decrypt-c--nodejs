
/*global console*/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _bl = require('bl');

/**
 * CrossPlatform CryptLib
   * This cross platform CryptLib uses AES 256 for encryption. This library can
   * be used for encryptoion and de-cryption of string on iOS, Android, Windows
   * and Node platform.
   * Features:
   * 1. 256 bit AES encryption
   * 2. Random IV generation.
   * 3. Provision for SHA256 hashing of key.
 */

var _bl2 = _interopRequireDefault(_bl);

var CryptLib = (function () {
  function CryptLib() {
    _classCallCheck(this, CryptLib);

    this._maxKeySize = 32;
    this._maxIVSize = 16;
    this._algorithm = 'AES-256-CBC';
    this._charset = 'utf8';
    this._encoding = 'base64';
    this._hashAlgo = 'sha256';
    this._digestEncoding = 'hex';

    this._characterMatrixForRandomIVStringGeneration = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', '_'];
  }

  /**
   * private function: _encryptDecrypt
   * encryptes or decrypts to or from text or encrypted text given an iv and key
   * @param  {string}  text        can be plain text or encrypted text
   * @param  {string}  key         the key used to encrypt or decrypt
   * @param  {string}  initVector  the initialization vector to encrypt or
   *                               decrypt
   * @param  {bool}    isEncrypt   true = encryption, false = decryption
   * @return {string}              encryted text or plain text
   */

  _createClass(CryptLib, [{
    key: '_encryptDecrypt',
    value: function _encryptDecrypt(text, key, initVector, isEncrypt) {

      if (!text || !key) {
        throw 'cryptLib._encryptDecrypt: -> key and plain or encrypted text ' + 'required';
      }

      var ivBl = new _bl2['default'](),
          keyBl = new _bl2['default'](),
          keyCharArray = key.split(''),
          ivCharArray = [],
          encryptor = undefined,
          decryptor = undefined,
          clearText = undefined;

      if (initVector && initVector.length > 0) {
        ivCharArray = initVector.split('');
      }

      for (var i = 0; i < this._maxIVSize; i++) {
        ivBl.append(ivCharArray.shift() || [null]);
      }

      for (var i = 0; i < this._maxKeySize; i++) {
        keyBl.append(keyCharArray.shift() || [null]);
      }

      if (isEncrypt) {
        encryptor = _crypto2['default'].createCipheriv(this._algorithm, keyBl.toString(), ivBl.toString());
        encryptor.setEncoding(this._encoding);
        encryptor.write(text);
        encryptor.end();
        return encryptor.read();
      }

      decryptor = _crypto2['default'].createDecipheriv(this._algorithm, keyBl.toString(), ivBl.toString());
      var dec = decryptor.update(text, this._encoding, this._charset);
      dec += decryptor.final(this._charset);
      return dec;
    }

    /**
     * private function: _isCorrectLength
     * checks if length is preset and is a whole number and > 0
     * @param  {int}  length
     * @return {bool}
    */
  }, {
    key: '_isCorrectLength',
    value: function _isCorrectLength(length) {
      return length && /^\d+$/.test(length) && parseInt(length, 10) !== 0;
    }

    /**
     * generates random initaliztion vector given a length
     * @param  {int}  length  the length of the iv to be generated
     */
  }, {
    key: 'generateRandomIV',
    value: function generateRandomIV(length) {
      if (!this._isCorrectLength(length)) {
        throw 'cryptLib.generateRandomIV() -> needs length or in wrong format';
      }

      var randomBytes = _crypto2['default'].randomBytes(length),
          _iv = [];

      for (var i = 0; i < length; i++) {
        var ptr = randomBytes[i] % this._characterMatrixForRandomIVStringGeneration.length;
        _iv[i] = this._characterMatrixForRandomIVStringGeneration[ptr];
      }
      return _iv.join('');
    }

    /**
     * Creates a hash of a key using SHA-256 algorithm
     * @param  {string} key     the key that will be hashed
     * @param  {int}    length  the length of the SHA-256 hash
     * @return {string}         the output hash generated given a key and length
     */
  }, {
    key: 'getHashSha256',
    value: function getHashSha256(key, length) {
      if (!key) {
        throw 'cryptLib.getHashSha256() -> needs key';
      }

      if (!this._isCorrectLength(length)) {
        throw 'cryptLib.getHashSha256() -> needs length or in wrong format';
      }

      return _crypto2['default'].createHash(this._hashAlgo).update(key).digest(this._digestEncoding).substring(0, length);
    }

    /**
     * encryptes plain text given a key and initialization vector
     * @param  {string}  text        can be plain text or encrypted text
     * @param  {string}  key         the key used to encrypt or decrypt
     * @param  {string}  initVector  the initialization vector to encrypt or
     *                               decrypt
     * @return {string}              encryted text or plain text
     */
  }, {
    key: 'encrypt',
    value: function encrypt(plainText, key, initVector) {
      return this._encryptDecrypt(plainText, key, initVector, true);
    }

    /**
     * decrypts encrypted text given a key and initialization vector
     * @param  {string}  text        can be plain text or encrypted text
     * @param  {string}  key         the key used to encrypt or decrypt
     * @param  {string}  initVector  the initialization vector to encrypt or
     *                               decrypt
     * @return {string}              encryted text or plain text
     */
  }, {
    key: 'decrypt',
    value: function decrypt(encryptedText, key, initVector) {
      return this._encryptDecrypt(encryptedText, key, initVector, false);
    }
  }]);

  return CryptLib;
})();

exports['default'] = new CryptLib();
module.exports = exports['default'];