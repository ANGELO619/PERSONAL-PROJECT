const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");
const { CART_COLLECTION } = require('./cartConstant');
const CartController = require('./cartController');
const CartRepository = require('./cartRepository');


const cartCollection = admin.firestore().collection(CART_COLLECTION)
const cartRepository = new CartRepository(cartCollection)
const cartController = new CartController(cartRepository)

router.post('/', cartController.create);

router.put('/:id', cartController.update);

router.delete('/:id', cartController.remove);

module.exports = router;
