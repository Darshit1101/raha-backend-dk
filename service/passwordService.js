const bcrypt = require('bcrypt');
const saltRounds = 12;
const CryptoJS = require('crypto-js');
const _secretKey = 'aSd3Rqwe3gn&%3)@3'; //this key should be same in frontend

//User Registration or Password Update
exports.createHashPwd = function (password) {
  return bcrypt.hashSync(password, saltRounds);
};

//User Login, Password Re-verification, Multi-factor Authentication
exports.comparePwd = function (password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
};

//Unlocks a hidden password
exports.decryptPwd = function (cipherText) {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, _secretKey);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    return originalPassword;
  } catch (error) {
    console.log('Error in decryptPwd: ', error);
  }
};

//plainText is the password to be encrypted (change the password time use)
exports.encryptPwd = function (plainText) {
  // return simpleCrypto.encrypt(plainText);
  const encryptPassword = CryptoJS.AES.encrypt(plainText, _secretKey).toString();
  return encryptPassword;
};
