import SectionWrapper from "@/components/wrappers/section/section";
import styles from './ybstyles.module.css';
import Image from "next/image";

const Yourbedroom = () => {

    return (
        <SectionWrapper id='overview' headerText='Your bedroom'>
            <ul className={styles.bedroomAdmenities}>
                <li className={styles.baListItem}>
                    <Image src='/bed.png' alt='bed icon' width={40} height={40}  />
                    <span>Double bed</span>
                </li>
                <li className={styles.baListItem}>
                    <Image src='/wardrobe.png' alt='bed icon' width={40} height={40}  />
                    <span>Wardrobe</span>
                </li>
                <li className={styles.baListItem}>
                    <Image src='/desk.png' alt='bed icon' width={40} height={40}  />
                    <span>Desk</span></li>
                <li className={styles.baListItem}>
                    <Image src='/office_chair.png' alt='bed icon' width={40} height={40}  />
                    <span>Chairs</span>
                </li>
                <li className={styles.baListItem}>
                    <Image src='/sofa.png' alt='bed icon' width={40} height={40}  />
                    <span>Sofa bed</span>
                </li>
            </ul>
            <div className={styles.baInfo}>
                <div>
                    <Image src='/bnf.svg' alt='bed icon' width={125} height={125}  />
                </div>
                <div className={styles.baBedRoomText}>
                    <p className={styles.baHeader}>This is a <b>Private bedroom</b></p>
                    <p className={styles.baSmallTxt}>You won't have to share the bedroom with anyone else</p>
                    <p className={styles.baSmallTxt}>This room has a total of 1 beds available</p>
                    <p><b>4 rooms in total</b></p>
                </div>
            </div>
            <div>
                <button type='button'>See all features</button>
            </div>
        </SectionWrapper>
    )
}