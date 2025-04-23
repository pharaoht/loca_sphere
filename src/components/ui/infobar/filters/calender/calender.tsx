'use client'
import React, { useEffect, useState } from 'react';
import styles from './calender.module.css';
import Image from 'next/image';
import useParams from '@/hooks/useParams';
import moment from 'moment';

const months = [ 'January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

const days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];

const date = new Date();

const Calendar = () => {

    const [ currentMonth, setCurrentMonth ] = useState<number>(date.getMonth());
    
    const [ currentYear, setCurrentYear ] = useState<number>(date.getFullYear());

    const [ datesOfMonth, setDatesOfMonth ] = useState<any[]>(renderCalendarDays());

    const [ moveInDate, setMoveInDate ] = useState<{ day: number, month: number, year: number} | null>(null);

    const [ moveOutDate, setMoveOutDate ] = useState<{ day: number, month: number, year: number} | null>(null);

    const { setParam, deleteParam } = useParams();

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

    const DaysOfTheWeekHeader: React.FC<{day: string}> = ({ day }) => 
        <div key={day} className={styles.weekday} role='columnheader'>{day}</div>;
    
    const DateOfTheMonthBtn: React.FC<{day: number | null, month: number, year: number }> = ({ day, month, year }) => {

        if(!day) return ( <div></div>);
    
        const cssStrikeThrough = styles.strikeThrough;
        const cssDayBtnStyles = styles.day;
        const cssActiveStyles = styles.active;
        const cssIsBetween = styles.highlight;

        const buttonDate = moment(`${year}-${month}-${day}`);
        const td = moment(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
        const miDate = moment(`${moveInDate?.year}-${moveInDate?.month}-${moveInDate?.day}`);
        const moDate = moment(`${moveOutDate?.year}-${moveOutDate?.month}-${moveOutDate?.day}`);
    
        const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {

            event.preventDefault();

            if(moveInDate == null && day !== null) setMoveInDate({ day: day, month: month, year: year});
            
            else if(moveOutDate == null && day !== null) setMoveOutDate({ day: day, month: month, year: year});
            
        };

        const renderStyles = () => {

            if(buttonDate.isBefore(td)) return cssStrikeThrough;
            if(moveInDate != null && buttonDate.isBefore(miDate)) return cssStrikeThrough;
            if(moveInDate != null && moveOutDate != null && buttonDate.isAfter(miDate) && buttonDate.isBefore(moDate)) return cssIsBetween;
            return `${cssDayBtnStyles} ${buttonDate.isSame(miDate) ? cssActiveStyles : null} ${buttonDate.isSame(moDate) && cssActiveStyles}`
            
        }

        return (
            <button 
                key={day} 
                className={renderStyles()} 
                type='button' role='gridcell' 
                disabled={buttonDate.isBefore(td) ? true : false }
                onClick={(e) => onClickHandler(e)}
            >
                {day}
            </button>
        )
    }

    const clearDates = (event: React.MouseEvent<HTMLButtonElement>) => {
        
        event.preventDefault();

        setMoveInDate(null);
        setMoveOutDate(null);
        deleteParam(['moveIn', 'moveOut']);
    
    }

    const submitDates = (event: React.MouseEvent<HTMLButtonElement>) => {

        event.preventDefault();

        if((!moveInDate || !moveOutDate)){
            return
        }

        const queries = [
            { key: 'moveIn', value: `${moveInDate?.year}-${moveInDate?.month}-${moveInDate?.day}`},
            { key: 'moveOut', value: `${moveOutDate?.year}-${moveOutDate?.month}-${moveOutDate?.day}`}
        ];

        setParam(queries);
        
    }

    useEffect(() => {
        setDatesOfMonth(renderCalendarDays())
    }, [currentMonth]);

    
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
                {   days.map(day => <DaysOfTheWeekHeader key={day} day={day}/>) }
                {   datesOfMonth.map((day, idx) => <DateOfTheMonthBtn key={idx} day={day} month={currentMonth} year={currentYear} /> )    }
            </section>
            <section className={styles.queryHolder}>
                <button className={styles.queryBtn} type='button' onClick={clearDates}>Clear dates</button>
                <button 
                    className={`${styles.queryBtn} ${ (!moveInDate || !moveOutDate) && styles.disabled}`} 
                    type='button' 
                    onClick={submitDates}
                    disabled={(!moveInDate || !moveOutDate) ? true : false}
                >
                    Select dates
                </button>
            </section>

        </div>
    )
};


export default Calendar