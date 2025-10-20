import React from 'react';
import styles from './Hero.module.css';
import heroImage from '../../assets/man.png';  

const Hero = () => {

  //leva até o componente pricing
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>
        <div className={styles.heroText}>
         <h1>Relógios inteligentes para cuidar de quem você ama</h1>
         <p>Nossos dispositivos funcionam em qualquer ambiente, detectam quedas automaticamente e oferecem segurança contínua para idosos e tranquilidade para suas famílias.</p>
          <div className={styles.buttons}>
            <button className={styles.primaryBtn} onClick={()=>scrollToSection('pricing-section')}>Preços e plano</button>
            <button className={styles.secondaryBtn} onClick={()=>scrollToSection('features-section')}>Saiba Mais</button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img src={heroImage} alt="old-man" />
        </div>
      </div>
    </section>
  );
};

export default Hero;