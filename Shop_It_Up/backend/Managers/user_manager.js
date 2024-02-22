/* 
   Managers are essentially going to handle the logic that the routes does not need to know about.
   It should be the only thing that commuicates with the DAOs.
*/

const UserDAO = require("../AccessObjects/user_dao.js");

const createUser = async (userId) => {
  await UserDAO.createNewUser(userId);
};

const updateUser = async () => {};

// const deleteUser = async () => {};

const getUser = async () => {};

const addProductToSell = async () => {};

const removeProductToSell = async () => {};

const sendInvite = async () => {};

const acceptInvite = async () => {};

const receiveInvite = async () => {};

// Function to check that req.body matches our schema!
// RETURNS true IF req.body IS VALID, false OTHERWISE.
async function checkBody(bodyToCheck) {
  const bodyResult = schemaChecker.validate(bodyToCheck);
  if (bodyResult.error) {
    return false;
  }
  return true;
}

// Function to check that req.body.productId is not duplicated!
// RETURNS true IF THERE IS NOT AN EXISTING PRODUCT, false OTHERWISE.
async function checkId(productIdToCheck) {
  const idResult = await ProductDAO.getOnlyProduct(productIdToCheck);
  if (idResult == null) {
    return true;
  }
  return false;
}

module.exports = {
  createUser,
  updateUser,
  getUser,
  addProductToSell,
  removeProductToSell,
  receiveInvite,
  acceptInvite,
  sendInvite,
};
