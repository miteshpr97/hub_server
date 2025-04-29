// const { SendEmailCommand  } = require("@aws-sdk/client-ses");
// const { sesClient }  = require("./sesClient");



// const createSendEmailCommand = (toAddress, fromAddress) => {

//   console.log(toAddress, fromAddress);
  
//     return new SendEmailCommand({
//       Destination: {
//         /* required */
//         CcAddresses: [
     
//         ],
//         ToAddresses: [
//           toAddress,
//           /* more To-email addresses */
//         ],
//       },
//       Message: {
//         Body: {
        
//           Html: {
//             Charset: "UTF-8",
//             Data: "<h1> This is  email body</h1>",
//           },
//           Text: {
//             Charset: "UTF-8",
//             Data: "This is the text format of the email body",
//           },
//         },
//         Subject: {
//           Charset: "UTF-8",
//           Data: "Hello form aws ses",
//         },
//       },
//       Source: fromAddress,
//       ReplyToAddresses: [
//         /* more items */
//       ],
//     });
//   };



//   const run = async () => {
//     const sendEmailCommand = createSendEmailCommand(
//       "miteshpradhan97@gmail.com",
//       "miteshpradhan97@gmail.com",
//     );
  
//     try {
//       return await sesClient.send(sendEmailCommand);
//     } catch (caught) {
//       if (caught instanceof Error && caught.name === "MessageRejected") {
//         /** @type { import('@aws-sdk/client-ses').MessageRejected} */
//         const messageRejectedError = caught;
//         return messageRejectedError;
//       }
//       throw caught;
//     }
//   };
  

//   module.exports = { run };





const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient.js");

const createSendEmailCommand = (toAddress, fromAddress, subject, body) => {


  // console.log(toAddress, fromAddress, subject, body);
  
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [],
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body,
        },
        Text: {
          Charset: "UTF-8",
          Data: "Your profile has been created successfully. Welcome onboard!", // Better text
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [],
  });
};

const run = async (subject, body, toEmailId) => {

  console.log( toEmailId, "jjjjjjj");
  
  const sendEmailCommand = createSendEmailCommand(
    toEmailId,                        // Send to user
    "miteshpradhan97@gmail.com",        // Verified sender
    subject,
    body
  );

  try {
    const response = await sesClient.send(sendEmailCommand);
    console.log("Email sent successfully:", response);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    if (error instanceof Error && error.name === "MessageRejected") {
      return error;
    }
    throw error;
  }
};

module.exports = { run };




