'use client'
import { ReactNode, useRef, useState } from 'react';
import styles from './datepicker.module.css';
import Image from 'next/image';
import FloatingWindow from './dateWindow/dateWindow';
import React from 'react';

interface Props {
    moveInInput: Date | undefined | null;
    moveOutInput: Date | undefined | null;
    isDisabled: boolean;
    floatingWindowContent: ReactNode | null;
    convertDateToString: (...args: any) => string | undefined
}

const DatePicker: React.FC<Props> = ({ moveInInput = undefined, moveOutInput = undefined, isDisabled = false, convertDateToString, floatingWindowContent }) => {

    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const moveInRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div className={styles.moveCoa}>
            <div className={styles.btnContainer}>

                <label htmlFor="move-in" className={styles.btnLabel}>Move in</label>
                <button 
                    className={styles.fakeInput} 
                    ref={moveInRef}
                    type='button' 
                    disabled={isDisabled} 
                    id="move-in"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls='pop-ip-id'
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    {!moveInInput ? 'Select a date' : convertDateToString(moveInInput)}
                </button>
               
            </div>
            <div className={styles.arrowContainer} aria-hidden="true">
                <Image src='/arrow-right.png' alt='' height={35} width={35} />
            </div>
            <FloatingWindow
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                anchorRef={moveInRef}
            >
                {floatingWindowContent &&
                    React.isValidElement(floatingWindowContent)
                    ? React.cloneElement(floatingWindowContent as React.ReactElement<any>, {
                        closedWindowHandler: () => setIsOpen(false),
                    })
                    : floatingWindowContent
                }
            </FloatingWindow>
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
                    {!moveOutInput ? 'Select a date' : convertDateToString(moveOutInput)}
                </button>
            </div>
        </div>
    )
};

export default DatePicker;