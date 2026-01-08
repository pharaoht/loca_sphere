import Image from 'next/image';
import styles from './styles.module.css';

type smallImagePreviewProps = {
    images: Array<any>
}

export const smallImagePreview: React.FC<smallImagePreviewProps> = ({ images }) => {

    return (
        <div className={styles.imageContainer}>
            <Image
                src={images[0]?.url ?? '/photo.jpg'}
                alt='image of listing'
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }} />
        </div>
    )
};

export const bookingVerifications = () => {

    return (
        <ul className={styles.verifications}>
            <li>Trusted landlord</li>
            <li>Instant booking</li>
            <li>Checked</li>
        </ul>
    )
}