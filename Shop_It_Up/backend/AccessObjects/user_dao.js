/* 
These are the interfaces that communicate with the models. 
The models communicate with the database.
*/

const user = require("../Models/user_model.js");

const guard = require("../Security/check_status.js");

// USER:

const createNewUser = async (userId, passedInEmail) => {
  const userID = userId;
  const existingUser = await user.findOne({ userId: userID });

  // ENCRYPT EMAIL FOR INVITE
  const encryptEmail = await guard.encryptEmail(passedInEmail);

  if (!existingUser) {
    new user({
      userId: userID,
      email: encryptEmail,
      productsToSell: [],
      cartId: "123434",
    }).save();

    return userID;
  } else {
    return null;
  }
};

const getExisitngUserInfo = async () => {};

const getAllUsers = async () => {
  const existingUsers = await user.find();
  return existingUsers;
};

// PRODUCTS:

const addProduct = async () => {};

const removeProduct = async () => {};

// INVITES:

const sendHandler = async (userToInvite) => {
  // Decrypt Email
  const decryptEmail = await guard.decryptEmail(userToInvite.email);

  // Get Cart Id
  const getCartId = userToInvite.cartId;

  // Make Link
  const linkToSend =
    "http://localhost:3010/api/user/invite/accept/" + getCartId;

  // Send Email
  const sentOrNot = await guard.sendEmail(decryptEmail, linkToSend);

  return sentOrNot;
};

const acceptHandler = async () => {};

// HELPER:

// Find user, return user
async function getOnlyUser(passedInUserId) {
  const existingUser = await user.findOne({ userId: passedInUserId });
  if (existingUser) {
    return existingUser;
  } else {
    return null; // return null if no user
  }
}

// LEGACY

const checkUserExistence = async (passedInUserId) => {
  const user = await user.findOne({ userId: passedInUserId });
  if (user) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  createNewUser,
  getExisitngUserInfo,
  getAllUsers,
  getOnlyUser,
  addProduct,
  removeProduct,
  sendHandler,
  acceptHandler,
  checkUserExistence,
};
