import Link from 'next/link';
import styles from './popup.module.css';
import Image from 'next/image';

interface Props {
    id: string;
    price: string;
    currency: string;
    photos: [];
    title: string;

}

const PopupContent: React.FC<Props> = ({ id, price, currency, photos, title }) => {

    return (
        <div className={styles.container}>
            <div className={styles.imageWrapper}>
                <Image className={styles.image} src='/photo.jpg' alt='photo of listing' fill/>
            </div>
            <div className={styles.textContent}>
                <p className={styles.title}>{title}</p>
                <span className={styles.date}>Date</span>
                <p className={styles.price}><b>{price}</b>/ month</p>
            </div>
            <Link href={`/accommodations/:id`} >click me</Link>
        </div>
    )
};

export default PopupContent;