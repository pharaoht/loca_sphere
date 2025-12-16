'use client'
import React, { useEffect } from 'react';
import styles from './bookingform.module.css';
import DatePicker from '../datepicker/datepicker';
import useParams from '@/hooks/useParams';
import useDate from '@/hooks/useDate';
import CalendarV2 from '../calendar_v2/calendar.v2';

interface BookingFormProps {
    monthlyRent: number;
    peopleAllowed?: string;
    listingId: string;
    currency: {
        symbol: string
    };
    availability: Array<{}>
}

const params = {
    moveIn: 'moveIn',
    moveOut: 'moveOut'
}

const BookingForm: React.FC<BookingFormProps> = ({ monthlyRent, currency, peopleAllowed, listingId, availability }) => {

    const { getParam, parseUrlDate, setParam, router, deleteParam } = useParams();
    const { createDateObject, convertDateToDisplay  } = useDate();

    const moveIn = parseUrlDate(getParam(params.moveIn) || '');
    const moveOut = parseUrlDate(getParam(params.moveOut) || '');

    const santizeMoveInDateObj = moveIn ? createDateObject(moveIn[0], moveIn[1], moveIn[2]) : null;
    const santizeMoveOutDateObj = moveOut ? createDateObject(moveOut[0], moveOut[1], moveOut[2]) : null;

    const isDisabled = !santizeMoveInDateObj || !santizeMoveOutDateObj;

    const cssToggleClass = isDisabled ? styles.disabled : styles.active;

    const handleBookingClick = () => {
        const moveInParam = moveIn?.join("-") ?? "";
        const moveOutParam = moveOut?.join("-") ?? "";
        const peopleParam = peopleAllowed || 1;

        router.push(
            `/booking/${listingId}?moveIn=${moveInParam}&moveOut=${moveOutParam}&peopleAllowed=${peopleParam}`
        );
    };

    const deleteParamHandler = () => {
        deleteParam([params.moveIn, params.moveOut])
    }

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
                    moveInInput={santizeMoveInDateObj} 
                    moveOutInput={santizeMoveOutDateObj} 
                    isDisabled={false} 
                    convertDateToString={convertDateToDisplay}
                    floatingWindowContent={
                        <CalendarV2
                            moveInDate={santizeMoveInDateObj}
                            moveOutDate={santizeMoveOutDateObj}
                            setParamHandler={setParam}
                            params={params}
                            isBookingCalendar={true}
                            bookingAvailability={availability}
                            deleteParamHandler={deleteParamHandler}
                         />
                    }
                />
                
                <div >
                    <button 
                        className={`${styles.bookBtn} ${cssToggleClass}`} 
                        onClick={handleBookingClick}
                        disabled={isDisabled}
                    >
                        Start booking
                    </button>
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