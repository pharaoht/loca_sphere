import Dropdown from '../dropdown/dropdown';
import MobileCoa from '../mobilecoa/mobilecoa';
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

    const checkboxLegend = (title: string, options: Array<{label: string, value:string }>, checkboxName: string, split: boolean = false  ) => {

        const cssClassName = split ? styles.split : styles.fieldSet;
        return (
            <fieldset className={cssClassName}>
                <legend className={styles.legend}>{title}</legend>
                {
                    options.map((itm, idx) => (
                        <label key={idx} className={styles.fieldSetLabel}>
                            <input type='checkbox' name={checkboxName} value={itm.value}/>
                            {itm.label}
                        </label>
                    ))
                }
            </fieldset>
        )
    }

    

    const filterContent = (): React.ReactNode => (
        <div className={styles.fc}>

            { checkboxLegend('Place', [{label:'Entire House', value:'1'},{label:'Private Bedroom', value:'2'},], 'place') }
            { checkboxLegend('Landlord', [{label:'Instant booking', value:'1'},{label:'Answers within 12h', value:'2'},{label:'High response rate', value:'3'}], 'landlord')}
            { checkboxLegend('Suitable for', [{label:'Males only', value:'1'},{label:'Couples', value:'2'},], 'suitableFor', true) }
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
                <Dropdown dropDownContent={<>{filterContent()}</>}>
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