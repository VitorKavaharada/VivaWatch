import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import Auth from '../Auth/Auth';

const Navbar = () => {
  const [showAuth, setShowAuth] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.links}>
         <Link to='/' className={styles.logo}>Viva Watch</Link>
        </div>
        {isLoggedIn ? (
          <button className={styles.signupBtn} onClick={() => { localStorage.removeItem('token'); setIsLoggedIn(false); window.location.reload(); }}>Logout</button> //usar navigate ?
        ) : (
          <button className={styles.signupBtn} onClick={() => setShowAuth(true)}>Inscrever-se</button>
        )}
      </div>
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </nav>
  );
};

export default Navbar;