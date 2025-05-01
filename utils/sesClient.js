const { SESClient } = require("@aws-sdk/client-ses");
// Set the AWS Region.
const REGION = "ap-south-1";
// Create SES service object.  i have use   v3
const sesClient = new SESClient({ region: REGION, credentials:{
    accessKeyId: process.env.AWS_SES_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SES_SECRET_KEY,
    // sessionToken: process.env.AWS_SESSION_TOKEN, // Optional, if using temporary credentials
} });



module.exports = { sesClient };



// if v2 use 

// const sesClient = new SESClient({
//      region: REGION,

//     accessKeyId: process.env.AWS_SES_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SES_SECRET_KEY,
//     // sessionToken: process.env.AWS_SESSION_TOKEN, // Optional, if using temporary credentials
//  });