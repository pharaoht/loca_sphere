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

    return (
        <form className={styles.container}>
            <div className={`${styles.base}`}>
                <label>
                    <Image src='/search.svg' alt='Search icon' width={22} height={22}/>
                </label>
                <input type='text'/>
            </div>
            <div className={`${styles.base}`}>
                { infoBarBtn('20 Mar 2026', '/calender-icon.png', '/chevron-down.png', '', true)}
            </div>
            <div className={`${styles.base}`}>
                { infoBarBtn('Set Budget', '/coin-icon.png', '')}
            </div>
            <div className={`${styles.base}`}>
                { infoBarBtn('People', '/man-icon.png', '')}
            </div>
            <div className={`${styles.base}`}>
                { infoBarBtn('Filter', '/filter-icon.png', '')}
            </div>
            <div></div>
            <div className={`${styles.base}`}>
                { infoBarBtn('Set Alert', '/bell-icon.svg', '')}
            </div>


        </form>
    )
};

export default Infobar;