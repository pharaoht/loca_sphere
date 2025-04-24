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
        <>
        <form className={styles.container}>
            <div className={`${styles.base} ${styles.search} ${styles.hide}`}>
                <SearchFilter />
        
            </div>
            <div className={`${styles.base}`}>
                <CalendarWrapper />
            </div>
            <div className={`${styles.base} ${styles.hide}`}>
                <BudgetFilter />
            </div>
            <div className={`${styles.base} ${styles.hide}`}>
                <Dropdown dropDownContent={<People/>}>
                    <InfoButton text='People' iconOne='/man-icon.png' />
                </Dropdown>
            </div>
            <div className={`${styles.base}`}>
                <Dropdown dropDownContent={<PropertyInfo propertyInfoData={sampleData} />} startFromRightSide={true}>
                    <InfoButton text='Filters' iconOne='/filter-icon.png'/>
                </Dropdown>
            </div>
            <div className={`${styles.base} ${styles.hide}`}></div>
            <div className={`${styles.base} ${styles.hide}`}>
                <InfoButton text='Set Alert' iconOne='/bell-icon.svg' />
            </div>
            <div className={`${styles.item3} ${styles.noDesktop}`}>
                <MobileCoa/>
            </div>
        </form>
        </>
    )
};

export default Infobar;