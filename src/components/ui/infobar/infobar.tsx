import { Suspense } from 'react';
import Dropdown from '../dropdown/dropdown';
import MobileCoa from '../mobilecoa/mobilecoa';
import Calendar from './filters/calender/calender';
import People from './filters/people/people';
import PropertyInfo, { sampleData } from './filters/propertyInfo/propertyinfo';
import SearchFilter from './filters/search/searchFilter';
import styles from './infobar.module.css';
import Image from 'next/image';

const Infobar = () => {

    const infoBarBtn = (text: string, iconOne: string | null, iconTwo: string | null, type: string = 'default', dontHide: boolean = false) => {

        const colorCssClass = type === 'default' ? styles.default : styles.alt;

        return (
            <button className={`${styles.btnBaseClass} ${styles[colorCssClass]} ${styles.selectorBtn}`} type='button'>
                <span aria-hidden={iconOne ? 'false' : 'true'}>
                    {
                        iconOne ? <Image src={iconOne} alt='Icon for button' width={25} height={25}/> : null
                    }
                </span>

                <span className={`${dontHide ? null : styles.hide}`}>
                    { text }
                </span>
                
                <span aria-hidden={iconTwo ? 'false' : 'true'} className={styles.hide}>
                    {
                        iconTwo ? <Image src={iconTwo} alt='Icon for button' width={12} height={12}/> : null
                    }
                </span>
            </button>
        )
    }

    return (
        <>
        <form className={styles.container}>
            <div className={`${styles.base} ${styles.search} ${styles.hide}`}>
                <SearchFilter />
        
            </div>
            <div className={`${styles.base}`}>
                <Dropdown dropDownContent={<Suspense><Calendar/></Suspense>}>
                    { infoBarBtn('20 Mar 2026 | 20 Jun 2027', '/calender-icon.png', '/chevron-down.png', '', true)}
                </Dropdown>
            </div>
            <div className={`${styles.base} ${styles.hide}`}>
                <Dropdown dropDownContent={<></>}>
                    { infoBarBtn('Set Budget', '/coin-icon.png', '')}
                </Dropdown>
            </div>
            <div className={`${styles.base} ${styles.hide}`}>
                <Dropdown dropDownContent={<People/>}>
                    { infoBarBtn('People', '/man-icon.png', '')}
                </Dropdown>
            </div>
            <div className={`${styles.base}`}>
                <Dropdown dropDownContent={<PropertyInfo propertyInfoData={sampleData} />} startFromRightSide={true}>
                { infoBarBtn('Filters', '/filter-icon.png', '')}
                </Dropdown>
            </div>
            <div className={`${styles.base} ${styles.hide}`}></div>
            <div className={`${styles.base} ${styles.hide}`}>
                { infoBarBtn('Set Alert', '/bell-icon.svg', '')}
            </div>
            <div className={`${styles.item3} ${styles.noDesktop}`}>
                <MobileCoa/>
            </div>
        </form>
        </>
    )
};

export default Infobar;