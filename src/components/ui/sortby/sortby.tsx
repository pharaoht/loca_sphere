import Image from "next/image";
import Dropdown from "../dropdown/dropdown"
import styles from './sortby.module.css';

const Sortby = () => {

    const SortMethods: React.FC<{}> = () => (
        <section>
            <ul className={styles.smContainer}>
                <li className={styles.active}>
                    <button className={styles.defaultBtn} type='button'>
                        Best matches
                    </button>
                </li>
                <li>Price - low to high</li>
                <li>Price - High to low</li>
                <li>Recently updated</li>
                <li>Recently added</li>
                <li>Rating</li>
            </ul>
        </section>
    )

    return (
        <div className={styles.container}>
            <Dropdown startFromRightSide={true}  dropDownContent={<SortMethods />}>
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