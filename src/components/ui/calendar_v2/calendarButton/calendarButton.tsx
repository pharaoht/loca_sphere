'use client'
import styles from './styles.module.css';

type CalendarButtonProps = {
    moveInDate: number | null;
    moveOutDate: number | null;
    onClickHandler: (y: number, m: number, d: number) => void;
    year: number;
    month: number;
    day: number | null;
};

const CalendarBtn: React.FC<CalendarButtonProps> = ({ onClickHandler, day, year, month, moveInDate, moveOutDate }) => {

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
        ( styles.day )
    
    const baseBtnCssClass = styles.calendarBtn;
    
    return (
        <button 
            type='button'
            disabled={isButtonInPast}
            className={`${baseBtnCssClass} ${cssButtonClass}`}
            onClick={() => !isButtonInPast && onClickHandler(year, month, day)}
        >
            {day}
        </button>
    ) 
};

export default CalendarBtn;