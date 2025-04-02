'use client'
import React, { useEffect, useState } from 'react';
import styles from './calender.module.css';
import Image from 'next/image';

const months = [ 'January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

const days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];

const date = new Date();

const DaysOfTheWeekHeader: React.FC<{day: string}> = ({ day }) => 
    <div key={day} className={styles.weekday} role='columnheader'>{day}</div>;

const DateOfTheMonthBtn: React.FC<{date: number | null}> = ({ date }) => 
    <button key={date} className={`${date ? styles.day : styles.none}`} role='gridcell'>{date ? date : null}</button>

const Calendar = () => {

    const [ currentMonth, setCurrentMonth ] = useState<number>(date.getMonth());
    
    const [ currentYear, setCurrentYear ] = useState<number>(date.getFullYear());

    const [datesOfMonth, setDatesOfMonth ] = useState<any[]>(renderCalendarDays())

    const prevMonthHandler = () => {

        if(date.getFullYear() === currentYear && date.getMonth() === currentMonth) return;

        if(currentMonth === 0){
            setCurrentMonth(prev => 11)
            setCurrentYear(prev => prev - 1)

            return
        }

        setCurrentMonth(prev => prev - 1)

    };

    const nextMonthHandler = () => {

        if(currentMonth === 11){
            setCurrentYear(prev => prev + 1)
            setCurrentMonth(prev => 0);
        }
        else {

            setCurrentMonth(prev => prev + 1)
        }
    }

    function renderCalendarDays(){

        const startDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

        let b = Array(startDayOfMonth).fill(null);

        const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

        const d = Array.from({length: totalDays}, (ele, idx) => idx + 1);

        const x = b.concat(d);

        return x;
    }

    useEffect(() => {
        setDatesOfMonth(renderCalendarDays())
    }, [currentMonth])

    
    return (
        <div className={styles.calendar}>

            <header className={styles.calendarHeader}>
                <button 
                    type='button'
                    className={styles.prevMonth} 
                    aria-label='Previous month'
                    onClick={prevMonthHandler}
                >
                    <Image src='/chevron-left.png' alt='Left Chevron Swipe' height={20} width={20} />
                </button>
                <h2 className={styles.month_year}>
                    {months[currentMonth]} {currentYear}
                </h2>
                <button 
                    type='button'
                    className={styles.nextMonth} 
                    aria-label='Next month'
                    onClick={nextMonthHandler}
                >
                    <Image src='/chevron-right.png' alt='Right Chevron Swipe' height={20} width={20} />
                </button>
            </header>
            <section className={styles.calendarGrid} role='grid'>
                {
                    days.map(day => <DaysOfTheWeekHeader key={day} day={day}/>)
                }
                {   
                    datesOfMonth.map((date, idx) => <DateOfTheMonthBtn key={idx} date={date}/>)
                }
            </section>

        </div>
    )
};


export default Calendar