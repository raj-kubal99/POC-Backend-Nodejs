const express = require('express');
const router = express.Router();
const AssociateOfferController = require('../controllers/associateOfferController');
const { validateCategory } = require('../middleware/validators/associateValidator');

router.get('/', AssociateOfferController.getOffers);
router.post('/category', validateCategory,  AssociateOfferController.getCategoryLists);

module.exports = router;