import Dropdown from "../dropdown/dropdown"
import styles from './sortby.module.css';

const Sortby = () => {

    return (
        <div className={styles.container}>
            <Dropdown dropDownContent={<></>}>
                <button className={styles.sortBtn} type='button'>
                    Sort by
                    <span>Best</span>
                    <span>v</span>
                </button>

            </Dropdown>
        </div>
    )
};

export default Sortby;