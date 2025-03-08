import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css'; 

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Dashboard</Link>
      </div>
      <ul className="nav-items">
      
       
          <>
            <li>
              <Link to="/signup" className="btn btn-signup">
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/login" className="btn btn-login">
                Login
              </Link>
            </li>
          </>
        
      </ul>
    </nav>
  );
};

export default Navbar;