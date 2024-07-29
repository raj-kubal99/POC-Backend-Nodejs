const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')
const { validateAddProducts, validateEditProducts } = require('../middleware/validators/productValidator');

router.get('/', productController.getProducts);
router.post('/', validateAddProducts, productController.addProduct);
router.put('/', validateEditProducts, productController.editProduct);

module.exports = router;