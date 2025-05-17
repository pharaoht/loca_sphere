import SectionWrapper from "@/components/wrappers/section/section";
import styles from './spaces.module.css';
import Image from "next/image";
import listingsApi from "@/api/listings/listings.api";

interface Props {
    id: string
}

const getShareSpaceDetails = async (id: string) => {

    const spaces = await listingsApi.httpGetListingDetails(id);

    return spaces;
}

const Spaces: React.FC<Props> = async ({ id }) => {

    return (
        <SectionWrapper id='sharedSpaces' headerText='Shared spaces and admentities'>
            <ul className={styles.shareAdmenities}>
                <li>
                    <div className={styles.shareAdmenImage}>
                        <Image className={styles.listImage} src='/photo.jpg' alt='image' fill />
                    </div>
                    <h4>Kitchen</h4>
                </li>
                <li>
                    <div className={styles.shareAdmenImage}>
                        <Image className={styles.listImage} src='/photo.jpg' alt='image' fill />
                    </div>
                    <h4>Bathroom</h4>
                </li>
                <li>
                    <div className={styles.shareAdmenImage}>
                        <Image className={styles.listImage} src='/photo.jpg' alt='image' fill />
                    </div>
                    <h4>Living room</h4>
                </li>

            </ul>
            <button>See all shared admentities</button>
        </SectionWrapper>
    )
};

export default Spaces