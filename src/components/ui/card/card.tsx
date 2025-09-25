import styles from './card.module.css';
import React from 'react';


export const CardLoadingSkeleton = () => (
    <div className={styles.container}>
        <div className={`${styles.image} ${styles.skeleton}`} />

        <div className={styles.listSection}>
            <div
                className={`${styles.listInfo} ${styles.skeleton}`}
                style={{ height: '14px', width: '60%' }}
            />
            <div
                className={`${styles.trustll} ${styles.skeleton}`}
                style={{ height: '18px', width: '40%' }}
            />
            <div
                className={`${styles.price} ${styles.skeleton}`}
                style={{ height: '20px', width: '50%' }}
            />
        </div>
    </div>
)
