import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../Auth/Auth';

const Navbar = ({ isLoggedIn, onLoginStatusChange }) => {
  const [showAuth, setShowAuth] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      if (onLoginStatusChange) onLoginStatusChange(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [onLoginStatusChange]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (onLoginStatusChange) onLoginStatusChange(false);
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.links}>
          <p className={styles.logo}>Viva Watch</p>
        </div>
        {isLoggedIn ? (
          <button className={styles.signupBtn} onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className={styles.signupBtn} onClick={() => setShowAuth(true)}>
            Inscrever-se
          </button>
        )}
        {showAuth && <Auth onClose={() => setShowAuth(false)} onLoginStatusChange={onLoginStatusChange} />}
      </div>
    </nav>
  );
};

export default Navbar;