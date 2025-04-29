const mongoose = require("mongoose");


//db connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.log("mongodb connection error");
    }
}


module.exports = connectDB;

