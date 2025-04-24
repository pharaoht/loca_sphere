'use client'
import React, { useEffect, useState } from 'react';
import styles from './calender.module.css';
import Image from 'next/image';
import useParams from '@/hooks/useParams';
import moment from 'moment';

const months = [ '', 'January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

const days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];

const DATE = new Date();

const DATEMONTHOFTODAY = DATE.getMonth() + 1;

const DATEYEAROFTODAY = DATE.getFullYear();

const DATEDAYOFTODAY = DATE.getDate();

const Calendar = () => {
    
    const { setParam, deleteParam, getParam } = useParams();

    const [ monthValueOFCalendar, setCurrentMonth ] = useState<number>(getParam('moveIn') ? moment(getParam('moveIn'), 'YYYY-MM-DD').month() + 1 : DATEMONTHOFTODAY);
    
    const [ yearValueOFCalendar, setCurrentYear ] = useState<number>(getParam('moveIn') ? moment(getParam('moveIn'), 'YYYY-MM-DD').year() : DATEYEAROFTODAY);

    const [ datesOfMonth, setDatesOfMonth ] = useState<any[]>(renderCalendarDays());

    const [ moveInDate, setMoveInDate ] = useState<{ day: number, month: number, year: number} | null>(dateToObject(getParam('moveIn') || '') ?? null);

    const [ moveOutDate, setMoveOutDate ] = useState<{ day: number, month: number, year: number} | null>(dateToObject(getParam('moveOut') || '') ?? null);

    const [ totalDays, setTotalDays ] = useState<number>(0);

    const prevMonthHandler = () => {

        if(DATEYEAROFTODAY === yearValueOFCalendar && DATEMONTHOFTODAY === monthValueOFCalendar) return;

        if(monthValueOFCalendar === 1){
            setCurrentMonth(prev => 12)
            setCurrentYear(prev => prev - 1)

            return
        }

        setCurrentMonth(prev => prev - 1)

    };

    const nextMonthHandler = () => {

        if(monthValueOFCalendar === 12){
            setCurrentYear(prev => prev + 1)
            setCurrentMonth(prev => 1);
        }
        else {

            setCurrentMonth(prev => prev + 1)
        }
    }

    function renderCalendarDays(){

        const startDayOfMonth = new Date(yearValueOFCalendar, monthValueOFCalendar - 1, 1).getDay();

        let b = Array(startDayOfMonth).fill(null);

        const totalDays = new Date(yearValueOFCalendar, monthValueOFCalendar, 0).getDate();

        const d = Array.from({length: totalDays}, (ele, idx) => idx + 1);

        const x = b.concat(d);
        
        return x;
    }

    const clearDates = (event: React.MouseEvent<HTMLButtonElement>) => {
        
        event.preventDefault();

        if(moveInDate == null) return

        setMoveInDate(null);
        setMoveOutDate(null);
        setTotalDays(0);
        deleteParam(['moveIn', 'moveOut']);
    
    }

    const calulateDays = ( startDate: string, endDate: string): number => {

        if(typeof startDate !== 'string' || typeof endDate !== 'string') return 0;

        const d = moment(startDate);
        const dd = moment(endDate);

        return dd.diff(d, 'days'); 
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

    function dateToObject(dateString: string): { year: number, month: number, day: number} | null {

        if(dateString === '') return null;

        const strArr = dateString.split('-');

        return { year: +strArr[0], month: +strArr[1], day: +strArr[2] }

    }

    const DaysOfTheWeekHeader: React.FC<{day: string}> = ({ day }) => 
        <div key={day} className={styles.weekday} role='columnheader'>{day}</div>;
    
    const DateOfTheMonthBtn: React.FC<{day: number | null, month: number, year: number }> = ({ day, month, year }) => {

        if(!day) return ( <div></div>);

        const buttonDate = createDateString(year, month, day);
        const td = createDateString(DATEYEAROFTODAY, DATEMONTHOFTODAY, DATEDAYOFTODAY)
        const miDate = createDateString(moveInDate?.year, moveInDate?.month, moveInDate?.day);
        const moDate = createDateString(moveOutDate?.year, moveOutDate?.month, moveOutDate?.day);
    
        const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {

            event.preventDefault();

            if(moveInDate == null && day !== null) setMoveInDate({ day: day, month: month, year: year});
            
            else if(moveOutDate == null && day !== null){

                setMoveOutDate({ day: day, month: month, year: year});
            }
            
        };

        function createDateString(yyyy?: number, mm?: number, dd?: number){
            if(!yyyy || !mm || !dd) return null
            return moment(`${yyyy}-${mm}-${dd}`);
        }

        const renderStyles = () => {

            const cssStrikeThrough = styles.strikeThrough;
            const cssDayBtnStyles = styles.day;
            const cssActiveStyles = styles.active;
            const cssIsBetween = styles.highlight;

            if(buttonDate && buttonDate.isBefore(td)) return cssStrikeThrough;
            if(buttonDate && moveInDate != null && buttonDate.isBefore(miDate)) return cssStrikeThrough;
            if(buttonDate && moveInDate != null && moveOutDate != null && buttonDate.isAfter(miDate) && buttonDate.isBefore(moDate)) return cssIsBetween;
            return `${cssDayBtnStyles} ${buttonDate && buttonDate.isSame(miDate) ? cssActiveStyles : null} ${buttonDate && buttonDate.isSame(moDate) && cssActiveStyles}`
            
        }

        return (
            <button 
                key={day} 
                className={renderStyles()} 
                type='button' role='gridcell' 
                disabled={buttonDate && buttonDate.isBefore(miDate) ? true : false }
                onClick={(e) => onClickHandler(e)}
            >
                {day}
            </button>
        )
    }

    useEffect(() => {
        setDatesOfMonth(renderCalendarDays())
    }, [monthValueOFCalendar]);

    useEffect(() => {
        if(moveOutDate !== null){
            const d = `${moveInDate?.year}-${moveInDate?.month}-${moveInDate?.day}`
            const dd = `${moveOutDate?.year}-${moveOutDate?.month}-${moveOutDate?.day}`
            setTotalDays(calulateDays(d, dd))
        }

    }, [moveOutDate])

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
                    {months[monthValueOFCalendar]} {yearValueOFCalendar}
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

                {   datesOfMonth.map((day, idx) => (
                            <DateOfTheMonthBtn  
                                key={idx}   
                                day={day} 
                                month={monthValueOFCalendar} 
                                year={yearValueOFCalendar} 
                            /> 
                        )    
                )}
            </section>
            <section className={styles.queryHolder}>
                {   moveInDate && moveOutDate &&
                    <span className={styles.totalDaysText}>{totalDays} total days</span>
                }

                <button className={styles.queryBtn} type='button' onClick={clearDates}>
                    Clear dates
                </button>

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