'use client';

import { motion } from 'framer-motion';
import { MousePointer2, Play } from 'lucide-react';

import styles from '../styles/Landing.module.css';

import MeshBackground from './MeshBackground';

export default function Hero() {
  const metrics = [
    { value: '79.7K', label: 'Views (90d)' },
    { value: '24HR', label: 'Delivery' },
    { value: '350+', label: 'Events Shot' },
    { value: '60 DAY', label: 'Guarantee' },
  ];

  return (
    <section className={styles.hero}>
      <MeshBackground />
      <div className={styles.glowContainer}>
        <div className={styles.pinkGlow} />
        <div className={styles.silverGlow} />
      </div>

      <div className={styles.content}>
        <motion.div
          className={styles.topLabel}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Minneapolis Royalty
        </motion.div>

        <motion.h1
          className={styles.headline}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-silver-chrome block">GETTUPPENT</span>
        </motion.h1>

        <motion.h2
          className={styles.subheadline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          The uniform of the Minneapolis night.
        </motion.h2>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          Premium content. Real ROI. Zero excuses.
        </motion.p>

        <motion.div
          className={styles.metaGrid}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {metrics.map((metric, idx) => (
            <div key={idx} className={styles.metaItem}>
              <span className={styles.metaValue}>{metric.value}</span>
              <span className={styles.metaLabel}>{metric.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className={styles.ctaContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <button className={styles.primaryCta}>
            <span>START $345 PILOT</span>
            <MousePointer2 size={18} />
          </button>
          <button className={styles.secondaryCta}>
            <div className={styles.playIcon}>
              <Play size={14} fill="currentColor" />
            </div>
            <span>VIEW THE WORK</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
