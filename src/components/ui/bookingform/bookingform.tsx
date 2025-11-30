'use client'
import React, { useEffect, useState } from 'react';
import styles from './bookingform.module.css';
import Image from 'next/image';
import Link from 'next/link';
import moment from 'moment';
import DatePicker from '../datepicker/datepicker';
import Calendar from '../infobar/filters/calender/calender';

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

//floating calendar window

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
  
                <DatePicker 
                    moveInInput={moveIn || today} 
                    moveOutInput={moveOut || future} 
                    isDisabled={false} 
                    floatingWindowContent={<Calendar/>} 
                />
                
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