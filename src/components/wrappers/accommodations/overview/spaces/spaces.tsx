import SectionWrapper from "@/components/wrappers/section/section";
import styles from './spaces.module.css';
import Image from "next/image";
import amenityApi from "@/api/amenity/amenity.api";

type ListingAmenity = {
    id: string;
    amenityName: string;
    amenityTypeId: string;
    location: string;
    roomNumber: string;
}

type Fixures = {
    id: string;
    name: string;
}

interface Amenity {
    id: string;
    listingId: string;
    amenityId: string;
    listingAmenities: ListingAmenity[];
    fixures: Fixures[]
}

interface Props {
    id: string
}

const getShareSpaceDetails = async (id: string) => {

    const spaces: Amenity = await amenityApi.getAmenityByListingId(id);

    return spaces;
}

const Spaces: React.FC<Props> = async ({ id }) => {

    const amenities = await getShareSpaceDetails(id);

    if(!amenities ){

        return (
            <SectionWrapper id='sharedSpaces' headerText='Shared spaces and admentities'>
                No details
            </SectionWrapper>
        )
    };

    const { listingAmenities, fixures } = amenities;

    return (
        <SectionWrapper id='sharedSpaces' headerText='Shared spaces and admentities'>
            <ul className={styles.shareAdmenities}>
                {
                    fixures.map((itm) => (
                        <li key={itm.id}>
                            <div className={styles.shareAdmenImage}>
                                <Image className={styles.listImage} src='/photo.jpg' alt='image' fill />
                            </div>
                            <h4>{itm.name}</h4>
                        </li>
                    ))
                }
            </ul>
            <button>See all shared admentities</button>
        </SectionWrapper>
    )
};

export default Spaces