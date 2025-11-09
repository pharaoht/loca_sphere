'use client'
import React, { useEffect, useState } from 'react';
import styles from './bookingform.module.css';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';

interface BookingFormProps {
    monthlyRent: number
    peopleAllowed?: string
    moveIn?: string
    moveOut?: string 
    listingId: string
    currency: {
        symbol: string
    }
}

const BookingForm: React.FC<BookingFormProps> = ({ monthlyRent, currency, moveIn, moveOut, peopleAllowed, listingId }) => {

    const [ today, setToday ] = useState<string>('');
    const [ future, setFuture ] = useState<string>('');

    useEffect(() => {
        setToday(moment(new Date()).format('YYYY-MM-DD'))
        setFuture(moment(new Date()).add(30, 'days').format('YYYY-MM-DD'))
    }, [])

    return (
        <section className={`${styles.bookingPrice} ${styles.collapsed}`}>
            <div className={styles.bpInnerContainer}>
                <header className={styles.bpHeader}>
                    <p className={styles.bpTitle}>
                        <span className={styles.price}>{currency.symbol} {monthlyRent}</span>
                        <span className={styles.duration}>/month</span>
                    </p>
                    <p>{ peopleAllowed ? `${peopleAllowed} person(s)` : `1 person`}</p>
                </header>
                <div className={styles.moveCoa}>
                    <div className={styles.btnContainer}>
                        <label className={styles.btnLabel}>Move in</label>
                        <button className={styles.fakeInput} type='button' >
                            {moveIn || today}
                        </button>
                    </div>
                    <div className={styles.arrowContainer}> 
                        <Image src='/arrow-right.png' alt='' height={35} width={35} />
                    </div>
                    <div className={styles.btnContainer}>
                        <label className={styles.btnLabel}>Move out</label>
                        <button className={styles.fakeInput} type='button'>
                            {moveOut || future}
                        </button>
                    </div>
                </div>
                <div >
                    <Link 
                        href={`/booking/${listingId}?moveIn=${moveIn || today}&moveOut=${moveOut || future}&peopleAllowed=${peopleAllowed || 1}`} 
                        className={styles.bookBtn}>
                        Start booking
                    </Link>
                </div>

                <p>Don't worry - pressing this button won't charge you anything!</p>

                <hr/>

                <div className={styles.bpTerms}>
                    <p>If and only after the landlord approves</p>
                    <p>You'll pay through LocaSphere:</p>

                </div>
            </div>
        </section>
    )
};


export default BookingForm;