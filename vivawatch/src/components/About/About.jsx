import { useEffect } from 'react';
import styles from './About.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  
   useEffect(() => {
     AOS.init({ duration: 1000 });
   }, []);

  const mission = "Nossa missão é proporcionar tranquilidade às famílias através de tecnologia acessível, monitorando a segurança e o bem-estar de idosos com o Viva Watch.";
  const vision = "Visamos um futuro onde cada idoso viva com independência e segurança, apoiado por inovações que conectam gerações.";
  const values = [
    { id: 1, text: "Segurança acima de tudo" },
    { id: 2, text: "Acessibilidade para todos" },
    { id: 3, text: "Confiança através da tecnologia" },
  ];
  const statText = "⚠️ Segundo o Ministério da Saúde, o número de idosos que morreram por quedas quase dobrou em menos de uma década — de 4.816 em 2013 para 9.569 em 2022. As quedas se tornaram a segunda principal causa de morte acidental entre brasileiros com 60 anos ou mais.";

  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <h2 className={styles.title} data-aos="fade-up" data-aos-delay="100">Sobre o Viva Watch</h2>
        <div className={styles.sections}>
          <div className={styles.section} data-aos="fade-up" data-aos-delay="200">
            <h3>Missão</h3>
            <p>{mission}</p>
          </div>
          <div className={styles.section} data-aos="fade-up" data-aos-delay="300">
            <h3>Valores</h3>
            <ul>
              {values.map((value) => (
                <li key={value.id}>{value.text}</li>
              ))}
            </ul>
          </div>
          <div className={styles.section} data-aos="fade-up" data-aos-delay="400">
            <h3>Visão</h3>
            <p>{vision}</p>
          </div>
        </div>
        <div className={styles.statBox} data-aos="fade-up" data-aos-delay="500">
          <p>{statText}</p>
        </div>
      </div>
    </section>
  );
};

export default About;