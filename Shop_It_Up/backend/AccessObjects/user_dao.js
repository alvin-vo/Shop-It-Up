/* 
These are the interfaces that communicate with the models. 
The models communicate with the database.
*/

const User = require("../Models/user_model.js"); // OBJECT
const guard = require("../Security/check_status.js")

const { createdProduct } = require("../AccessObjects/product_dao.js");
const { deletedProduct } = require("../AccessObjects/product_dao.js");


// USER:

const createNewUser = async (userId, passedInEmail) => {
  const userID = userId;
  const existingUser = await User.findOne({ userId: userID });
  
  // ENCRYPT EMAIL FOR INVITE
  const encryptEmail = await guard.encryptEmail(passedInEmail);

  if (!existingUser) {
    new User({
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

const getExisitngUserInfo = async (passedInUserId) => {
  const existingUser = await User.findOne({userId: passedInUserId});
  if (existingUser) {
    return existingUser;
  } else {
    return null; // return null if no user
  }
};

const getAllUsers = async () => {
  const existingUsers = await User.find();
  return existingUsers;
};

// PRODUCTS:

const addProduct = async (passedInUserId, passedInProductId, passedInBody) => {
  passedInBody.productId = passedInProductId;
  passedInBody.sellerId = passedInUserId;
  try {
  const product = createdProduct(passedInBody);
  return true;
} catch (err) {
  return false; // Return null if error.
}
};

const removeProduct = async (passedInProductId) => {
  try {
    const product = deletedProduct(passedInProductId);
    return true;
  } catch (err) {
    return false; // Return null if error.
  }
};

// INVITES:

const sendHandler = async (userToInvite, emailToSend) => {
  // Get Cart Id
  const getCartId = userToInvite.cartId;

  // Make Link
  const linkToSend = "http://localhost:3010/api/user/invite/accept/" + getCartId;

  // Send Email
  const sentOrNot = await guard.sendEmail(emailToSend, linkToSend);

  return sentOrNot;
};

const acceptHandler = async () => {
  

};

// HELPER:

// Find user, return user
async function getOnlyUser(passedInUserId) {
  const existingUser = await User.findOne({userId: passedInUserId});
  if (existingUser) {
    return existingUser;
  } else {
    return null; // return null if no user
  }
};

// LEGACY

const checkUserExistence = async (passedInUserId) => {
  const user = await User.findOne({ userId: passedInUserId });
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
  checkUserExistence
};
