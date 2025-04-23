import styles from './infobutton.module.css';
import Image from 'next/image';

interface InfoButtonProps {
    text: string;
    iconOne?: string | null;
    iconTwo?: string | null;
    type?: string;
    dontHide?: boolean;
}

const InfoButton: React.FC<InfoButtonProps> = ({ text, iconOne, iconTwo, type = 'default', dontHide = false, }) => {

    const colorCssClass = type === 'default' ? styles.default : styles.alt;

    return (
        <button className={`${styles.btnBaseClass} ${styles[colorCssClass]} ${styles.selectorBtn}`} type='button' >
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
};

export default InfoButton;
