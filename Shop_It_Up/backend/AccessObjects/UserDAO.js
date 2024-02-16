/* 
These are the interfaces that communicate with the models. 
The models communicate with the database.
*/

const User = require("../models/UserModel.js");

const Guard = require("../Security/checkStatus.js")


// USER:

const createNewUser = async (userId, passedInEmail) => {
  const userID = userId;
  const existingUser = await User.findOne({ userId: userID });
  
  // ENCRYPT EMAIL FOR INVITE
  const encryptEmail = await Guard.encryptEmail(passedInEmail);

  if (!existingUser) {
    new User({
      userId: userID,
      email: encryptEmail,
      productsToSell: [],
      recievedInvites: [],
      cart: {
        cartId: "123434",
        ownerId: userID,
        contributors: [],
        products: [],
      },
    }).save();

    return userID;
  } else {
    return null;
  }
};

const updateExistingUser = async () => {};

const deleteExisitingUser = async () => {};

const getExisitngUserInfo = async () => {};

const getAllUsers = async () => {
  const existingUsers = await User.find();
  return existingUsers;
};

// PRODUCTS:

const addProduct = async () => {};

const removeProduct = async () => {};

// INVITES:

const sendHandler = async (userToInvite) => {
  // Decrypt Email
  const decryptEmail = await Guard.decryptEmail(userToInvite.email);
  
  // Get Cart Id
  const getCartId = userToInvite.cart.cartId;

  // Send Email
  const sentOrNot = await Guard.sendEmail(decryptEmail, getCartId); // NOT WORKING

  return sentOrNot;
};

const acceptHandler = async () => {
  

};

const receiveHandler = async () => {


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

module.exports = {
  createNewUser,
  updateExistingUser,
  deleteExisitingUser,
  getExisitngUserInfo,
  getAllUsers,
  getOnlyUser,
  addProduct,
  removeProduct,
  sendHandler,
  acceptHandler,
  receiveHandler,
};
