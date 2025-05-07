const express = require('express');
const router = express.Router();

const paymentController = require("../controller/paymentController");
const { userAuth } = require('../middleware/auth');




router.post('/payment/create', paymentController.payment);
router.post('/payment/webhook', paymentController.webhook);
router.get('/premium/verify', userAuth, paymentController.verifyPremium);







module.exports = router;