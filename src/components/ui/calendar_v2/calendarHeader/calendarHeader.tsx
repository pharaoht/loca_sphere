import styles from '../calendarGrid/cg.module.css';

const DAYSOFTHEWEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DaysOfTheWeekTableHeader: React.FC<{}> = () => (

    DAYSOFTHEWEEK.map((itm, idx) => (
        <div 
            className={styles.weekday} 
            role='columnheader' 
            key={idx}
        >
            {itm}
        </div>
    ))
);

export default DaysOfTheWeekTableHeader;