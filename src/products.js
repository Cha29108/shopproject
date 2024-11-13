
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './loading';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('authtoken1');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(token);
        const url = `http://127.0.0.1:3000/products?token=${encodeURIComponent(token)}`
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  
  const likeProduct = async (productId) => {
    try {
        const url = `http://127.0.0.1:3000/like?token=${encodeURIComponent(token)}`
      await axios.post(url, { productId });
      
      const res = await axios.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.error("Error liking product", error);
    }
  };

 
  const addToCart = async (productId) => {
    const userid = localStorage.getItem('userid');
    try {
        const url = `http://127.0.0.1:3000/cart?token=${encodeURIComponent(token)}`
      await axios.post(url, { userid, productId });
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  };

  return (
    <div>
     
      <div className="product-list">
      {products ? (
        Object.keys(products).map((key) => (
          <div key={key} className="product-card">
            <img
              src={products[key].image}
              alt={products[key].name}
              style={{ width: '200px', height: '200px'}}
            />
            <h3>{products[key].name}</h3>
            <p>Price: ${products[key].price}</p>
            <p>Likes: {products[key].likes || 0}</p>
            <button onClick={() => likeProduct(key)} aria-label={`Like ${products[key].name}`}>
              Like
            </button>
            <button onClick={() => addToCart(key)} aria-label={`Add ${products[key].name} to cart`}>
              Add to Cart
            </button>
          </div>
        ))
      ) : (<LoadingSpinner />
      )}
    </div>
    </div>
  );
};

export default ProductList;
