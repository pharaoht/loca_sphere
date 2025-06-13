import Image from 'next/image';
import styles from './card.module.css';
import Link from 'next/link';

type Props = {
    longitude: string | number;
    latitude: string | number;
    city: string;
    price: string | number;
    isVerified: boolean;
    beds: string | number;
    currency: string

}

const Card: React.FC<Props> = ({  longitude, latitude, price, city, isVerified, beds, currency}) => {

    return (
        <section className={styles.container}>

            <figure className={styles.image}>
                <Image src='/photo.jpg' alt='image of listing' fill/>
                <figcaption></figcaption>
            </figure>
            <Link href={`/accommodations?long=${longitude}&lat=${latitude}&cityName=${city}&radius=10`}>
                <div className={styles.listSection}>
                    <p className={styles.listInfo}>Up to 1 person - {beds} bedrooms</p>
                    <p>
                        {
                            isVerified && <span className={styles.trustll}>Place Verified</span>
                        }
                    </p>
                    <p><span  className={styles.price}>{currency}{price} </span>/ month</p>
                </div>
            </Link>
        </section>
        
    )
};

export const CardLoadingSkeleton = () => (
    <div className={styles.container}>
        <div className={`${styles.image} ${styles.skeleton}`} />

        <div className={styles.listSection}>
            <div
                className={`${styles.listInfo} ${styles.skeleton}`}
                style={{ height: '14px', width: '60%' }}
            />
            <div
                className={`${styles.trustll} ${styles.skeleton}`}
                style={{ height: '18px', width: '40%' }}
            />
            <div
                className={`${styles.price} ${styles.skeleton}`}
                style={{ height: '20px', width: '50%' }}
            />
        </div>
    </div>
)


export default Card;