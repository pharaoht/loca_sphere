import Dropdown from '../dropdown/dropdown';
import styles from './infobar.module.css';
import Image from 'next/image';

const Infobar = () => {

    const infoBarBtn = (text: string, iconOne: string | null, iconTwo: string | null, type: string = 'default', dontHide: boolean = false) => {

        const colorCssClass = type === 'default' ? styles.default : styles.alt;

        return (
            <button className={`${styles.btnBaseClass} ${styles[colorCssClass]}`} type='button'>
                <span aria-hidden={iconOne ? 'false' : 'true'}>
                    {
                        iconOne ? <Image src={iconOne} alt='Icon for button' width={22} height={22}/> : null
                    }
                </span>

                <span className={`${dontHide ? null : styles.hide}`}>
                    { text }
                </span>
                
                <span aria-hidden={iconTwo ? 'false' : 'true'} className={styles.hide}>
                    {
                        iconTwo ? <Image src={iconTwo} alt='Icon for button' width={20} height={20}/> : null
                    }
                </span>
            </button>
        )
    }

    const personContent = (): React.ReactNode => (
        <div className={styles.pc}>
            <Image src='/man-icon.png' alt='Person Icon' width={22} height={22}/>
            <span>1+ people</span>
            <div className={styles.btnContainer}>
                <button className={styles.pplBtn} type='button'>-</button>
                <input className={styles.pplBtn} type="number" id="quantity" name="quantity" value="1" readOnly/>
                <button className={styles.pplBtn} type='button'>+</button>
            </div>
        </div>
    )

    return (
        <form className={styles.container}>
            <div className={`${styles.base} ${styles.search} ${styles.hide}`}>
                <Dropdown dropDownContent={<></>}>
                <label>
                    <Image src='/search.svg' alt='Search icon' width={22} height={22}/>
                </label>
    
                <input type='text' placeholder='Search'/>
                </Dropdown>
        
            </div>
            <div className={`${styles.base}`}>
                <Dropdown dropDownContent={<></>}>
                    { infoBarBtn('20 Mar 2026', '/calender-icon.png', '/chevron-down.png', '', true)}
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
                <Dropdown dropDownContent={<></>}>
                { infoBarBtn('Filters', '/filter-icon.png', '')}
                </Dropdown>
            </div>
            <div></div>
            <div className={`${styles.base} ${styles.hide}`}>
                { infoBarBtn('Set Alert', '/bell-icon.svg', '')}
            </div>


        </form>
    )
};

export default Infobar;