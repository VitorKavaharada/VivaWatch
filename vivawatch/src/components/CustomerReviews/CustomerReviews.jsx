import React, { useEffect } from 'react';
import styles from './CustomerReviews.module.css'; // renomeie o CSS também
import AOS from 'aos';
import 'aos/dist/aos.css';
import reviewOne from '../../assets/grandmother.png'; //autor: Ashwin Vaswani
import reviewTwo from '../../assets/manReview.png'; //autor: JSB Co.
import reviewThree from '../../assets/womanReview.png'; //autor: Getty Images

const CustomerReviews = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const reviews = [
    {
      id: 1,
      name: "Maria Silva, 62 anos",
      text: "O Viva Watch me deu paz de espírito. Saber que minha mãe está segura com a detecção de quedas é tudo que eu precisava!",
      image: reviewOne,
    },
    {
      id: 2,
      name: "João Pereira, 45 anos",
      text: "A facilidade de usar o aplicativo e os alertas rápidos salvaram meu pai de uma situação perigosa. Recomendo!",
      image: reviewTwo,
    },
    {
      id: 3,
      name: "Ana Costa, 58 anos",
      text: "O suporte foi incrível, e o relógio é confortável. Minha família agora dorme tranquila.",
      image: reviewThree,
    },
  ];

  return (
    <section className={styles.customerReviews}>
      <div className={styles.container}>
        <h2 className={styles.title} data-aos="fade-up">O Que Nossos Usuários Dizem</h2>
        <div className={styles.reviewGrid} data-aos="fade-up" data-aos-delay="200">
          {reviews.map((review) => (
            <div
              className={styles.reviewCard}
              key={review.id}
              data-aos="fade-up"
              data-aos-delay={review.id * 200}
            >
              <div className={styles.reviewImage}>
                <img src={review.image} alt={review.name} />
              </div>
              <div className={styles.reviewContent}>
                <p className={styles.reviewText}>"{review.text}"</p>
                <p className={styles.reviewName}>- {review.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
