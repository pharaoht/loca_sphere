'use client'
import styles from './slider.module.css';
import { ReactElement, ReactNode, useRef } from 'react';
import Image from 'next/image';
import React from 'react';

interface SlideProps {
    children: ReactElement | ReactNode;
    title: string | null;
    apiData?: any
}

const Slider: React.FC<SlideProps> = ({ children, title, apiData }) => {

    const sliderRef = useRef<HTMLUListElement>(null);

    const props = { apiData: apiData }

    const swipeLeft = () => {

        if(!sliderRef.current) return;

        sliderRef.current.scrollBy({ left: -600, behavior: 'smooth' });
    }

    const swipeRight = () => {

        if(!sliderRef.current) return;

        sliderRef.current.scrollBy({ left: 600, behavior: 'smooth' });
    }

    return (
        <section className={styles.container}>
            <header className={styles.header}>
                { title && <h4 className={styles.title}>{title}</h4> }
                <nav className={styles.navBtns}>
                    <button 
                        className={styles.btns}
                        onClick={swipeLeft}
                    >
                        <Image src='/chevron-left.png' alt='Left Chevron Swipe' height={20} width={20} />
                    </button>
                    <button 
                        className={styles.btns}
                        onClick={swipeRight}
                    >
                        <Image src='/chevron-right.png' alt='Left Chevron Swipe' height={20} width={20} />
                    </button>
                </nav>
            </header>

            <ul className={styles.cardList} ref={sliderRef}>
                {
                    React.Children.map(children, (child) => {

                        return child
                    })
                }
            </ul>

        </section>
    )
};

export default Slider;