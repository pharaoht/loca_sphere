'use client'
import { useEffect, useState } from 'react';
import Sortby from '../sortby/sortby';
import styles from './mobile.module.css';
import css  from '@/app/accommodations/accomodations.module.css';

interface MobileCoaProps {
   
}
const MobileCoa: React.FC<MobileCoaProps> = ({  }) => {

    const [ isMapHidden, setIsMapHidden ] = useState(false);

    const toggleMap = () => {

        setIsMapHidden(prev => !prev)
    }

    const toggle = (condition: boolean) => {

        if(typeof window !== 'undefined'){

            const rightSide = document.getElementById('rightSide');
            const leftSide = document.getElementById('leftSide');
            
            rightSide?.classList.toggle(css.mapHide, !condition);
            leftSide?.classList.toggle(css.mapHide, condition);
        
        }
    }

    useEffect(() =>{
        toggle(isMapHidden)
    }, [isMapHidden])

    return (
        <div className={styles.mobileMap}>
            <button 
                type='button' 
                className={styles.hide}
                onClick={toggleMap}
            >
                Map
            </button>
            <Sortby/>
        </div>
    )
};

export default MobileCoa;