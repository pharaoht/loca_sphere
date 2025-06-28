'use client'
import { useEffect, useRef, useState } from 'react';
import styles from './people.module.css';
import Image from 'next/image';
import useParams from '@/hooks/useParams';

interface PeopleProps {

}

const People: React.FC<PeopleProps> = () => {

    const { setParam, getParam } = useParams();

    const hasMounted = useRef(false);

    const peopleParam = getParam('peopleAllowed') || 1;

    const [ peopleCount, setPeopleCount ] = useState<number>(Number(peopleParam));

    const cssDisableClass = styles.disabled;

    const isDisabledBtn1 = peopleCount === 1 ? true : false;

    const isDisabledBtn2 = peopleCount === 9 ? true : false;

    const incrementCountHandler = () => {

        if(peopleCount === 9) return undefined;

        setPeopleCount(prevState => prevState + 1);
    };

    const decrementCountHandler = () => {

        if(peopleCount === 1) return undefined;

        setPeopleCount(prevState => prevState - 1);
    };

    useEffect(() => {

        if (hasMounted.current) {
            setParam([{key: 'peopleAllowed', value: String(peopleCount) }])
        }
        else {
            hasMounted.current = true
        }
    
    }, [peopleCount])

    return (
        <div className={styles.peopleContainer}>
            <Image src='/man-icon.png' alt='Person Icon' width={22} height={22}/>
            <span>1+ people</span>
           
            <button className={`${styles.pplBtn} ${isDisabledBtn1 ? styles.disabled : null}`} type='button' onClick={decrementCountHandler} disabled={isDisabledBtn1} >
                <Image src='/minus.png' alt='minus button' width={22} height={22} />
            </button>

            <input className={`${styles.pplBtn} ${styles.qtyInput}`} type="number" id="quantity" name="quantity" value={peopleCount} readOnly/>
            
            <button className={`${styles.pplBtn} ${isDisabledBtn2 ? styles.disabled : null}`} type='button' onClick={incrementCountHandler}>
                <Image src='/plus.png' alt='minus button' width={22} height={22} />
            </button>
            
        </div>
    )           

};

export default People;