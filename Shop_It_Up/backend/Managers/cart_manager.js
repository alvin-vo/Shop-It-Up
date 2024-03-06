const cartDAO = require("../AccessObjects/cart_dao.js");
const userManager = require("../Managers/user_manager.js");
const productManager = require("../Managers/product_manager.js");

const { getExisitngUserInfo } = require("../AccessObjects/user_dao.js");
const { updateUserWithCart } = require("../AccessObjects/user_dao.js");
const { setEmptyCart } = require("../AccessObjects/user_dao.js");

// PRODUCT UPDATE:

// 0: CHECK IF CART IS EMPTY
// 1: CHECK IF PRODUCT EXISTS
// 2: RETURN IF PRODUCT DOESN'T EXIST
// 3: IF CART IS EMPTY -> 4, ELSE -> 5
// 4: CREATE CART 
// 5: ADD PRODUCT TO CART
// 6: RETURN NEW CART
const addProductToCart = async (passedInInfo, passedInUserId) => {
  //const realCart = await userManager.checkValidCart(passedInInfo.params.cartId); // Should be TRUE
  const realProduct = await productManager.getOneProduct(passedInInfo); // Should be set to a valid product
  const realUser = await getExisitngUserInfo(passedInUserId); // SHOULD BE SET TO USER OBJECT
  
  if(realUser.cartId.length != 0) {
    const existingCart = await cartDAO.getOnlyCart(realUser.cartId);
    if(existingCart == null) {
      const updatedUser = await setEmptyCart(passedInUserId);
    }
  }

  const realUserPostChange = await getExisitngUserInfo(passedInUserId); // SHOULD BE SET TO USER OBJECT

  if(realProduct) { // REAL PRODUCT
    if(realUserPostChange.cartId.length != 0) { // REAL CART
      const checkTrue = await cartDAO.addProduct(realUser.cartId, realProduct.productId);
      if(checkTrue) {
        return await cartDAO.getOnlyCart(realUser.cartId);
      }
    } else { // NEW CART
      const newCart = await createCart(passedInUserId); // PASS IN USER ID -> RETURNS NEW CART ID

      const updateUser = await updateUserWithCart(newCart, passedInUserId); // APPEND CARTID TO USER
      const checkTrue = await cartDAO.firstProduct(newCart, realProduct.productId, passedInUserId); // SET FIRST PRODUCT

      if(checkTrue) {
        return await cartDAO.getOnlyCart(newCart);
      }
    }
  }

  return null;  // PRODUCT DOESN'T EXIST, ERROR
};

const removeProductFromCart = async (passedInInfo, passedInUserId) => {
  //const realCart = await userManager.checkValidCart(passedInInfo.params.cartId); // Should be TRUE
  const realProduct = await productManager.getOneProduct(passedInInfo); // Should be set to a valid product
  const realUser = await getExisitngUserInfo(passedInUserId); // SHOULD BE SET TO USER OBJECT
  
  if(realUser.cartId.length != 0) {
    const existingCart = await cartDAO.getOnlyCart(realUser.cartId);
    if(existingCart.products.length == 0 || existingCart.products == undefined) {
      const deletedCart = await cartDAO.deleteCart(realUser.cartId);
      const updatedUser = await setEmptyCart(passedInUserId);
      return false;
    }
  }

  const realUserPostChange = await getExisitngUserInfo(passedInUserId); // SHOULD BE SET TO USER OBJECT

  if(realProduct) { // REAL PRODUCT
    if(realUserPostChange.cartId.length != 0) { // REAL CART
      const validUser = await cartDAO.inCart(realUserPostChange.cartId, passedInUserId);
      if(validUser) {
        return await cartDAO.removeProduct(realUserPostChange.cartId, realProduct.productId);
      }
    }
  }
  return null;  // PRODUCT DOESN'T EXIST, ERROR
};


// USER UPDATE:

const addContributorToCart = async (cartId) => {};

const removeContributorFromCart = async (userId) => {};

// CART UPDATE

const checkoutCart = async (cartId, userId) => {};

const deleteCart = async (passedInReq) => {
  return await cartDAO.deleteCart(passedInReq.params.cartId);
};

// CART SHOW ALL:

const getCarts = async () => {
  return cartDAO.getAllCarts();
};

// HELPER FUNCTIONS

async function createCart(passedInUserId) {
  const newCartId = await cartDAO.createCart(passedInUserId); 
  if(newCartId == null) {
    return null;
  }
  return newCartId;
};

module.exports = {
  addProductToCart,
  deleteCart,
  removeContributorFromCart,
  removeProductFromCart,
  addContributorToCart,
  checkoutCart,
  getCarts,
};
