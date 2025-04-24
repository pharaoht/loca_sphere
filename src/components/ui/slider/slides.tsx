'use client'
import Link from 'next/link';
import Card from '../card/card';
import styles from './slider.module.css';
import { useRef } from 'react';
import Image from 'next/image';

interface SlideProps {
    listings: Array<{}>
    title: string
}

const Slider: React.FC<SlideProps> = ({ listings, title }) => {

    const sliderRef = useRef<HTMLUListElement>(null);

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
                <h4 className={styles.title}>{title}</h4>
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
                    listings.map((itm, idx) => (
                        <li key={idx}>
                            <Link href='/accommodations?long=-0.083333333&lat=51.5&cityName=Greater%20London&radius=10'>
                                <Card/>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </section>
    )
};

export default Slider;