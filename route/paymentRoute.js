const express = require('express');
const router = express.Router();

const paymentController = require("../controller/paymentController")




router.post('/payment/create', paymentController.payment);
router.post('/payment/webhook', paymentController.webhook)







module.exports = router;