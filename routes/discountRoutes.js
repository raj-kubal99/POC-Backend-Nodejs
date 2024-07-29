const express = require('express');
const router = express.Router();
const DiscountController = require('../controllers/discountController')
const { validateAddDiscount, validateEditDiscount } = require('../middleware/validators/discountValidator'); 

router.get('/', DiscountController.getDiscount);
router.post('/', validateAddDiscount, DiscountController.addDiscount);
router.put('/', validateEditDiscount, DiscountController.editDiscount);

module.exports = router;