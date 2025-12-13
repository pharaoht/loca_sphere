'use client'
import styles from './styles.module.css';

type CalendarButtonProps = {
    moveInDate: number | null;
    moveOutDate: number | null;
    onClickHandler: (y: number, m: number, d: number) => void;
    year: number;
    month: number;
    day: number | null;
    isAvailable?: boolean | undefined;
};

const CalendarBtn: React.FC<CalendarButtonProps> = ({ onClickHandler, day, year, month, moveInDate, moveOutDate, isAvailable }) => {

    if (!day) return (<div></div>);

    const today = new Date().setHours(0, 0, 0, 0);
    const buttonTimestamp = new Date(year, month, day).setHours(0, 0, 0, 0);

    //determine button type
    const isButtonInPast = buttonTimestamp < today;

    const isButtonActive = 
    ( buttonTimestamp === moveInDate ) || 
    ( buttonTimestamp === moveOutDate )

    //&& short circuits, if moveInDate is null, && returns null
    const isButtonInSelectedDateRange = Boolean(
        ( moveInDate )  && 
        ( moveOutDate ) && 
        ( buttonTimestamp < moveOutDate ) && 
        ( buttonTimestamp > moveInDate )
    )

    const cssButtonClass = 
        ( isButtonActive && styles.active ) || 
        ( isButtonInPast && styles.disabled ) || 
        ( isButtonInSelectedDateRange && styles.range ) || 
        ( isAvailable !== undefined && !isAvailable && styles.booked ) ||
        ( styles.day )
    
    const baseBtnCssClass = styles.calendarBtn;

    const isPressable = !isButtonInPast && (isAvailable === undefined || isAvailable)
    
    return (
        <button 
            type='button'
            disabled={isButtonInPast}
            className={`${baseBtnCssClass} ${cssButtonClass}`}
            onClick={() => isPressable && onClickHandler(year, month, day)}
        >
            {day}
        </button>
    ) 
};

export default CalendarBtn;