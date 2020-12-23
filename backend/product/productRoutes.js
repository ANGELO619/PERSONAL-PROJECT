const express = require('express');
const ProductController = require('./productController');
const router = express.Router();
const admin = require("firebase-admin");
const ProductConstant = require('./productConstant');
const ProductRepository = require('./productRepository');
const ProductInputValidator = require('./productInputValidator');

const productCollection = admin.firestore().collection(ProductConstant.PRODUCT_COLLECTION)
const productRepository = new ProductRepository(productCollection)
const productInputValidator = new ProductInputValidator()
const productController = new ProductController(productRepository, productInputValidator)

router.post('/', (req, res, next) => productInputValidator.validateCreateProductInput(req, res, next), (req, res) => productController.create(req, res));

router.put('/:productId', (req, res, next) => productInputValidator.validateUpdateProductInput(req, res, next), (req, res) => productController.update(req, res));

router.delete('/:productId', (req, res, next) => productInputValidator.validateRemoveProductInput(req, res, next), (req, res) => productController.remove(req, res));

module.exports = router;
