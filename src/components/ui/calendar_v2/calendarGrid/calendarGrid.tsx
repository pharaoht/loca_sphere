import React, { useEffect, useState } from "react";
import styles from './cg.module.css';
import CalendarBtn from "../calendarButton/calendarButton";

const MONTHSOFTHEYEAR = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const DAYSOFTHEWEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DaysOfTheWeekTableHeader: React.FC<{ daysOfTheWeekArray: Array<String> }> = ({ daysOfTheWeekArray }) => (
    daysOfTheWeekArray.map((itm, idx) => (
        <div className={styles.weekday} role='columnheader' key={idx}>{itm}</div>
    ))
);

interface CalendarGridProps {
    monthIndex: number;
    yearValue: number;
    displayLeftToggleArrow: boolean;
    toggleMonthHandler: (...args: any) => void;
    setDateHandler: (...args: any) => void;
    calendarDayGridArray: number[];
    selectedMoveInDate: Date | null;
    selectedMoveOutDate: Date | null;
    forBooking?: boolean
}

const CalendarGrid: React.FC<CalendarGridProps> = (
    { monthIndex, yearValue, displayLeftToggleArrow, toggleMonthHandler, calendarDayGridArray, 
        setDateHandler, selectedMoveInDate, selectedMoveOutDate, forBooking = false 
    }
) => {

    const displayMonthValue = MONTHSOFTHEYEAR[monthIndex];

    const [ animation, setAnimation ] = useState<boolean>(false);
    
    useEffect(() => {
        setAnimation(true);

        const timeOut = setTimeout(()=> {
            setAnimation(false)
        }, 250);

        return () => clearTimeout(timeOut)
    }, [monthIndex])

    return (
        <section className={styles.calendarTable}>
            <header className={styles.caption}>
                {displayLeftToggleArrow && <button className={`${styles.switchBtn} ${styles.toggleBtnL}`} onClick={toggleMonthHandler}>&lt;</button>} 
                <span className={`${styles.monthDisplay} ${animation && styles.slide}`}>{displayMonthValue} {yearValue}</span> 
                {!displayLeftToggleArrow && <button className={`${styles.switchBtn} ${styles.toggleBtnR}`} onClick={toggleMonthHandler}>&gt;</button>}
            </header>
            <section className={styles.gridDates} role='grid'>
                <DaysOfTheWeekTableHeader  daysOfTheWeekArray={DAYSOFTHEWEEK}/> 
                {
                    calendarDayGridArray.map((itm, idx) => (
                       <CalendarBtn
                            key={idx} 
                            day={itm} 
                            year={yearValue} 
                            month={monthIndex} 
                            onClickHandler={setDateHandler} 
                            moveInDate={selectedMoveInDate?.getTime() || null}
                            moveOutDate={selectedMoveOutDate?.getTime() || null}
                        />
                    ))
                }
            </section>
    
       </section> 
    )
};

export default CalendarGrid;