function encrypt(text, key) {
  var CryptoJS = require("crypto-js");
	var key = CryptoJS.enc.Utf8.parse(key);
	var iv = CryptoJS.enc.Base64.parse('QUJDREVGR0g=');
	var encoded = CryptoJS.enc.Utf8.parse(text);
	var ciphertext = CryptoJS.TripleDES.encrypt(encoded, key, { mode: CryptoJS.mode.CBC, iv: iv });

	return ciphertext.toString();
}

function decrypt(encryptedText, key) {
  var CryptoJS = require("crypto-js");
	var key = CryptoJS.enc.Utf8.parse(key);
	var iv = CryptoJS.enc.Base64.parse('QUJDREVGR0g=');
	var bytes = CryptoJS.TripleDES.decrypt(encryptedText, key, { mode: CryptoJS.mode.CBC, iv: iv });
  var decryptedText = bytes.toString(CryptoJS.enc.Utf8);

	return decryptedText;
}


var text = 'The text to be encrypted';
var securityKey = 'abcdefghijklmnopabcdefgh';
let encryptedText = encrypt(text, securityKey);
let decryptedText = decrypt(encryptedText, securityKey);

console.log('encrypted text:', encryptedText);
console.log('decrypted text:', decryptedText);
