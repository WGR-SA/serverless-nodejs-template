const
crypto = require('crypto'),
algorithm = 'aes-256-ctr',
secretKey = require('../../config/main').key,
iv = require('../../config/main').iv,

encrypt = (text) =>
{
  const cipher = crypto.createCipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return encrypted.toString('hex')
},

decrypt = (hash) =>
{
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));

  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);

  return decrpyted.toString()
}

module.exports = {
  encrypt,
  decrypt
};
