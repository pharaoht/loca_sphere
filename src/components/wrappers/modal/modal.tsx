'use client'
import styles from './modal.module.css';
import Image from 'next/image';

const Modal = () => {
    return (
        <div className={styles.modal}>
        <div className={styles.modalContent}>
            <span className={styles.close}>&times;</span>
            <h2>Modal Title</h2>
            <p>This is a simple modal component.</p>
        </div>
        </div>
    );
};

export default Modal;