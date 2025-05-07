const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;


    if (!token) {
      return res.status(401).send("Please login");
    }

    const decodedObj = jwt.verify(token, process.env.SECRET_KEY); // no need for `await` here
   
    const { id } = decodedObj;
    const user = await User.findById(id);

    

    if (!user) {
      return res.status(404).send("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

module.exports = {
  userAuth,
};
