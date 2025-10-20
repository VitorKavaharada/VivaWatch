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
        <Link to="/" className={styles.logo}>Viva Watch</Link>
        <div className={styles.navRight}>
          {isLoggedIn && (
            <>
              <Link to="/" className={styles.link}>Home</Link>
              <Link to="/protected/dashboard" className={styles.link}>Dashboard</Link>
              <Link to="/protected/payment" className={styles.link}>Pagamento</Link>
            </>
          )}
          <button className={styles.signupBtn} onClick={isLoggedIn ? handleLogout : () => setShowAuth(true)}>
            {isLoggedIn ? 'Logout' : 'Inscrever-se'}
          </button>
        </div>
        {showAuth && <Auth onClose={() => setShowAuth(false)} onLoginStatusChange={onLoginStatusChange} />}
      </div>
    </nav>
  );
};

export default Navbar;