'use client';

import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import styles from '../styles/Landing.module.css';

export default function Comparison() {
  const oldWay = [
    'Posts go up days late—momentum dead.',
    'Freelancers ghost on busy weekends.',
    'Generic content that looks like everyone else.',
    'Zero ROI tracking—just &apos;vibes&apos; and hope.',
  ];

  const standardWay = [
    '24-72h delivery guaranteed. Every time.',
    'Dedicated team with backup systems.',
    'Signature &apos;GettUpp Look&apos; builds your brand.',
    'ShotClock ROI tracking from post to door.',
  ];

  return (
    <section className={styles.comparison}>
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <h2 className="text-display text-4xl font-black leading-tight text-white md:text-6xl">
            THE OLD WAY <span className="text-gray-600">VS</span> <br />
            <span className="text-gold">THE GETTUPP STANDARD</span>
          </h2>
        </motion.div>

        <div className={styles.comparisonContent}>
          <motion.div
            className={styles.comparisonCard}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <h3 className={styles.comparisonTitle}>TIRED OF CONTENT THAT GHOSTS YOU?</h3>
            <ul className={styles.comparisonList}>
              {oldWay.map((item, idx) => (
                <li key={idx} className={styles.comparisonItem}>
                  <X className={`${styles.comparisonIcon} text-red-500`} size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className={`${styles.comparisonCard} ${styles.standard}`}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <h3 className={`${styles.comparisonTitle} ${styles.comparisonStandardTitle}`}>
              A SYSTEM THAT PACKS VENUES.
            </h3>
            <ul className={styles.comparisonList}>
              {standardWay.map((item, idx) => (
                <li key={idx} className={`${styles.comparisonItem} ${styles.standard}`}>
                  <Check className={`${styles.comparisonIcon} text-gold`} size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
