'use client'
import styles from '../../../../wrappers/button/infobutton.module.css';
import Image from 'next/image';
import Dropdown from "@/components/ui/dropdown/dropdown"
import useParams from "@/hooks/useParams";
import useDate from "@/hooks/useDate";
import CalendarV2 from '@/components/ui/calendar_v2/calendar.v2';

const params = {
    moveIn: 'moveIn',
    moveOut: 'moveOut',
}

const newDate = new Date();
newDate.setHours(0, 0, 0, 0); 

const CalendarWrapper = () => {

    const { getParam, parseUrlDate, setParam } = useParams();
    const { getDateAsString, createDateObject, convertDateToDisplay } = useDate();

    const movein = parseUrlDate(getParam(params.moveIn) || '');
    const moveOut = parseUrlDate(getParam(params.moveOut) || '');

    //date for tomsorrow
    const santizeMoveInDateObj = movein ? createDateObject(movein[0], movein[1], movein[2]) : newDate;
    const santizeMoveOutDateObj = moveOut ? createDateObject(moveOut[0], moveOut[1], moveOut[2]) : null

    return (
        <Dropdown dropDownContent={
                <CalendarV2 
                    params={params}
                    moveInDate={santizeMoveInDateObj} 
                    moveOutDate={santizeMoveOutDateObj}
                    setParamHandler={setParam}
                />
            }>
            <button className={`${styles.btnBaseClass} ${styles.default} ${styles.selectorBtn}`} type='button' >
                <span>
                    
                    <Image src='/calender-icon.png' alt='Icon for button' width={25} height={25}/>
                    
                </span>

                <span>
                    {`${movein && convertDateToDisplay(santizeMoveInDateObj) || getDateAsString()} | ${ santizeMoveOutDateObj && convertDateToDisplay(santizeMoveOutDateObj) || ''}`}
                </span>
                
                <span className={styles.hide}>
                    
                    <Image src='/chevron-down.png' alt='Icon for button' width={12} height={12}/>
                    
                </span>
            </button>
        </Dropdown>

    )
};

export default CalendarWrapper;