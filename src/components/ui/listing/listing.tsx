'use client'
import { useState } from 'react';
import styles from './listing.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { List } from '../map/map';

interface Props {
    listingInfo: List
}

const Listing: React.FC<Props> = ({ listingInfo }) => {
    
    const [ isHovered, setIsHovered ] = useState<boolean>(false);

    const { id, title, monthlyRent, currency, peopleAllowed, bedrooms } = listingInfo;

    const { symbol } = currency;

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
            
            <figure className={styles.image}>
                <Image src='/photo.jpg' alt='image of listing' fill/>
                {/* <div className={styles.heart}>
                    <button>
                        <Image src='/heart.png' alt='heart icon' height={20} width={20} />
                    </button>
                </div> */}
                {isHovered && (
                    <div className={styles.floatingArrows}>
                        <button className={styles.leftArrow}>{'<'}</button>
                        <button className={styles.rightArrow}>{'>'}</button>
                    </div>
                )}
            </figure>
            <Link href={`/accommodations/${id}`}>
                <div className={styles.details}>
                    <span className={styles.info}>Up to { peopleAllowed == 1 ? `${peopleAllowed} person` : `${peopleAllowed} people`} - {bedrooms == 1 ? `${bedrooms} bedroom` : `${bedrooms} bedrooms`} </span>
                    <p className={styles.type}>{title}</p>
                    <p className={styles.date}>From 15 Apr 2025</p>
                    <p><strong>{symbol}{monthlyRent}</strong> / month <span className={styles.info}><i>Bills included</i></span></p>
                </div>
            </Link>
        
        </section>
    )
};

export default Listing;