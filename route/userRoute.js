const express = require('express');
const router = express.Router();

const userController = require("../controller/userController")


router.get('/getUser', userController.getUser); 
router.post('/postUser', userController.createUser )
router.post('/login', userController.login)




module.exports = router;




// nginx 
// 51.21.251.238

// server {
//     listen 80;
//     server_name yourdomain.com;  # Or use localhost if testing locally

//     location /api/ {
//         proxy_pass http://localhost:5000/;
//         proxy_http_version 1.1;
//         proxy_set_header Upgrade $http_upgrade;
//         proxy_set_header Connection 'upgrade';
//         proxy_set_header Host $host;
//         proxy_cache_bypass $http_upgrade;
//     }

//     # Optionally, serve your frontend from here
//     location / {
//         root /path/to/your/frontend/build;
//         index index.html;
//         try_files $uri /index.html;
//     }
// }
