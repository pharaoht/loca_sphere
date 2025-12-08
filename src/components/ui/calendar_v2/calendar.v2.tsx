'use client'
import styles from './styles.module.css';

interface CalendarProps {
    moveInDate: string
    moveOutDate: string
}

const CalendarV2: React.FC<CalendarProps> = ({ moveInDate, moveOutDate }) => {


    const previousMonthHandler = () => {};

    const nextMonthHandler = () => {};

    const clearDates = () => {};

    const calculateTotalDayBetweenDates = () => {};


    return (
        <section className={styles.calendarContainer}>

        </section>
    )
};

export default CalendarV2;