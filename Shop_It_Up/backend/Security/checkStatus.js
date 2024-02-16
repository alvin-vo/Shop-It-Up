/* 
   Encrypt/Decrypt
   Included: CryptoJS, Lodash
*/
require("dotenv").config();

var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");

var _ = require('lodash');

// ENCRYPT DECRYPT SECURITY

const encryptServer = async () => {
  var encrypted = CryptoJS.AES.encrypt(process.env.USER_PASSWORD, process.env.USER_PASSPHRASE);
  return encrypted;
};

const encryptNow = async (passedInPassword, passedInPassphrase) => {
  var encrypted = CryptoJS.AES.encrypt(passedInPassword, passedInPassphrase);
  return encrypted;
};

const decryptNow = async (passedInEncrypted, passedInPassphrase) => {
  var decrypted = CryptoJS.AES.decrypt(passedInEncrypted, passedInPassphrase);
  return decrypted;
};

// EMAIL SECURITY

const encryptEmail = async (passedInEmail) => {
  var encrypted = CryptoJS.AES.encrypt(passedInEmail, process.env.EMAIL_PASSPHRASE).toString();
  return encrypted;
};
  
const decryptEmail = async (passedInEmail) => {
  var decrypted = CryptoJS.AES.decrypt(passedInEmail, process.env.EMAIL_PASSPHRASE);
  var originalText = decrypted.toString(CryptoJS.enc.Utf8);
  return originalText;
};

// TODO: ADD EMAIL IMPLEMENTATION
async function sendEmail(passedInEmail, passedInCartId) {
  console.log(passedInEmail);
  console.log(passedInCartId);

  return false;
};

// CHECKER:

const checkCorrect = async (passedInServerDecrypted, passedInUserDecrypted) => {
  if(_.isEqual(passedInServerDecrypted, passedInUserDecrypted)) {
    return true;
  }
  return false;
}; 

module.exports = {
  encryptServer,
  encryptNow,
  decryptNow,
  encryptEmail,
  decryptEmail,
  sendEmail,
  checkCorrect,
};