const admin = require('firebase-admin');
const serviceAccount = require('./keys.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hanessh-bc265-default-rtdb.asia-southeast1.firebasedatabase.app/"
});
const db = admin.database();
module.exports=db;
/*
const productsData = {
  
    "product1": {
      "name": "cricketbat",
      "price": 12000,
      "likes": 5,
      "image":"https://m.media-amazon.com/images/I/51PGunGtcoL._SX300_SY300_QL70_FMwebp_.jpg"
    },
    "product2": {
      "name": "Helmet",
      "price": 8000,
      "likes": 3,
      "image": "https://m.media-amazon.com/images/I/41xKpe4m1YL._SX300_SY300_QL70_FMwebp_.jpg"
    },
    "product3": {
      "name": "tv",
      "price": 1500,
      "likes": 8,
      "image": "https://m.media-amazon.com/images/I/41qYO8F5XdL._SX300_SY300_QL70_FMwebp_.jpg"
    }
    , "product4": {
        "name": "cricketbat",
        "price": 12000,
        "likes": 5,
        "image":"https://m.media-amazon.com/images/I/51PGunGtcoL._SX300_SY300_QL70_FMwebp_.jpg"
      },
      "product5": {
        "name": "Helmet",
        "price": 8000,
        "likes": 3,
        "image": "https://m.media-amazon.com/images/I/41xKpe4m1YL._SX300_SY300_QL70_FMwebp_.jpg"
      },
      "product6": {
        "name": "tv",
        "price": 1500,
        "likes": 8,
        "image": "https://m.media-amazon.com/images/I/41qYO8F5XdL._SX300_SY300_QL70_FMwebp_.jpg"
      }
      , "product7": {
        "name": "cricketbat",
        "price": 12000,
        "likes": 5,
        "image":"https://m.media-amazon.com/images/I/51PGunGtcoL._SX300_SY300_QL70_FMwebp_.jpg"
      },
      "product8": {
        "name": "ipad",
        "price": 8000,
        "likes": 3,
        "image": "https://m.media-amazon.com/images/I/41nIyVgOb-L._SX300_SY300_QL70_FMwebp_.jpg"
      },
      "product9": {
        "name": "cctv",
        "price": 1500,
        "likes": 8,
        "image": "https://m.media-amazon.com/images/I/31HfuoZmunL._SX300_SY300_QL70_FMwebp_.jpg"
      }
};

// Add product data to Firebase
db.ref('products').set(productsData, function(error) {
  if (error) {
    console.log('Data could not be saved.', error);
  } else {
    console.log('Data saved successfully.');
  }
});
// Function to store dummy user data in Firebase Realtime Database
*/
const storeDummyUserData = async () => {
    const dummyUsers = {
      user1: {
        username: "john",
        password: "password123", // Use hashed passwords in production
        cart:["product1"],
      },
      user2: {
        username: "jane.smith",
        password: "securepassword", // Use hashed passwords in production
        likes: {
          
        },
        cart: ["product1"],
      },
      user3: {
        username: "alice.johnson",
        password: "mypassword", // Use hashed passwords in production
        likes: {
         
        },
        cart: [],
      },
      user4: {
        username: "bob.brown",
        password: "hello123", // Use hashed passwords in production
        likes: {},
        cart: [],
      },
    };
  
    try {
      const usersRef = db.ref('shopusers');
      await usersRef.set(dummyUsers);
      console.log('Dummy users added successfully');
    } catch (error) {
      console.error('Error adding dummy users:', error);
    }
  };
  
  // Call the function to store the dummy user data
  storeDummyUserData();
  