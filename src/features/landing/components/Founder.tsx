'use client';

import { motion } from 'framer-motion';
import styles from '../styles/Landing.module.css';

export default function Founder() {
  const stats = [
    { value: '350+', label: 'Events Shot in 2024' },
    { value: '10+', label: 'Partner Venues' },
    { value: '99%', label: 'On-Time Delivery' },
    { value: '79.7K', label: 'Views (90 Days)' },
  ];

  return (
    <section className={styles.founder}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.founderLabel}>Meet the Founder</span>
          <h2 className={styles.founderTitle}>JOHNNY CAGE</h2>
          <div className={styles.founderSub}>Founder & Lead Photographer</div>
          <div className={styles.founderDistinction}>Official Last Call Photographer</div>
        </motion.div>

        <div className={styles.founderContent}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white text-display">THE MAN BEHIND MINNEAPOLIS NIGHTS</h3>
            <p className={styles.founderBio}>
              Johnny Cage is the lens behind 350+ Minneapolis nights this year and the name venues recognize before they see the camera.
              <br /><br />
              Official photographer for <strong>Last Call</strong> and a fixture at <strong>DJ YS</strong> sets, he turned &quot;pull up with the homies&quot; access into a system that delivers nightclub-grade content on a 24-72h clock.
              <br /><br />
              <strong>GettUpp ENT</strong> is that system—built by the guy who&apos;s already in the room, then hardened with an enterprise playbook so your content hits on schedule every time.
            </p>
            
            <motion.div 
              className={styles.founderStats}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              {stats.map((stat, idx) => (
                <div key={idx} className={styles.founderStatItem}>
                  <span className={styles.founderStatValue}>{stat.value}</span>
                  <span className={styles.founderStatLabel}>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.founderImageWrapper}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            {/* Image placeholder for Johnny Cage */}
            <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold bg-zinc-900">
              JOHNNY CAGE
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
