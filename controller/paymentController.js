const Payment = require("../models/paymentModel");
const razorpayInstance = require("../utils/razorpay")
const { membershipAmount } = require("../utils/constants");
const User = require("../models/userModel")
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");




exports.payment = async (req, res) => {
  try {
    const { membershipType, firstName, lastName, emailId, userId } = req.body;


    
    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    });

   
    // save in my data base

    const payment = new Payment({
      userId: userId,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });


    console.log(payment, "payment data");
    


    const savedPayment = await payment.save();


    console.log(savedPayment);
    

    //Return back order details to frontend
    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });


  } catch (error) {
    console.error("Payment backend error:", error);
    return res.status(500).json({ msg: error.message || "Internal server error" });
    

  }


}




exports.webhook = async(req, res) =>{
  try {
    console.log("Webhook Called");
    const webhookSignature = req.get("X-Razorpay-Signature");
    console.log("Webhook Signature", webhookSignature);

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if (!isWebhookValid) {
      console.log("INvalid Webhook Signature");
      return res.status(400).json({ msg: "Webhook signature is invalid" });
    }
    console.log("Valid Webhook Signature");

    // Udpate my payment Status in DB
    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    await payment.save();
    console.log("Payment saved");

    const user = await User.findOne({ _id: payment.userId });
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    console.log("User saved");

    await user.save();

    
    // Update the user as premium
    // if (req.body.event == "payment.captured") {
    // }
    // if (req.body.event == "payment.failed") {
    // }
    // return success response to razorpay

    return res.status(200).json({ msg: "Webhook received successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }

}

 // handler: verifyPremiumUser,
