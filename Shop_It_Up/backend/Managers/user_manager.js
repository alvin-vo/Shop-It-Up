/* 
   Managers are essentially going to handle the logic that the routes does not need to know about.
   It should be the only thing that commuicates with the DAOs.
*/

const userDAO = require("../AccessObjects/user_dao.js");
const guard = require("../Security/check_status.js");

// USER:

const createUser = async (userInfo) => {
  await userDAO.createNewUser(userInfo.userId, userInfo.email);
};

const getUser = async () => {};

// SHOULD BE PASSWORD PROTECTED
const getAll = async (passedInVariablePassword, passedInVariablePassphrase) => {
  // Encrypt Server
  const encryptedServerMessage = await guard.encryptServer();
  const decryptedServerMessage = await guard.decryptNow(
    encryptedServerMessage,
    passedInVariablePassphrase
  );

  // Encrypt User
  const encryptedUserMessage = await guard.encryptNow(
    passedInVariablePassword,
    passedInVariablePassphrase
  );
  const decryptedUserMessage = await guard.decryptNow(
    encryptedUserMessage,
    passedInVariablePassphrase
  );

  // Check: Should be TRUE
  const checkNow = await guard.checkCorrect(
    decryptedServerMessage,
    decryptedUserMessage
  );

  // TRUE: Get all users
  if (checkNow) {
    return await userDAO.getAllUsers();
  }
  return null; // Return null if FALSE
};

// PRODUCTS:

const addProductToSell = async () => {};

const removeProductToSell = async () => {};

// INVITES:

// Checks if Valid User and Valid Cart, returns TRUE
const sendInvite = async (passedInId) => {
  // Check if User Exists
  const valUser = await checkValidUser(passedInId);
  if (valUser == null) {
    return null;
  }
  // Check if Cart Exists
  const valCart = await checkValidCart(valUser);
  if (valCart == null) {
    return null;
  }

  // All tests passed
  return await userDAO.sendHandler(valUser);
};

const acceptInvite = async () => {
  return null;
};

// HELPERS:

// Validate User, returns TRUE
async function checkValidUser(userToValidate) {
  const userResult = await userDAO.getOnlyUser(userToValidate);
  if (userResult == null) {
    return null;
  }
  return userResult;
}

// Validate Cart, returns TRUE
async function checkValidCart(cartToValidate) {
  // Get Cart Id
  const getCartId = cartToValidate.cartId;
  // No cartId, Can't Invite
  if (getCartId == undefined) {
    return null;
  }
  return getCartId;
}

module.exports = {
  createUser,
  // updateUser,
  getUser,
  getAll,
  addProductToSell,
  removeProductToSell,
  acceptInvite,
  sendInvite,
};
