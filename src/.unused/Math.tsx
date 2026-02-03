'use client';

import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp } from 'lucide-react';

import styles from '../styles/Landing.module.css';

export default function Math() {
  const calculations = [
    { value: '3', label: 'New Regulars Needed' },
    { value: '$350', label: 'Avg LTV Per Regular' },
    { value: '$1,050', label: 'Return Generated' },
    { value: '$11', label: 'Cost Per Photo' },
  ];

  return (
    <section className={styles.math}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className={styles.founderLabel}>ROI Strategy</span>
          <h2 className="text-display mb-4 text-4xl font-black text-white md:text-5xl">
            THE MATH — TRACKED RSVPS
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-gray-500">
            Your nights aren&apos;t judged on likes—they&apos;re judged on doors, covers, and who
            comes back next week.
          </p>
        </motion.div>

        <div className={styles.mathGrid}>
          {calculations.map((calc, idx) => (
            <motion.div
              key={idx}
              className={styles.mathItem}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <span className={styles.mathValue}>{calc.value}</span>
              <span className={styles.mathLabel}>{calc.label}</span>
            </motion.div>
          ))}
        </div>

        <div className={styles.mathResult}>
          <motion.div
            className={styles.mathBreakEven}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <h3 className={styles.mathBreakEvenTitle}>
              <Lightbulb className="text-gold" size={24} />
              THE BREAK-EVEN MATH
            </h3>
            <div className={styles.mathList}>
              <div className={styles.mathListItem}>
                <span className={styles.mathListLabel}>3 new regulars × $350 lifetime value</span>
                <span className={styles.mathListValue}>$1,050</span>
              </div>
              <div className={styles.mathListItem}>
                <span className={styles.mathListLabel}>Covers $995 VIP tier</span>
                <span className={styles.mathListValue}>1 month</span>
              </div>
              <div className={styles.mathListItem}>
                <span className={styles.mathListLabel}>One VIP table night (~$3K)</span>
                <span className={styles.mathListValue}>~3 months</span>
              </div>
              <div className={styles.mathListItem}>
                <span className={styles.mathListLabel}>Pilot breaks down to</span>
                <span className={styles.mathListValue}>~$11/photo</span>
              </div>
            </div>

            <div className={styles.mathHighlight}>
              <TrendingUp size={20} />
              ROI Positive with just 3 new regulars
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
