'use client'
import Image from 'next/image';
import { Address, ListingImages } from '../map/map';
import styles from './listingcard.module.css';
import Link from 'next/link';
import React, { useState } from 'react';
import moment from 'moment';

interface ListingCardProps {
    variant: 'card' | 'listing'
    data: Address
}

const ListingCard: React.FC<ListingCardProps> = ({ variant = 'listing', data }) => {

    const cssBaseVariant = `${styles.base} ${styles[variant]}`;

    const { listing, latitude, listingId, longitude, city, } = data;

    const { images, peopleAllowed, bedrooms, title, currency, monthlyRent, isChecked, beds  } = listing;

    const { symbol } = currency;

    const todayDate = moment().format('DD MMM YYYY');

    const [activeIndex, setActiveIndex] = useState<number>(Array.isArray(images) && images.length > 0 ? images.findIndex(itm => itm.isPrimary) : 0);

    function imageCarousel(imageData: ListingImages[]): React.ReactElement {
        
        function swipe(condition: boolean){

            let min = 0;
            let max = images.length;

            setActiveIndex(prevState => {
                if(condition){
        
                    if(prevState + 1 >= max) return 0;
                    
                    return prevState + 1
                }
                else {
                    if(prevState - 1 <= min) return max;

                    return prevState -1
                }
            })
        };


        return (
            <figure className={styles.imageContainer} data-testid='listingCard'>
                {
                    Array.isArray(images) && images.length > 0 ? images.map((itm, idx) => {

                        if(activeIndex === idx){
                            return (
                                <React.Fragment key={itm.id}>
                                    <Image  src={itm.url} alt='image of listing' fill/>
                                   
                                </React.Fragment>
                            )
                        }
                    }) : (
                        <>
                            <Image src='/photo.jpg' alt='image of listing' fill />
                         
                        </>
                    )
                }
                <button onClick={() => swipe(false)} className={`${styles.navBtn} ${styles.prevBtn}`}>&lt;</button>
                <button onClick={() => swipe(true)} className={`${styles.navBtn} ${styles.nextBtn}`}>&gt;</button>
                <figcaption></figcaption>
            </figure>
        )
    }

    function details(){

        const href = variant == 'listing' ? 
            `/accommodations/${listingId}` 
            :   `/accommodations?long=${longitude}&lat=${latitude}&cityName=${city}&radius=10`;

        const pplAllowedString = peopleAllowed === 1 ? `${peopleAllowed} person` : `${peopleAllowed} people`;

        const bedroomString = bedrooms == 1 ? `${bedrooms} bedroom` : `${bedrooms} bedrooms`;

        return (
            <Link href={href}>
                <div className={styles.details}>
                    <span className={styles.info}>Up to {pplAllowedString} - {bedroomString} </span>
                    <p className={styles.title}>{title}</p>
                    { isChecked && <span className={styles.trustll}>Place Verified</span> }
                    {variant == 'listing' && <p className={styles.date}>From {todayDate}</p>}
                    <p className={styles.paymentContainer}>
                        <strong className={styles.price}>{symbol}{monthlyRent}</strong> / month 
                        <span className={styles.infoThin}><i>Bills included</i></span>
                    </p>
                </div>
            </Link>
        )
    }

    return (
        <section className={cssBaseVariant}>
            { imageCarousel(images) }
            { details() }
        </section>
    )
};

export default ListingCard;