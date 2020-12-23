const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");
const { ORDER_COLLECTION } = require('./orderConstant');
const OrderController = require('./orderController');
const OrderRepository = require('./orderRepository');


const orderCollection = admin.firestore().collection(ORDER_COLLECTION)
const orderRepository = new OrderRepository(orderCollection)
const orderController = new OrderController(orderRepository)

router.post('/', orderController.create);

router.put('/:id', orderController.update);

router.delete('/:id', orderController.remove);

module.exports = router;
