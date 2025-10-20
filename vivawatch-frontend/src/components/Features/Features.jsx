import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './Features.module.css';
import { FiFileText, FiMap, FiThumbsUp, FiSave, FiHeart, FiActivity } from 'react-icons/fi';

const Features = () => {
    
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const featureData = [
    {
      id: 1,
      icon: <FiFileText size={24} color="white" />, 
      title: 'Detecção de Quedas',
      description: 'Nosso relógio detecta quedas automaticamente e envia alertas para familiares em tempo real.',
    },
    {
      id: 2,
      icon: <FiMap size={24} color="white" />,
      title: 'Localização GPS',
      description: 'Acompanhe a localização do usuário em qualquer lugar, garantindo segurança fora de casa.',
    },
    {
      id: 3,
      icon: <FiThumbsUp size={24} color="white" />,
      title: 'Fácil de Usar',
      description: 'Interface simples e intuitiva, perfeita para idosos sem experiência com tecnologia.',
    },
    {
      id: 4,
      icon: <FiSave size={24} color="white" />,
      title: 'Bateria Duradoura',
      description: 'Até _ dias de uso contínuo, sem necessidade de recargas frequentes.',
    },
    {
      id: 5,
      icon: <FiHeart size={24} color="white" />,
      title: 'Monitoramento de Saúde',
      description: 'Medição de batimentos cardíacos e alertas para irregularidades.',
    },
    {
      id: 6,
      icon: <FiActivity size={24} color="white" />,
      title: 'Atividade Diária',
      description: 'Registre passos e atividades para promover um estilo de vida saudável.',
    },
  ];

  return (
    <section className={styles.features} id='features-section'>
      <div className={styles.featuresContainer}>
        <div className={styles.grid}>
          {featureData.map((feature) => ( 
            <div key={feature.id} className={styles.card} data-aos="fade-up">
              <div className={styles.iconWrapper}>
                {feature.icon}
              </div>
              <h3 className={styles.title}>{feature.title}</h3>
              <p className={styles.description}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
