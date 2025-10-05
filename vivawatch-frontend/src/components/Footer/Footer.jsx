import React from 'react';
import styles from './Footer.module.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <h2 className={styles.footerTitle}>Seu Portal de Cuidado com o Viva Watch!</h2>
        <div className={styles.columns}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Sobre Nós</h3>
            <ul>
              <li>Missão</li>
              <li>Visão</li>
              <li>Depoimentos</li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Serviços</h3>
            <ul>
              <li>Suporte Técnico</li>
              <li>Treinamento</li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Contato</h3>
            <ul>
              <li>(xx)xxxx-xxxx</li>
              <li>(xx)xxxx-xxxx</li>
            </ul>
          </div>
          <div className={styles.column}>
            <ul className={styles.icon}>
              <li><FaFacebookF/></li>
              <li><FaInstagram/></li>
              <li><FaTwitter/></li>
              <li><FaYoutube/></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;