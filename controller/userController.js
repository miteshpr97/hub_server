const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendEmail = require("../utils/sendEmail");


// CREATE a new user
// exports.createUser = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'User already exists' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10)
//     const user = new User({ name, email, password: hashedPassword });
//     const savedUser = await user.save();

//     // Prepare and send the email to the new user
//     const emailSubject = "Welcome to Our Platform!";
//     const emailBody = `<h1>Hello ${name},</h1>
//                       <p>Your profile has been successfully created.</p>
//                       <p>We are excited to have you on board!</p>
//                       <p>Best regards,<br />The Team</p>`;

                      
                      
    
//     // Send the email
//     const emailRes = await sendEmail.run(emailSubject, emailBody, email);
//     console.log(emailRes); // Optional: Log the email response for debugging


//     res.status(201).json(savedUser);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };




// CREATE a new user
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ name, email, password: hashedPassword });
    const savedUser = await user.save();

    // Prepare email
    const emailSubject = "Welcome to Our Platform!";
    const emailBody = `<h1>Hello ${name},</h1>
                        <p>Your profile has been successfully created.</p>
                        <p>We are excited to have you on board!</p>
                        <p>Best regards,<br />The Team</p>`;

    // Send welcome email
    try {
      const emailRes = await sendEmail.run(emailSubject, emailBody, email);
      console.log("Email sent:", emailRes);
    } catch (emailErr) {
      console.error("Failed to send email:", emailErr);
      // You can choose to continue even if email fails
    }

    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email })
    if (!userExists) {
      res.status(500).json({ message: "user is not avliable" })
    }
    const isMatch = await bcrypt.compare(password, userExists.password)
    console.log(isMatch);


    const token = jwt.sign(
      { id: userExists._id, email: userExists.email, name: userExists.name },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.cookie("token", token, {
      httpOnly: true, // helps protect against XSS
      secure: false, // set to true in production (HTTPS)
      sameSite: 'Lax', // CSRF protection
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ message: "user is not found" })
  }


}


exports.getUser = async (req, res) => {
  try {
    const getuserData = await User.find()
    res.status(201).json({ message: "data is get", data: getuserData })
  } catch (err) {
    res.status(500).json({ message: "error to get" })
  }
}







// requestRouter.post(
//   "/request/send/:status/:toUserId",
//   userAuth,
//   async (req, res) => {
//     try {
//       const fromUserId = req.user._id;
//       const toUserId = req.params.toUserId;
//       const status = req.params.status;

//       const allowedStatus = ["ignored", "interested"];
//       if (!allowedStatus.includes(status)) {
//         return res
//           .status(400)
//           .json({ message: "Invalid status type: " + status });
//       }

//       const toUser = await User.findById(toUserId);
//       if (!toUser) {
//         return res.status(404).json({ message: "User not found!" });
//       }

//       const existingConnectionRequest = await ConnectionRequest.findOne({
//         $or: [
//           { fromUserId, toUserId },
//           { fromUserId: toUserId, toUserId: fromUserId },
//         ],
//       });
//       if (existingConnectionRequest) {
//         return res
//           .status(400)
//           .send({ message: "Connection Request Already Exists!!" });
//       }

//       const connectionRequest = new ConnectionRequest({
//         fromUserId,
//         toUserId,
//         status,
//       });

//       const data = await connectionRequest.save();

//       // const emailRes = await sendEmail.run(
//       //   "A new friend request from " + req.user.firstName,
//       //   req.user.firstName + " is " + status + " in " + toUser.firstName
//       // );
//       // console.log(emailRes);

//       res.json({
//         message:
//           req.user.firstName + " is " + status + " in " + toUser.firstName,
//         data,
//       });
//     } catch (err) {
//       res.status(400).send("ERROR: " + err.message);
//     }
//   }
// );


