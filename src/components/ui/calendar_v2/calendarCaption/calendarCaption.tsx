import { useEffect, useState } from 'react';
import styles from '../calendarGrid/cg.module.css';

const MONTHSOFTHEYEAR = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

type ComponentProps = {
    monthIndex: number;
    yearValue: number;
    displayLeftToggleArrow: boolean;
    isMobile?: boolean;
    onClickHandler: (...args: any) => void;
    mobileOnClickHandler?: (...args: any) => void | undefined;
}

const CalendarCaption: React.FC<ComponentProps> = (
    { monthIndex, displayLeftToggleArrow, isMobile = false, yearValue, onClickHandler, mobileOnClickHandler = undefined }
) => {

    const [animation, setAnimation] = useState<boolean>(false);

    const displayMonthValue = MONTHSOFTHEYEAR[monthIndex];

    useEffect(() => {

        setAnimation(true);

        const timeOut = setTimeout(() => {
            setAnimation(false)
        }, 250);

        return () => clearTimeout(timeOut);

    }, [monthIndex])

    return (
        <header className={styles.caption}>
            {displayLeftToggleArrow && (
                <button 
                    className={`${styles.switchBtn} ${styles.toggleBtnL}`} 
                    onClick={onClickHandler}>
                        &lt;
                </button>
            )}
            <span 
                className={`${styles.monthDisplay} ${animation && styles.slide}`}
            >
                {displayMonthValue} {yearValue}
            </span>
            {!displayLeftToggleArrow && (
                <button 
                    className={`${styles.switchBtn} ${styles.toggleBtnR}`} 
                    onClick={onClickHandler}
                >
                    &gt;
                </button>
            )}
            {isMobile && (
                <button
                    className={`${styles.switchBtn} ${styles.toggleBtnR}`}
                    onClick={mobileOnClickHandler}
                >
                    &gt;
                </button>
            )}
        </header>
    )
};

export default CalendarCaption;