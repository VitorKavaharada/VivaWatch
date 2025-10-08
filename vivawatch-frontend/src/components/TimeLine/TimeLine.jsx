import { useEffect } from 'react';
import styles from './Timeline.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Timeline = () => {

 useEffect(() => {
    AOS.init({ duration: 1000 });
 }, []);

 const events = [
  { id: 1, date: 'INÍCIO', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },
  { id: 2, date: 'APRIMORAMENTO', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },
  { id: 3, date: 'CONSOLIDAÇÃO', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },
  { id: 4, date: 'ATUALMENTE', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' },
];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title} data-aos="fade-up" data-aos-delay="100">Nossa História</h1>
        <p className={styles.subtitle} data-aos="fade-up" data-aos-delay="150">
          Aqui contamos a jornada da nossa empresa desde os primeiros passos. <br />
          Cada marco representa um esforço coletivo para inovar e crescer. <br />
          Venha descobrir como chegamos até aqui!
        </p>
      </div>
      <div className={styles.timeline}>
        {events.map((event, index) => (
            <div key={event.id} className={styles.event}>
            <div className={styles.dot}></div>
            <div className={styles.content}>
                <span className={styles.date} data-aos="fade-up" data-aos-delay={200 + index * 100}>
                {event.date}
                </span>
                <p className={styles.dateParagraph} data-aos="fade-up" data-aos-delay={250 + index * 100}>
                {event.description}
                </p>
            </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;