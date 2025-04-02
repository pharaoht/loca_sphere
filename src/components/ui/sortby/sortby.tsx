import Image from "next/image";
import Dropdown from "../dropdown/dropdown"
import styles from './sortby.module.css';

const Sortby = () => {

    return (
        <div className={styles.container}>
            <Dropdown dropDownContent={<>hi</>}>
                <button className={styles.sortBtn} type='button'>
                    <div className={styles.sectionDiv}>
                        <span className={styles.fText}>Best Places</span>
                        <span className={styles.icon}>
                            <Image src='/chevron-down.png' alt="Option Icon" height={16} width={16} />
                        </span>
                    </div>
                    <span className={styles.lText}>13 places matched</span>
                </button>
            </Dropdown>
        </div>
    )
};

export default Sortby;