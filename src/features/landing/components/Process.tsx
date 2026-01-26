'use client';

import { motion } from 'framer-motion';
import styles from '../styles/Landing.module.css';

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'BOOK YOUR PILOT',
      desc: 'Fill out the quick intake form. We&apos;ll confirm your date within 24 hours.',
    },
    {
      number: '02',
      title: 'WE PULL UP',
      desc: 'Johnny and the team arrive, capture the energy, and document the night.',
    },
    {
      number: '03',
      title: 'EDIT & DELIVER',
      desc: '30 club-ready edits delivered in 24-72 hours. Full GettUpp treatment.',
    },
    {
      number: '04',
      title: 'POST & TRACK',
      desc: 'Get your 7-10 day posting plan. We track from post to door with ShotClock.',
    },
  ];

  return (
    <section className={styles.process}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.founderLabel}>The Process</span>
          <h2 className="text-4xl md:text-5xl font-black text-white text-display mb-4">HOW IT WORKS</h2>
          <p className="text-gray-500 max-width-md mb-12">From booking to packed venue—here&apos;s the system that makes it happen.</p>
        </motion.div>

        <div className={styles.processGrid}>
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className={styles.processItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className={styles.processNumber}>{step.number}</div>
              <h3 className={styles.processTitle}>{step.title}</h3>
              <p className={styles.processDesc}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
