import styles from './people.module.css';
import Image from 'next/image';

interface PeopleProps {

}

const People: React.FC<PeopleProps> = () => {
    return (
        <div className={styles.peopleContainer}>
            <Image src='/man-icon.png' alt='Person Icon' width={22} height={22}/>
            <span>1+ people</span>
           
            <button className={styles.pplBtn} type='button'>
                <Image src='/minus.png' alt='minus button' width={22} height={22} />
            </button>
            <input className={`${styles.pplBtn} ${styles.qtyInput}`} type="number" id="quantity" name="quantity" value="1" readOnly/>
            <button className={styles.pplBtn} type='button'>
                <Image src='/plus.png' alt='minus button' width={22} height={22} />
            </button>
            
        </div>
    )

};

export default People;