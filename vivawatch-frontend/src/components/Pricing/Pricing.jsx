import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './Pricing.module.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Pricing = ({ isLoggedIn }) => {
  const navigate = useNavigate();

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
        { id: 1, text: 'Detecção de quedas básica', included: true },
        { id: 2, text: 'Localização GPS', included: true },
        { id: 3, text: 'Monitoramento de saúde 24/7', included: false },
        { id: 4, text: 'Suporte prioritário', included: false },
        { id: 5, text: 'Integração com apps familiares', included: false },
      ],
    },
    {
      id: 2,
      name: 'Premium',
      price: 47,
      subtitle: 'Mais recursos para cuidado completo.',
      features: [
        { id: 1, text: 'Detecção de quedas básica', included: true },
        { id: 2, text: 'Localização GPS', included: true },
        { id: 3, text: 'Monitoramento de saúde 24/7', included: true },
        { id: 4, text: 'Suporte prioritário', included: true },
        { id: 5, text: 'Integração com apps familiares', included: false },
      ],
    },
    {
      id: 3,
      name: 'Enterprise',
      price: 67,
      subtitle: 'Para múltiplos usuários e personalização.',
      features: [
        { id: 1, text: 'Detecção de quedas básica', included: true },
        { id: 2, text: 'Localização GPS', included: true },
        { id: 3, text: 'Monitoramento de saúde 24/7', included: true },
        { id: 4, text: 'Suporte prioritário', included: true },
        { id: 5, text: 'Integração com apps familiares', included: true },
      ],
    },
  ];

  const handleLearnMore = () => {
    if (isLoggedIn) {
      navigate('/protected/payment');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className={styles.pricing} id="pricing-section">
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
                {plan.features.map((feature) => (
                  <li key={feature.id} className={feature.included ? styles.included : styles.notIncluded}>
                    {feature.included ? <FaCheckCircle /> : <FaTimesCircle />} {feature.text}
                  </li>
                ))}
              </ul>
              <button className={styles.trialButton} onClick={handleLearnMore}>Saiba mais</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;