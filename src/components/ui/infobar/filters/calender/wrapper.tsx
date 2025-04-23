'use client'
import styles from '../../../../wrappers/button/infobutton.module.css';
import Image from 'next/image';
import Dropdown from "@/components/ui/dropdown/dropdown"
import Calendar from "./calender"
import useParams from "@/hooks/useParams";
import useDate from "@/hooks/useDate";

const CalendarWrapper = () => {

    const { getParam } = useParams();
    const { formatDate } = useDate();

    const movein = getParam('moveIn') ?? '';
    const moveOut = getParam('moveOut') ?? '';


    return (
        <Dropdown dropDownContent={<Calendar/>}>
            <button className={`${styles.btnBaseClass} ${styles.default} ${styles.selectorBtn}`} type='button' >
                <span>
                    
                    <Image src='/calender-icon.png' alt='Icon for button' width={25} height={25}/>
                    
                </span>

                <span>
                    {`${formatDate(movein, 'YYYY-MM-DD')} | ${formatDate(moveOut, 'YYYY-MM-DD')}`}
                </span>
                
                <span className={styles.hide}>
                    
                    <Image src='/chevron-down.png' alt='Icon for button' width={12} height={12}/>
                    
                </span>
            </button>
        </Dropdown>

    )
};

export default CalendarWrapper;