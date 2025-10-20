import React, { useEffect } from 'react';
import styles from './Payment.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm'; 

// Chave publica do Stripe incluir no .env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className={styles.payment}>
      <div className={styles.leftSide}>
        <h2 className={styles.title} data-aos="fade-up">Escolha seu Plano Viva Watch</h2>
        <p className={styles.description} data-aos="fade-up" data-aos-delay="100">
          Adquira o Viva Watch e aproveite os melhores recursos de monitoramento de saúde, atividade e segurança. Escolha o plano que melhor atende às suas necessidades e comece a usar hoje mesmo com nossa garantia de satisfação!
        </p>
        <div className={styles.contactInfo} data-aos="fade-up" data-aos-delay="200">
          <p>suporte@vivawatch.com</p>
          <p>Compras: (11) 98765-4321</p>
        </div>
      </div>
      <div className={styles.rightSide} data-aos="fade-right">
        <div className={styles.formCard}>
          <h3 className={styles.formTitle}>Realizar Compra</h3>
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        </div>
      </div>
    </section>
  );
};

export default Payment;