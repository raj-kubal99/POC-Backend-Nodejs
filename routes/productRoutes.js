const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/', productController.getProducts);
router.post('/add', productController.addProduct);
router.put('/editProduct', productController.editProduct);

module.exports = router;