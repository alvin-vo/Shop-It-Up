/* 
   Managers are essentially going to handle the logic that the routes does not need to know about.
   It should be the only thing that commuicates with the DAOs.
*/

const userDAO = require("../AccessObjects/user_dao.js");
const guard = require("../Security/check_status.js");

const { getOnlyProduct } = require("../AccessObjects/product_dao.js");
const { checkBody } = require("../Managers/product_manager.js");

// USER:

const createUser = async (userInfo) => {
  await userDAO.createNewUser(userInfo.userId, userInfo.email);
};

const getUser = async (userToFind, passedInVariablePassword, passedInVariablePassphrase) => {
  // Encrypt Server
  const encryptedServerMessage = await guard.encryptServer();
  const decryptedServerMessage = await guard.decryptNow(encryptedServerMessage, passedInVariablePassphrase);
  
  // Encrypt User
  const encryptedUserMessage = await guard.encryptNow(passedInVariablePassword, passedInVariablePassphrase);
  const decryptedUserMessage = await guard.decryptNow(encryptedUserMessage, passedInVariablePassphrase);

  // Check: Should be TRUE
  const checkNow = await guard.checkCorrect(decryptedServerMessage, decryptedUserMessage);

  // TRUE: Get all users
  if(checkNow) {
    return await await userDAO.getExisitngUserInfo(userToFind); 
  }
  return null; // Return null if FALSE
};

// SHOULD BE PASSWORD PROTECTED
const getAll = async (passedInVariablePassword, passedInVariablePassphrase) => {
  // Encrypt Server
  const encryptedServerMessage = await guard.encryptServer();
  const decryptedServerMessage = await guard.decryptNow(encryptedServerMessage, passedInVariablePassphrase);
  
  // Encrypt User
  const encryptedUserMessage = await guard.encryptNow(passedInVariablePassword, passedInVariablePassphrase);
  const decryptedUserMessage = await guard.decryptNow(encryptedUserMessage, passedInVariablePassphrase);

  // Check: Should be TRUE
  const checkNow = await guard.checkCorrect(decryptedServerMessage, decryptedUserMessage);

  // TRUE: Get all users
  if(checkNow) {
    return await userDAO.getAllUsers(); 
  }
  return null; // Return null if FALSE
 };

// PRODUCTS:

const addProductToSell = async (passedInUserId, passedInProductId, passedInBody)=> {
  // Product Doesn't Exist
  const checkOne = await checkValidProductToSell(passedInProductId);
  if(checkOne == true) {
    // Req.body is Correct
    const checkTwo = await checkBody(passedInBody);
    if(checkTwo == true) {
      const confirmation = await userDAO.addProduct(passedInUserId, passedInProductId, passedInBody)
      if(confirmation == true) {
        return true;
      }  
    }
  }
  return false;
};

const removeProductToSell = async (passedInUserId, passedInProductId) => {
  const valUser = await checkValidOwner(passedInUserId, passedInProductId);
  if(valUser == null) {
    return false;
  } else if (valUser == true) {
    const confirmation = await userDAO.removeProduct(passedInProductId);  
    if(confirmation == true) {
      return true;
    } 
  }  
  return false;
};

// INVITES:

// Checks if Valid User and Valid Cart, returns TRUE
const sendInvite = async (passedInId) => {
  // Check if User Exists
  const valUser = await checkValidUser(passedInId);
  if(valUser == null) {
    return null;
  }
  // Check if Cart Exists
  const valCart = await checkValidCart(valUser);
  if(valCart == null) {
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
  if(userResult == null) {
    return null;
  }
  return userResult;
};

// Validate Cart, returns TRUE
async function checkValidCart(cartToValidate) {
  // Get Cart Id
  const getCartId = cartToValidate.cartId;
  // No cartId, Can't Invite
  if(getCartId == undefined){
    return null;
  }
  return getCartId;
};

// Validate Product Doesn't Exist
async function checkValidProductToSell(productIdToValidate) {
  const product = await getOnlyProduct(productIdToValidate);
  if(product == null) {
    return true;
  }
  return false;
};

// Validate Product Belongs to User
async function checkValidOwner(userIdToValidate, productIdToValidate) {
  const product = await getOnlyProduct(productIdToValidate);
  if(product == null) {
    return null;
  }
  if(product.sellerId == userIdToValidate) {
    return true;
  }
  return false;
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
