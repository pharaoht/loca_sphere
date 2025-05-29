import Image from "next/image";
import styles from './ic.module.css';

const ImageContainer = async () => {

    await new Promise((resolve) => setTimeout(resolve, 2000))
    return (
        <section className={styles.imageContainer}>
            <div className={styles.mainImage}>
                <Image className={styles.listImage} src='/photo.jpg' alt='image' fill/>
            </div>
            <div className={styles.grid}>
                <div className={styles.smallImage}><Image className={styles.listImage} src="/photo.jpg" alt="Small 1" fill /></div>
                <div className={styles.smallImage}><Image className={styles.listImage} src="/photo.jpg" alt="Small 2" fill /></div>
                <div className={styles.smallImage}><Image className={styles.listImage} src="/photo.jpg" alt="Small 3" fill /></div>
                <div className={styles.smallImage}><Image className={styles.listImage} src="/photo.jpg" alt="Small 4" fill /></div>
            </div>
        </section>
    )
};

export const SkeletonImageContainer = () => {
	return (
		<>
			<div className={styles.imageContainer}>
				<div className={`${styles.mainImage} ${styles.skeleton}`} />
				<div className={styles.grid}>
					<div className={`${styles.smallImage} ${styles.skeleton}`} />
					<div className={`${styles.smallImage} ${styles.skeleton}`} />
					<div className={`${styles.smallImage} ${styles.skeleton}`} />
					<div className={`${styles.smallImage} ${styles.skeleton}`} />
				</div>
			</div>
		</>
	);
}

export default ImageContainer;