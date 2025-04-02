import Dropdown from '../dropdown/dropdown';
import MobileCoa from '../mobilecoa/mobilecoa';
import PropertyInfo, { sampleData } from './filters/propertyInfo/propertyinfo';
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

    const personContent = (): React.ReactNode => (
        <div className={styles.pc}>
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

    return (
        <>
        <form className={styles.container}>
            <div className={`${styles.base} ${styles.search} ${styles.hide}`}>
                <Dropdown dropDownContent={<></>}>
                <label className={styles.searchLabel}>
                    <Image src='/search.svg' alt='Search icon' width={22} height={22}/>
                </label>
    
                <input className={styles.searchInput} type='text' placeholder='Search' id='search'/>
                </Dropdown>
        
            </div>
            <div className={`${styles.base}`}>
                <Dropdown dropDownContent={<></>}>
                    { infoBarBtn('20 Mar 2026 | 20 Jun 2027', '/calender-icon.png', '/chevron-down.png', '', true)}
                </Dropdown>
            </div>
            <div className={`${styles.base} ${styles.hide}`}>
                <Dropdown dropDownContent={<></>}>
                    { infoBarBtn('Set Budget', '/coin-icon.png', '')}
                </Dropdown>
            </div>
            <div className={`${styles.base} ${styles.hide}`}>
                <Dropdown dropDownContent={<>{personContent()}</>}>
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