import React from 'react';
import styles from './availabilitycalendar.module.css';

interface AvailabilityCalendarProps {
    year: number;
    price: number | undefined;
    bookings: Array<any>
}

/**
 * AvailabilityCalendar component displays a calendar for availability and pricing.
 * It shows the months of the year and allows users to select dates for availability.
 * The component is styled using CSS modules.
 *
 * @component
 * @example
 * return (
 *   <AvailabilityCalendar />
 * )
 *
 * @returns {JSX.Element} The rendered AvailabilityCalendar component.
 *
*/

const monthsofTheYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ year, price = 0, bookings }) => {

    const today = new Date();
    const currentMonth = today.getMonth(); // 0-11
    const currentYear = today.getFullYear();
    const currentDate = today.getDate(); // 1-31

    const calculateOverlayPercentage = (month: number) => {

        if(currentYear !== year) return 0

        if(currentMonth === month){
            
            const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
            const daysPassed = currentDate; 

            return (daysPassed / daysInMonth) * 100; 
        }

        if(currentMonth > month) return 100; 
        
    };

    const isBooked = (year: number, month: number, bookingStart: number, bookingEnd: number ) => {
        
        const startOfMonthMs = new Date(year, month, 1).getTime();
        const endOfMonthMs = new Date(year, month + 1, 0).getTime();
        const daysInTheMonth = new Date(year, month + 1, 0).getDate();
        const msPerDay = 24 * 60 * 60 * 1000;

        let overlapStart = 0;
        let overlapEnd = 0;

        if (bookingStart <= endOfMonthMs && bookingEnd >= startOfMonthMs){
            overlapStart = Math.max(bookingStart, startOfMonthMs);
            overlapEnd = Math.min(bookingEnd, endOfMonthMs);
        }

        overlapStart = overlapStart && new Date(overlapStart).setHours(0, 0, 0, 0);
        overlapEnd = overlapEnd && new Date(overlapEnd).setHours(23, 59, 59, 999);

        const startDayOfOverlap = new Date(overlapStart).getDate();

        const overLapDays = (overlapEnd - overlapStart) / msPerDay;
        const widthPercentage = (Math.round(overLapDays) / daysInTheMonth) * 100;
        const leftPercentage = (startDayOfOverlap - 1) / daysInTheMonth * 100;

        return { widthPercentage, leftPercentage };
    }


    return (
        <div className={styles.container}>
            <header className={styles.headerSection}>
                {year}
            </header>
            <div className={styles.grid}>
                {
                    monthsofTheYear.map((month, index) => {
                        
                        const percentage = bookings.map((itm) => isBooked(year, index, itm.startDateMiliSeconds, itm.endDateMiliSeconds))
                        const overlayPrecentage = calculateOverlayPercentage(index) || 0;

                        return(
                            <div key={index}
                                className={styles.gridItem}
                            >
                                {
                                    percentage.map((itm)=> (
                                        <div 
                                            className={styles.bookedOverlay} 
                                            style={{ width: `${itm.widthPercentage}%`, left: `${itm.leftPercentage}%` }}>
                                        </div>
                                    ))
                                }
                                <div className={styles.overlay} style={{width: `${overlayPrecentage}%`}}></div>
                                <span className={styles.text}>{month}</span>
                                <span className={styles.text}>€{price}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default AvailabilityCalendar;