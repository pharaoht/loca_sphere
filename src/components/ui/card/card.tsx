import Image from 'next/image';
import styles from './card.module.css';

const Card = () => {

    return (
        <section className={styles.container}>
            <figure className={styles.image}>
                <Image src='/photo.jpg' alt='image of listing' fill/>
                <figcaption>Image of the listing</figcaption>
            </figure>
            <div className={styles.listSection}>
                <p className={styles.listInfo}>Up to 1 person - 2 bedrooms</p>
                <p><span className={styles.trustll}>Trusted Landlord</span></p>
                <p><span  className={styles.price}>$600 </span>/ month</p>
            </div>
        </section>
    )
};


export default Card;