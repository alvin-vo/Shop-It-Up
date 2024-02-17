/* 
   Managers are essentially going to handle the logic that the routes does not need to know about.
   It should be the only thing that commuicates with the DAOs.
*/

const UserDAO = require("../AccessObjects/UserDAO.js");

const Guard = require("../Security/checkStatus.js")

// USER:

const createUser = async (userInfo) => {
  await UserDAO.createNewUser(userInfo.userId, userInfo.email);
};

const getUser = async () => {};

// SHOULD BE PASSWORD PROTECTED
const getAll = async (passedInVariablePassword, passedInVariablePassphrase) => {
  // Encrypt Server
  const encryptedServerMessage = await Guard.encryptServer();
  const decryptedServerMessage = await Guard.decryptNow(encryptedServerMessage, passedInVariablePassphrase);
  
  // Encrypt User
  const encryptedUserMessage = await Guard.encryptNow(passedInVariablePassword, passedInVariablePassphrase);
  const decryptedUserMessage = await Guard.decryptNow(encryptedUserMessage, passedInVariablePassphrase);

  // Check: Should be TRUE
  const checkNow = await Guard.checkCorrect(decryptedServerMessage, decryptedUserMessage);

  // TRUE: Get all users
  if(checkNow) {
    return await UserDAO.getAllUsers(); 
  }
  return null; // Return null if FALSE
 };

// PRODUCTS:

const addProductToSell = async () => {};

const removeProductToSell = async () => {};

// INVITES:

const sendInvite = async (passedInId) => {
  const valUser = await checkValidUser(passedInId);
  if(valUser == null) {
    return null;
  }
  return await UserDAO.sendHandler(valUser);
};

const acceptInvite = async () => {

  return null;
};

// HELPERS:

// Validate User, returns TRUE
async function checkValidUser(userToValidate) {
  const userResult = await UserDAO.getOnlyUser(userToValidate);
  if(userResult == null) {
    return null;
  }
  return userResult;
};

module.exports = {
  createUser,
  getUser,
  getAll,
  addProductToSell,
  removeProductToSell,
  acceptInvite,
  sendInvite,
};
