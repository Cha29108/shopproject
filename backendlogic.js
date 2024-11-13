const db = require('./fireconnect.js');

const getProducts = async (req, res) => {
  try {
    const productsRef = db.ref('products');
    productsRef.once('value', (snapshot) => {
      const products = snapshot.val();
      res.status(200).json(products);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};


const likeProduct = async (req, res) => {
  const { productId } = req.body;
  try {
    const productRef = db.ref(`products/${productId}`);
    productRef.once('value', (snapshot) => {
      const productData = snapshot.val();
      const updatedLikes = (productData.likes || 0) + 1;
      productRef.update({ likes: updatedLikes });
      res.status(200).json({ message: 'Product liked', updatedLikes });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error liking product', error });
  }
};

// Function to add a product to the cart
const addToCart = async (req, res) => {
    const { userId, productId } = req.body;
  
    try {
      const userCartRef = db.ref(`shopusers/user1/cart`);
  
      userCartRef.once('value', (snapshot) => {
        // Get current cart data or initialize it as an empty array
        let cart = snapshot.val() || [];
  
        // Check if the product is already in the cart to avoid duplicates
        if (!cart.includes(productId)) {
          cart.push(productId); // Add the product ID to the cart
        } else {
          return res.status(400).json({ message: 'Product already in cart', cart });
        }
  
        // Update the cart in the database
        userCartRef.set(cart, (error) => {
          if (error) {
            return res.status(500).json({ message: 'Error updating cart', error });
          }
          res.status(200).json({ message: 'Product added to cart', cart });
        });
      });
    } catch (error) {
      res.status(500).json({ message: 'Error adding product to cart', error });
    }
  };
  

module.exports = {
  getProducts,
  likeProduct,
  addToCart
};
