# cryptlib [![Build Status](https://travis-ci.org/invalidred/cryptlib.svg?branch=master)](https://travis-ci.org/invalidred/cryptlib)

A module to encrypt/decrypt string in Node, written in ES6 (src folder) and transpiled using Babel to ES5(dist folder).

Using companion framework libraries, you should be able to encrypt/decrypt between node, iOS, Android and Windows platforms.

Companion libs can be found here: [Cross Platform AES Encryption](https://github.com/Pakhee/Cross-platform-AES-encryption)


## Installation

`npm install cryptlib --save`

## Usage

### Encrypt

```javascript
var cryptLib = require('cryptlib'),
    iv = cryptLib.generateRandomIV(16), //16 bytes = 128 bit
    key = cryptLib.getHashSha256('my secret key', 32), //32 bytes = 256 bits
    encryptedText = cryptLib.encrypt('This is the text to be encrypted', key, iv);
```

### Decrypt

```javascript
var cryptLib = require('cryptlib'),
    iv = 'iv vector used for encryption',
    key = cryptLib.getHashSha256('my secret key', 32), //32 bytes = 256 bits
    originalText = cryptLib.decrypt('M2rfrn9DqNHJe3Hev9nMxKKgIHoqUsc7FJM+tBGxIrl3Wk9UeKIQ5fRUUZF3q2i5', key, iv);
```

## Run Code Sample

`npm start`

## Tests

`npm test`

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 2015-09-14	1.0.3 fixed issue with Package.json
* 2015-07-31    1.0.2 Integrated travis ci
* 2015-07-30    1.0.1 Few basic structure changes
* 2015-07-26    1.0.0 Initial release

## License

MIT license; see [LICENSE](./LICENSE).

(c) 2015 by Abdul Khan and Alexey Novak
