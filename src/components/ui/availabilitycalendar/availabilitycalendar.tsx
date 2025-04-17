import React from 'react';
import styles from './availabilitycalendar.module.css';

interface AvailabilityCalendarProps {
    year: number;
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

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ year }) => {

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

    return (
        <div className={styles.container}>
            <header className={styles.headerSection}>
                {year}
            </header>
            <div className={styles.grid}>
                {
                    monthsofTheYear.map((month, index) => {

                        const overlayPrecentage = calculateOverlayPercentage(index) || 0;

                        return(
                            <div key={index}
                                className={styles.gridItem}
                            >
                                <div className={styles.overlay} style={{width: `${overlayPrecentage}%`}}></div>
                                <span className={styles.text}>{month}</span>
                                <span className={styles.text}>$600</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default AvailabilityCalendar;