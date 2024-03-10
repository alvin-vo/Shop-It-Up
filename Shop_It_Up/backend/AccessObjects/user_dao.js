/* 
These are the interfaces that communicate with the models. 
The models communicate with the database.
*/

const User = require("../Models/user_model.js"); // OBJECT
const Cart = require("../Models/cart_model.js");

const guard = require("../Security/check_status.js");

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
      cartId: "",
    }).save();

    return userID;
  } else {
    return null;
  }
};

const getExisitngUserInfo = async (passedInUserId) => {
  const existingUser = await User.findOne({ userId: passedInUserId });
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
    const user = await User.findOneAndUpdate(
      { cartId: passedInUserId },
      { $push: { productsToSell: passedInProductId } }
    );
    return true;
  } catch (err) {
    return false; // Return null if error.
  }
};

const removeProduct = async (passedInUserId, passedInProductId) => {
  try {
    const product = deletedProduct(passedInProductId);
    const user = await User.findOneAndUpdate(
      { cartId: passedInUserId },
      { $pull: { productsToSell: passedInProductId } }
    );
    return true;
  } catch (err) {
    return false; // Return null if error.
  }
};

// INVITES:

const sendHandler = async (userToInvite) => {
  // Get Cart Id
  const getCartId = userToInvite.cartId;

  // Make Link
  const linkToSend =
    "http://localhost:3010/api/user/invite/accept/" + getCartId;

  // Send Email (Broken: Google Banned Email)
  // const sentOrNot = await guard.sendEmail(emailToSend, linkToSend);

  return linkToSend; // IMMEDIATE SOLUTION: RETURN INVITE LINK
};

// RETURNS TRUE/FALSE
const acceptHandler = async (cartIdToEdit, userToAdd) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { cartId: cartIdToEdit },
      { $push: { contributorIds: userToAdd } }
    );
    const existingUser = await User.findOneAndUpdate(
      { userId: userToAdd },
      { cartId: cartIdToEdit }
    );
    return true;
  } catch (err) {
    return null;
  }
};

// RETURNS NEW USER
const updateUserWithCart = async (passedInCartId, passedInUserId) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { cartId: passedInCartId },
      { $push: { contributorIds: passedInUserId } }
    );
    const existingUser = await User.findOneAndUpdate(
      { userId: passedInUserId },
      { cartId: passedInCartId }
    );
    return existingUser;
  } catch (err) {
    return null;
  }
};

// RETURNS NEW USER
const setEmptyCart = async (passedInUserId) => {
  try {
    const existingUser = await User.findOneAndUpdate(
      { userId: passedInUserId },
      { cartId: "" }
    );
    return existingUser;
  } catch (err) {
    return null;
  }
};

// HELPER:

// Find user, return user
async function getOnlyUser(passedInUserId) {
  const existingUser = await User.findOne({ userId: passedInUserId });
  if (existingUser) {
    return existingUser;
  } else {
    return null; // return null if no user
  }
}

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
  checkUserExistence,
  updateUserWithCart,
  setEmptyCart,
};
