import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './Pricing.module.css';

const Pricing = () => {

  useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);
  
  const plans = [
    {
      id: 1,
      name: 'Básico',
      price: 27,
      subtitle: 'Plano inicial para famílias pequenas.',
      features: [
        { text: 'Detecção de quedas básica', included: true },
        { text: 'Localização GPS', included: true },
        { text: 'Monitoramento de saúde 24/7', included: false },
        { text: 'Suporte prioritário', included: false },
        { text: 'Integração com apps familiares', included: false },
      ],
    },
    {
      id: 2,
      name: 'Premium',
      price: 47,
      subtitle: 'Mais recursos para cuidado completo.',
      features: [
        { text: 'Detecção de quedas básica', included: true },
        { text: 'Localização GPS', included: true },
        { text: 'Monitoramento de saúde 24/7', included: true },
        { text: 'Suporte prioritário', included: true },
        { text: 'Integração com apps familiares', included: false },
      ],
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 67,
      subtitle: 'Para múltiplos usuários e personalização.',
      features: [
        { text: 'Detecção de quedas básica', included: true },
        { text: 'Localização GPS', included: true },
        { text: 'Monitoramento de saúde 24/7', included: true },
        { text: 'Suporte prioritário', included: true },
        { text: 'Integração com apps familiares', included: true },
      ],
    },
  ];

  return (
    <section className={styles.pricing}>
      <div className={styles.pricingContainer}>
        <h2 className={styles.title}>Preços Simples e Transparentes</h2>
        <p className={styles.subtitle}>
          Escolha o plano ideal para proteger seus entes queridos com o Viva Watch. Sem surpresas ou taxas ocultas.
        </p>
        <div className={styles.grid}>
          {plans.map((plan) => (
            <div key={plan.id} className={styles.card} data-aos="fade-up">
              <h3 className={styles.planName}>{plan.name}</h3>
              <div className={styles.price}>
                R${plan.price}<span className={styles.perMonth}>/m</span>
              </div>
              <p className={styles.planSubtitle}>{plan.subtitle}</p>
              <ul className={styles.featureList}>
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className={feature.included ? styles.included : styles.notIncluded}>
                    {feature.included ? '✓' : '-'} {feature.text}
                  </li>
                ))}
              </ul>
              <button className={styles.trialButton}>Saiba mais</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
