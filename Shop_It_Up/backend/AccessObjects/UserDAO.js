/* 
These are the interfaces that communicate with the models. 
The models communicate with the database.
*/

const User = require("../models/UserModel.js");

const createNewUser = async (userId) => {
  const userID = userId;
  console.log("user id", userID);

  const existingUser = await User.findOne({ userId: userID });
  console.log(existingUser);
  if (!existingUser) {
    new User({
      userId: userID,
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

const checkUserExistence = async (userId) => {
  const id = userId;
  console.log("id", id);
  const user = await User.findOne({ userId: id });
  if (user) {
    return true;
  } else {
    return false;
  }
};
const updateExistingUser = async () => {};

const deleteExistingUser = async () => {};

const getExistingUserInfo = async () => {};

const addProduct = async () => {};

const removeProduct = async () => {};

const sendInvitation = async () => {};

const acceptInvitation = async () => {};

const receiveInvitation = async () => {};

module.exports = {
  createNewUser,
  updateExistingUser,
  deleteExistingUser,
  getExistingUserInfo,
  addProduct,
  removeProduct,
  sendInvitation,
  acceptInvitation,
  receiveInvitation,
  checkUserExistence,
};
