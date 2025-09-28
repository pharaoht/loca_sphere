import Image from "next/image";
import styles from './ic.module.css';

type ImageProps = {
    amenityTypeId: number
    createdAt: string
    id: number
    isPrimary: boolean
    listingId: string
    url: string
}

interface ImageContainerProps {
    images: ImageProps[]
}

const ImageContainer: React.FC<ImageContainerProps> = async ({ images }) => {

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const primaryIndex = images.length > 0 ? images.findIndex((itm) => itm.isPrimary) : false

    return (
        <section className={styles.imageContainer}>
            <div className={styles.mainImage}>
                {
                    primaryIndex === false ? <Image className={styles.listImage} src="/photo.jpg" alt='image' fill /> : <Image className={styles.listImage} src={images[primaryIndex].url} alt='image' fill />
                }
                
            </div>
            <div className={styles.grid}>
                { images.length > 1 ?
                    images.filter((itm, idx) => idx != primaryIndex).map((itm, idx) => {
                        return (
                            <div key={itm.id} className={styles.smallImage}><Image className={styles.listImage} src={itm.url} alt="Small 1" fill /></div>
                        )
                    })
                    :
                    (
                        <>
                            <div className={styles.smallImage}><Image className={styles.listImage} src="/photo.jpg" alt="Small 2" fill /></div>
                            <div className={styles.smallImage}><Image className={styles.listImage} src="/photo.jpg" alt="Small 2" fill /></div>
                            <div className={styles.smallImage}><Image className={styles.listImage} src="/photo.jpg" alt="Small 3" fill /></div>
                            <div className={styles.smallImage}><Image className={styles.listImage} src="/photo.jpg" alt="Small 4" fill /></div>
                        </>
                    )
                    
                }
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