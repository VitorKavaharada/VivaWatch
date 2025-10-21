import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../Auth/Auth';

const Navbar = ({ isLoggedIn, onLoginStatusChange }) => {
  const [showAuth, setShowAuth] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link to="/" className={styles.logo}>Viva Watch</Link>
        <button className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`} onClick={toggleMenu}>
          <span className={styles.hamburgerLine}>---</span>
          <span className={styles.hamburgerLine}>---</span>
          <span className={styles.hamburgerLine}>---</span>
        </button>
        <div className={`${styles.navRight} ${isMenuOpen ? styles.active : ''}`}>
          {isLoggedIn && (
            <>
              <Link to="/" className={styles.link} onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/protected/dashboard" className={styles.link} onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
              <Link to="/protected/payment" className={styles.link} onClick={() => setIsMenuOpen(false)}>Pagamento</Link>
            </>
          )}
          <button 
            className={styles.signupBtn} 
            onClick={isLoggedIn ? handleLogout : () => {
              setShowAuth(true);
              setIsMenuOpen(false);
            }}
          >
            {isLoggedIn ? 'Logout' : 'Inscrever-se'}
          </button>
        </div>
        {showAuth && <Auth onClose={() => setShowAuth(false)} onLoginStatusChange={onLoginStatusChange} />}
      </div>
    </nav>
  );
};

export default Navbar;