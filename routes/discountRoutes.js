const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController')

router.get('/', discountController.getDiscount);
router.post('/add', discountController.addDiscount);
router.put('/editDiscount', discountController.editDiscount);

module.exports = router;