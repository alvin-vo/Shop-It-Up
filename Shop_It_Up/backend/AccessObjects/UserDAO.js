/* 
These are the interfaces that communicate with the models. 
The models communicate with the database.
*/

const User = require("../models/UserModel.js");

const createNewUser = async () => {};

const udpateExistingUser = async () => {};

const deleteExisitingUser = async () => {};

const getExisitngUserInfo = async () => {};

const addProduct = async () => {};

const removeProduct = async () => {};

const sendInvitation = async () => {};

const acceptInvitation = async () => {};

const receiveInvitation = async () => {};

module.exports = {
  createNewUser,
  udpateExistingUser,
  deleteExisitingUser,
  getExisitngUserInfo,
  addProduct,
  removeProduct,
  sendInvitation,
  acceptInvitation,
  receiveInvitation,
};
