import Dropdown from '../dropdown/dropdown';
import MobileCoa from '../mobilecoa/mobilecoa';
import People from './filters/people/people';
import PropertyInfo, { sampleData } from './filters/propertyInfo/propertyinfo';
import SearchFilter from './filters/search/searchFilter';
import styles from './infobar.module.css';
import InfoButton from '@/components/wrappers/button/infobutton';
import CalendarWrapper from './filters/calender/wrapper';
import BudgetFilter from './filters/budget/budgetFilter';



const Infobar = () => {
    
    return (
        <header className={styles.container}>
            <section className={`${styles.base} ${styles.search} ${styles.hide}`}>
                <SearchFilter />
        
            </section>
            <section className={`${styles.base}`}>
                <CalendarWrapper />
            </section>
            <section className={`${styles.base} ${styles.hide}`}>
                <BudgetFilter />
            </section>
            <section className={`${styles.base} ${styles.hide}`}>
                <Dropdown dropDownContent={<People/>}>
                    <InfoButton text='People' iconOne='/man-icon.png' />
                </Dropdown>
            </section>
            <section className={`${styles.base}`}>
                <Dropdown dropDownContent={<PropertyInfo propertyInfoData={sampleData} />} startFromRightSide={true}>
                    <InfoButton text='Filters' iconOne='/filter-icon.png'/>
                </Dropdown>
            </section>
            <section className={`${styles.base} ${styles.hide}`}></section>
            <section className={`${styles.base} ${styles.hide}`}>
                <InfoButton text='Set Alert' iconOne='/bell-icon.svg' />
            </section>
            <section className={`${styles.item3} ${styles.noDesktop}`}>
                <MobileCoa/>
            </section>
        </header>
    )
};

export default Infobar;