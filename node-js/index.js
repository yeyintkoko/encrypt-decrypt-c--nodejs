function encrypt(text, key) {
  var crypto = require('crypto');
  var alg = 'des-ede-cbc';
  var key = new Buffer(key, 'utf-8');
  var iv = new Buffer('QUJDREVGR0g=', 'base64');    //This is from c# cipher iv

  var cipher = crypto.createCipheriv(alg, key, iv);
  var encoded = cipher.update(text, 'ascii', 'base64');
  encoded += cipher.final('base64');

  return encoded;
}

function decrypt(encryptedText, key) {
  var crypto = require('crypto');
  var alg = 'des-ede-cbc';
  var key = new Buffer(key, 'utf-8');
  var iv = new Buffer('QUJDREVGR0g=', 'base64');    //This is from c# cipher iv

  var encrypted = new Buffer(encryptedText, 'base64');
  var decipher = crypto.createDecipheriv(alg, key, iv);
  var decoded = decipher.update(encrypted, 'binary', 'ascii');
  decoded += decipher.final('ascii');

  return decoded;
}

var text = 'The text to be encrypted';
var securityKey = 'abcdefghijklmnop';
var encryptedText = encrypt(text, securityKey);
var decryptedText = decrypt(encryptedText, securityKey);

console.log('encrypted text:', encryptedText);
console.log('decrypted text:', decryptedText);
