const express = require('express')
require('dotenv').config();
const connectDB  = require('./config/db')
const userRoute = require('./route/userRoute')
const productRoute = require('./route/productRoute')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const paymentRoute = require('./route/paymentRoute')


// require("./utils/cornjob.js")

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// // Middleware example (optional)
app.use(express.json()) // parses incoming JSON requeststa
app.use(cookieParser());

// // MongoDB connection
// mongoose.connect('mongodb+srv://Mitesh:5d81UE2osFaiNzJg@cluster0.rjlqyvs.mongodb.net/nodeTest?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('✅ Connected to MongoDB'))
// .catch((error) => console.error('❌ MongoDB connection error:', error));

connectDB();
app.use('/api/v1', userRoute);
app.use('/api/v1', productRoute)
app.use('/api/v1', paymentRoute)


app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});


// BEEQUUEUE  
  //BULL








