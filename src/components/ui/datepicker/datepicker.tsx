'use client'
import { ReactNode, useState } from 'react';
import styles from './datepicker.module.css';
import Image from 'next/image';
import Dropdown from '../dropdown/dropdown';
import CalendarV2 from '../calendar_v2/calendar.v2';

interface Props {
    moveInInput: string | undefined | null;
    moveOutInput: string | undefined | null;
    isDisabled: boolean;
    floatingWindowContent: ReactNode | null;
}

const DatePicker: React.FC<Props> = ({ moveInInput = '', moveOutInput = '', floatingWindowContent, isDisabled = false }) => {

    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    return (
        <div className={styles.moveCoa}>

            <div className={styles.btnContainer}>
                <Dropdown startFromRightSide={true} dropDownContent={<CalendarV2 moveInDate={new Date()} moveOutDate={new Date()} />}>
                <label htmlFor="move-in" className={styles.btnLabel}>Move in</label>
                <button 
                    className={styles.fakeInput} 
                    type='button' 
                    disabled={isDisabled} 
                    id="move-in"
                    aria-haspopup="dialog"
                    aria-expanded="false"         // set to true when popup is open
                    aria-controls='pop-ip-id'
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    {moveInInput}
                </button>
                </Dropdown>
            </div>
            <div className={styles.arrowContainer} aria-hidden="true">
                <Image src='/arrow-right.png' alt='' height={35} width={35} />
            </div>
            <div className={styles.btnContainer}>
                <label className={styles.btnLabel} htmlFor="move-out">Move out</label>
                <button 
                    className={styles.fakeInput} 
                    type='button' 
                    disabled={isDisabled}
                    id="move-out"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls='pop-up-id'
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {moveOutInput}
                </button>
            </div>
        </div>
    )
};

export default DatePicker;