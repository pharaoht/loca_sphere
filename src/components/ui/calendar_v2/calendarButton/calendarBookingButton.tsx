type CalendarButtonProps = {
    moveInDate: number | null;
    moveOutDate: number | null;
    onClickHandler: (y: number, m: number, d: number) => void;
    year: number;
    month: number;
    day: number | null;
};

const CalendarBookingBtn: React.FC<CalendarButtonProps> = ({ onClickHandler, day, year, month, moveInDate, moveOutDate }) => {

    return (
        <button></button>
    )
};

export default CalendarBookingBtn;