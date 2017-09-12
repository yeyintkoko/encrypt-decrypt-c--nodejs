### Encrypt Decrypt in C# and Node.js

Basic useful feature list:

 * Encrypt in C# and decrypt in Node.js
 * Encrypt in Node.js and decrypt in C#
 * No third party library require for C#
 * Node.js require crypto npm package only

Encrypt text with a security key (***no spacing and 16 characters is required for security key***). Decrypt the encrypted text with the same security key from encryption.

--------------
For C# (you can just copy the below code into your project.)
Below is the example code from a console project.

```
public static string Encrypt(string source, string key)
        {
            TripleDESCryptoServiceProvider desCryptoProvider = new TripleDESCryptoServiceProvider();

            byte[] byteBuff;

            try
            {
                desCryptoProvider.Key = Encoding.UTF8.GetBytes(key);
                desCryptoProvider.IV = UTF8Encoding.UTF8.GetBytes("ABCDEFGH");
                byteBuff = Encoding.UTF8.GetBytes(source);

                string iv = Convert.ToBase64String(desCryptoProvider.IV);
                Console.WriteLine("iv: {0}", iv);

                string encoded =
                    Convert.ToBase64String(desCryptoProvider.CreateEncryptor().TransformFinalBlock(byteBuff, 0, byteBuff.Length));

                return encoded;
            }
            catch (Exception except)
            {
                Console.WriteLine(except + "\n\n" + except.StackTrace);
                return null;
            }            
        }

        public static string Decrypt(string encodedText, string key)
        {
            TripleDESCryptoServiceProvider desCryptoProvider = new TripleDESCryptoServiceProvider();

            byte[] byteBuff;

            try
            {
                desCryptoProvider.Key = Encoding.UTF8.GetBytes(key);
                desCryptoProvider.IV = UTF8Encoding.UTF8.GetBytes("ABCDEFGH");
                byteBuff = Convert.FromBase64String(encodedText);

                string plaintext = Encoding.UTF8.GetString(desCryptoProvider.CreateDecryptor().TransformFinalBlock(byteBuff, 0, byteBuff.Length));
                return plaintext;
            } catch (Exception except) {
                Console.WriteLine(except + "\n\n" + except.StackTrace);
                return null;
            }


        }

        static void Main(string[] args)
        {
            var encrypted = Encrypt("The text to be encrypted", "abcdefghijklmnop");

            Console.WriteLine("encrypted as: {0}", encrypted);

            var decrypted = Decrypt(encrypted, "abcdefghijklmnop");
            Console.WriteLine("decrypted as: {0}", decrypted);

            Console.ReadLine();
        }
```
-------------

For Node.js (you can just copy the code into your project. Don't forget to install crypto npm package)

```js
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

```
