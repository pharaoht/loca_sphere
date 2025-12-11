'use client'
import { useState } from 'react';
import CalendarGrid from './calendarGrid/calendarGrid';
import styles from './styles.module.css';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import { useWindowSize } from 'usehooks-ts';
import useDate from '@/hooks/useDate';

interface CalendarProps {
    moveInDate: Date;
    moveOutDate: Date | null;
    params: { moveIn: string, moveOut: string };
    setParamHandler: (queries: {
        key: string;
        value: string;
    }[]) => void;
    closedWindowHandler?: () => void
}

const generateCalendarDays = (year: number, month: number) => {
    //pure function
    const startDayOfTheMonth = new Date(year, month, 1).getDay();

    let padding = Array(startDayOfTheMonth).fill(undefined);

    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    const days = Array.from({ length: totalDaysInMonth }, (ele, idx) => idx + 1);

    const grid = padding.concat(days);

    return grid;
};

const TODAY = new Date();
const TODAYSMONTH = TODAY.getMonth();
const TODAYSYEAR = TODAY.getFullYear();

//todo get screen width, to determine rendering of both grid components
const CalendarV2: React.FC<CalendarProps> = ({ moveInDate, setParamHandler, params, closedWindowHandler = undefined, moveOutDate }) => {

    const [ currentMonthIndex, setCurrentMonthIndex ] = useState<number>(moveInDate.getMonth());
    const [ currentYearValue, setCurrentYearValue ] = useState<number>(moveInDate.getFullYear());
    const [ selectedMoveInDate, setSelectedMoveInDate ] = useState<Date | null>(moveInDate);
    const [ selectedMoveOutDate, setSelectedMoveOutDate] = useState<Date | null>(moveOutDate);

    const { width } = useWindowSize();
    const { convertDateToDisplay } = useDate();

    //Don’t store derived in state.
    //If you can compute it → don’t store it.
    const isEndOfYear = currentMonthIndex === 11;
    const nextMonthIndex = isEndOfYear ? 0 : currentMonthIndex + 1;
    const nextYearValue = isEndOfYear ? currentYearValue + 1 : currentYearValue;
    const isDisabled = TODAYSYEAR === currentYearValue && TODAYSMONTH === currentMonthIndex;
    const totalDays = calculateTotalDays(selectedMoveInDate, selectedMoveOutDate);
    const isMobile = width <= 800;

    function calculateTotalDays(startDate: Date | null, endDate: Date | null){

        if(!startDate || !endDate) return 0;

        const total = Math.ceil(( endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

        return total;
    }

    const previousMonthHandler = () => {
        //react event handlers dont need to be pure, they dont effect the render process

        if(isDisabled) return;

        if(currentMonthIndex == 0){
            setCurrentMonthIndex(11);
            setCurrentYearValue(prev => prev - 1);
            return;
        }

        setCurrentMonthIndex(prev => prev - 1);
    };

    const nextMonthHandler = () => {

        if(currentMonthIndex == 11){
            setCurrentMonthIndex(0);
            setCurrentYearValue(prev => prev + 1);
            return;
        }

        setCurrentMonthIndex(prev => prev + 1)
    };

    const clearDatesHandler = () => {
        setSelectedMoveInDate(null);
        setSelectedMoveOutDate(null);
    };

    const submitDatesHandler = () => {

        if(!selectedMoveInDate || !selectedMoveOutDate) return toast.error('Please select desired dates.')

        const moveInDateString = moment(selectedMoveInDate).format('YYYY-MM-DD');
        const moveOutDateString = moment(selectedMoveOutDate).format('YYYY-MM-DD');

        const p = [
            { key: params.moveIn, value: moveInDateString }, 
            { key: params.moveOut, value: moveOutDateString }
        ]

        setParamHandler(p);

        if (closedWindowHandler) closedWindowHandler();
    };

    const setDatesHandler = (y: number, m: number, d: number) => {

        const desiredDate = new Date(y,m,d,0,0,0,0);
        const desiredDateMs = desiredDate.getTime();

        if (!selectedMoveInDate) {
            return setSelectedMoveInDate(desiredDate);
        }

        const moveInDatesms = selectedMoveInDate.getTime();

        if (selectedMoveInDate && desiredDateMs === moveInDatesms){
            setSelectedMoveOutDate(null);
            return setSelectedMoveInDate(null);
        }
        if (selectedMoveInDate && desiredDateMs < moveInDatesms){
            return setSelectedMoveInDate(desiredDate)
        }
        if (selectedMoveInDate && !selectedMoveOutDate && desiredDateMs > moveInDatesms){
            return setSelectedMoveOutDate(desiredDate)
        }
        if (selectedMoveInDate && selectedMoveOutDate && desiredDateMs > selectedMoveOutDate.getTime()){
            return setSelectedMoveOutDate(desiredDate)
        }
    };

    return (
        <section className={styles.calendarContainer}>
            <ToastContainer position="bottom-right" autoClose={3000} />
            <header className={styles.selectedDateContainer}>
                <span className={styles.date}>{convertDateToDisplay(selectedMoveInDate)}</span>
                <span className={styles.arrow}>&gt;</span>
                <span className={styles.date}>{convertDateToDisplay(selectedMoveOutDate)}</span>
            </header>
            <div className={styles.calendarGridContainer}>
                <CalendarGrid 
                    toggleMonthHandler={previousMonthHandler} 
                    monthIndex={currentMonthIndex} 
                    yearValue={currentYearValue} 
                    displayLeftToggleArrow={true}
                    calendarDayGridArray={generateCalendarDays(currentYearValue, currentMonthIndex)}
                    setDateHandler={setDatesHandler}
                    selectedMoveInDate={selectedMoveInDate}
                    selectedMoveOutDate={selectedMoveOutDate}
                    isMobile={isMobile}
                    mobileHandler={nextMonthHandler}

                />
                { !isMobile &&
                    <CalendarGrid 
                        toggleMonthHandler={nextMonthHandler} 
                        monthIndex={nextMonthIndex} 
                        yearValue={nextYearValue} 
                        displayLeftToggleArrow={false}
                        calendarDayGridArray={generateCalendarDays(nextYearValue, nextMonthIndex)}
                        setDateHandler={setDatesHandler}
                        selectedMoveInDate={selectedMoveInDate}
                        selectedMoveOutDate={selectedMoveOutDate}
                    />
                }
            </div>
            <div className={styles.calendarControls}>
                <span className={styles.daysDisplay}>Total days: {totalDays}</span>
                <button 
                    className={styles.calendarControlBtn} 
                    type='button' 
                    onClick={clearDatesHandler}
                >
                    Clear dates
                </button>
                <button 
                    className={styles.calendarControlBtn} 
                    type='button' 
                    onClick={submitDatesHandler}
                >
                    Submit dates
                </button>
            </div>
        </section>
    )
};

export default CalendarV2;
//Parents sanitize & prepare data.
//Children render and behave.


//convert date to milliseconds only in comparsions & calulations
//keep the internal data is date objects

//storing both values in state would violate one of React’s core principles: