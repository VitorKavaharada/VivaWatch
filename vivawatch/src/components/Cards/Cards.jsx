import styles from './Cards.module.css';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import cardImage1 from '../../assets/woman-smartWatch.png'; //autor: Curated Lifestyle
import cardImage2 from '../../assets/check-alert-phone.png'; //autor: Karolina Grabowska
import cardImage3 from '../../assets/senior-run.png'; //autor: Centre for Ageing Better

const Cards = () => {

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const listCard = [
    {
      id: 1,
      image: cardImage1,
      title: 'Como Configurar Alertas de Queda',
      description: 'Aprenda a ativar detecção automática de quedas no Viva Watch e receber notificações instantâneas no seu celular.',
      link: '#', 
    },
    {
      id: 2,
      image: cardImage2,
      title: 'Novas Funcionalidades de Monitoramento',
      description: 'Atualização recente inclui rastreamento de saúde 24/7 e integração com apps de família para mais tranquilidade.',
      link: '#',
    },
    {
      id: 3,
      image: cardImage3,
      title: 'Dicas para Idosos Ativos',
      description: 'Como usar o Viva Watch para rastrear atividades diárias e promover um estilo de vida saudável e independente.',
      link: '#',
    },
  ];

  return (
    <section className={styles.list}>
      <div className={styles.listContainer}>
        <h2 className={styles.title}>Novidades e Atualizações do Produto</h2>
        <p className={styles.subtitle}>
          Fique por dentro das últimas novidades sobre o Viva Watch, dicas úteis e melhorias para cuidar melhor de quem você ama.
        </p>
        <div className={styles.grid}>
          {listCard.map((card) => ( 
            <div key={card.id} className={styles.card}  data-aos="fade-up">
              <img src={card.image} alt={card.title} className={styles.cardImage} />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
                 <p className={styles.readMore}>Leia mais →</p> {/* Mudar para o Link do react-router */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cards;