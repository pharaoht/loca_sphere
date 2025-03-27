'use client'
import { useState } from 'react';
import styles from './listing.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Listing = () => {
    
    const [ isHovered, setIsHovered ] = useState<boolean>(false);

    return (
        <section className={styles.container}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={(event) => {
                const relatedTarget = event.relatedTarget;
                const insideContainer = event.currentTarget.contains(relatedTarget);
                if (!insideContainer) {
                    setIsHovered(false);
                }
            }}
        >
            <Link href='/'>
            <figure className={styles.image}>
                <Image src='/photo.jpg' alt='image of listing' fill/>
                {isHovered && (
                    <div className={styles.floatingArrows}>
                        <button className={styles.leftArrow}>{'<'}</button>
                        <button className={styles.rightArrow}>{'>'}</button>
                    </div>
                )}
            </figure>
            <div className={styles.details}>
                <span className={styles.info}>Up to 2 people - 1 bedroom</span>
                <p className={styles.type}> 1 Bedroom apartment in Barcelona</p>
                <p className={styles.date}>From 15 Apr 2025</p>
                <p><strong>$1200</strong> / month <span className={styles.info}><i>Bills included</i></span></p>
            </div>
            </Link>
        </section>
    )
};

export default Listing;