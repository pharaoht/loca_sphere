import SectionWrapper from "@/components/wrappers/section/section";
import styles from './spaces.module.css';
import Image from "next/image";

interface Amenity {
    id: string;
    listingId: string;
    amenityId: string;
    roomNumber: String | null
    listingAmenityMap: {
        id: string
        amenityName: string
    }
}

interface Props {
    id: string
    amenity: {
        amenityTypes: String[],
        amenities: Amenity
    }
}


const Spaces: React.FC<Props> = async ({ id, amenity }) => {

    if(!id || !amenity){

        return (
            <SectionWrapper id='sharedSpaces' headerText='Shared spaces and admentities'>
                No details
            </SectionWrapper>
        )
    };
    
    const { amenities, amenityTypes } = amenity;


    return (
        <SectionWrapper id='sharedSpaces' headerText='Shared spaces and admentities'>
            <ul className={styles.shareAdmenities}>
                {
                    amenityTypes.map((itm, idx) => (
                        <li key={idx} className={styles.liContainer}>
                            <div className={styles.shareAdmenImage}>
                                <Image className={styles.listImage} src='/photo.jpg' alt='image' fill />
                            </div>
                            <h4>{itm}</h4>
                        </li>
                    ))
                }
            </ul>
            <button>See all shared admentities</button>
        </SectionWrapper>
    )
};

export default Spaces;