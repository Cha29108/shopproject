import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { FaCartPlus, FaUserCircle } from 'react-icons/fa';
import Homepage from './homepage.js';
import Contact from './contact.js';
import ProductList from './products.js'; 


const MainPage = () => {
   

    return (
        <Router>
            <div>
                <header className="header">
                    <div className="logo">
                        <img src="https://cdn.dribbble.com/userupload/6812555/file/original-ed6d53503f7b84b5e70571cee8272a0b.jpg?resize=400x300&vertical=center" alt="Logo" width="100" /> {/* Replace with your logo */}
                    </div>
                    <nav className="navbar">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Products</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </nav>
                    <div className="search-bar">
                        <input type="text" placeholder="Search..." />
                    </div>
                    <div className="user-info">
                        <span className="user-name">Welcome, User!</span> {/* Replace with actual user's name */}
                        <FaUserCircle size={24} />
                        <FaCartPlus size={24} />
                    </div>
                </header>

                
                

                <Routes>
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/login" element={<Homepage />} />
                    <Route path="/" element={<Homepage />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
                <footer className="footer">
                    <p>&copy; 2024 Your Company. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
};

export default MainPage;
