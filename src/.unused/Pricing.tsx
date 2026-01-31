'use client';

import { motion } from 'framer-motion';
import styles from '../styles/Pricing.module.css';

const tiers = [
  {
    name: 'Pilot',
    price: 345,
    features: ['Strategic Audit', 'Growth Roadmap', 'AI Benchmarking', '24h ShotClock SLA'],
    highlighted: false,
  },
  {
    name: 'Tier 1 (T1)',
    price: 445,
    features: ['Full Execution Pack', 'Bi-weekly Strategy Sync', 'Priority AI Scoring', '48h ShotClock SLA'],
    highlighted: true,
  },
  {
    name: 'Tier 2 (T2)',
    price: 695,
    features: ['Scale Operations', 'Dedicated Account Lead', 'Predictive Analysis', '72h ShotClock SLA'],
    highlighted: false,
  },
  {
    name: 'Tier 3 (T3)',
    price: 995,
    features: ['Global Dominance', 'On-site Quarterly Sync', 'Custom AI Models', '72h ShotClock SLA'],
    highlighted: false,
  }
];

export default function Pricing() {
  return (
    <section className={styles.pricing}>
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Choose Your <span className="text-gold">Operational Intensity</span>
      </motion.h2>

      <div className={styles.grid}>
        {tiers.map((tier, idx) => (
          <motion.div 
            key={tier.name}
            className={`${styles.card} glass ${tier.highlighted ? styles.highlighted : ''}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className={styles.tierName}>{tier.name}</div>
            <div className={styles.price}>
              ${tier.price}<span className={styles.perMonth}>/mo</span>
            </div>
            
            <ul className={styles.featureList}>
              {tier.features.map(feature => (
                <li key={feature} className={styles.featureItem}>{feature}</li>
              ))}
            </ul>

            <button className={`${styles.actionButton} ${tier.highlighted ? styles.actionButtonHighlighted : ''}`}>
              Secure Access
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
