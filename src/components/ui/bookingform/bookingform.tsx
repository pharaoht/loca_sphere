import React from 'react';
import styles from './bookingform.module.css';
import Image from 'next/image';

interface BookingFormProps {
    monthlyRent: number
    peopleAllowed?: string
    moveIn?: string
    moveOut?: string 
    currency: {
        symbol: string
    }
}

const BookingForm: React.FC<BookingFormProps> = ({ monthlyRent, currency, moveIn, moveOut, peopleAllowed }) => {

    return (
        <section className={`${styles.bookingPrice} ${styles.collapsed}`}>
            <form className={styles.bpInnerContainer}>
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
                            {moveIn || '09-09-09'}
                        </button>
                    </div>
                    <div className={styles.arrowContainer}> 
                        <Image src='/arrow-right.png' alt='' height={35} width={35} />
                    </div>
                    <div className={styles.btnContainer}>
                        <label className={styles.btnLabel}>Move in</label>
                        <button className={styles.fakeInput} type='button'>
                            { moveOut || '09-09-09'}
                        </button>
                    </div>
                </div>
                <div >
                    <button className={styles.bookBtn}>Start booking</button>
                </div>

                <p>Don't worry - pressing this button won't charge you anything!</p>

                <hr/>

                <div className={styles.bpTerms}>
                    <p>If and only after the landlord approves</p>
                    <p>You'll pay through LocaSphere:</p>

                </div>
            </form>
        </section>
    )
};


export default BookingForm;