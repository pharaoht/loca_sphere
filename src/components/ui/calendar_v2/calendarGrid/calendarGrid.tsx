import React from "react";
import styles from './cg.module.css';
import CalendarBtn from "../calendarButton/calendarButton";
import DaysOfTheWeekTableHeader from "../calendarHeader/calendarHeader";
import CalendarCaption from "../calendarCaption/calendarCaption";

interface CalendarGridProps {
    monthIndex: number;
    yearValue: number;
    displayLeftToggleArrow: boolean;
    toggleMonthHandler: (...args: any) => void;
    setDateHandler: (...args: any) => void;
    mobileHandler?: (...arfs: any) => void;
    calendarDayGridArray: number[];
    selectedMoveInDate: Date | null;
    selectedMoveOutDate: Date | null;
    forBooking?: boolean;
    isMobile?: boolean;
    bookingData?: Array<any> | undefined
}

const CalendarGrid: React.FC<CalendarGridProps> = (
    { 
        monthIndex, yearValue, displayLeftToggleArrow, toggleMonthHandler, calendarDayGridArray, 
        setDateHandler, selectedMoveInDate, selectedMoveOutDate, forBooking = false, isMobile = false,
        mobileHandler = undefined, bookingData = undefined
    }
) => {

    const checkAvailability = (y: number, m: number, d: number) => {

        const buttonTimeStamp = new Date(y,m,d,0,0,0,0);

        let isAvailable = true;

        bookingData?.forEach((itm) => {
            if (( buttonTimeStamp >= itm.startDateMiliSeconds ) && ( buttonTimeStamp <= itm.endDateMiliSeconds )){
                isAvailable = false;
            }
        });

        return isAvailable;
    }

    return (
        <section className={styles.calendarTable}>
            <CalendarCaption 
                monthIndex={monthIndex}
                displayLeftToggleArrow={displayLeftToggleArrow}
                onClickHandler={toggleMonthHandler}
                yearValue={yearValue}
                isMobile={isMobile}
                mobileOnClickHandler={mobileHandler}
            />
            <section className={styles.gridDates} role='grid'>
                <DaysOfTheWeekTableHeader /> 
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
                            isAvailable={forBooking ? checkAvailability(yearValue, monthIndex, itm) : undefined}
                        />
                    ))
                }
            </section>
    
       </section> 
    )
};

export default CalendarGrid;