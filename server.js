const express = require('express');
const path = require('path');
const app=express();
const port=3000;
const db = require('./fireconnect.js');
const productsController = require('./backendlogic.js');
const { v4: uuidv4 } = require('uuid'); // Import UUID library
require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'scasfdoaeifneon';

const authenticateToken = (req, res, next) => {
  // Get token from the request header (usually 'Authorization')
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
}
// Check for token in query parameters
else if (req.query.token) {
    token = req.query.token;
}
  if (!token) {
      return res.status(403).json({ success: false, message: 'Token is required' });
  }

  // Verify token
  jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
          return res.status(403).json({ success: false, message: 'Invalid or expired token' });
      }

      // Token is valid, proceed to the next middleware
       // Store the user information
      next();
  });
};


app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.get('/login',(req,res)=>{ res.sendFile(path.join(__dirname,'src','index.html'))});
const verifyUser = async (req, res) => {
    const { username, password } = req.body;
    console.log(username,password);
    try {
      const usersRef = db.ref('shopusers');
      usersRef.once('value', (snapshot) => {
        const users = snapshot.val();
        let userFound = false;
  
        // Loop through the users to find a match
        for (const userId in users) {
          const userData = users[userId];
          
          // Check if username and password match
          if (userData.username == username && userData.password == password) {
            userFound = true;
            const payload = {
                id: userId, // Unique user ID
                username: userData.username, // Username
                nonce: uuidv4() // Generate a random UUID for uniqueness
              };
            
              const options = {
                expiresIn: '1h' // Token expiration time
              };
              
              // Generate the token using the constant secret key
              const token = jwt.sign(payload, SECRET_KEY, options);
    console.log(userId);
    console.log(token);
            return res.json(JSON.stringify({ success: true, token:token ,userid:userId}));
          }
        }
  
        // If no match is found
        if (!userFound) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error verifying user', error });
    }
  };
  
  // Route for verifying user credentials
app.get('/products',authenticateToken, productsController.getProducts);
app.post('/like',authenticateToken, productsController.likeProduct);
app.post('/cart',authenticateToken, productsController.addToCart);
app.post('/verify', verifyUser);


app.listen(port,()=>{console.log("server is running")});