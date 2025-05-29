import SectionWrapper from "@/components/wrappers/section/section";
import styles from './ybstyles.module.css';
import Image from "next/image";
import bedroomAmenityApi from "@/api/bedroomAmenity/bedroomamenity.api";

interface BedroomAmenity {
    id: number;
    name: string;
    icon: string;
}
  
interface Amenity {
    listing: {
        id: string,
        beds: string,
        bedrooms: string,
        isChecked: boolean,
        listingType: string,
        listingTypeId: string,
    }
    bedroomAmenities: BedroomAmenity[];
}

interface BedroomProps {
    id: string
}

const getBedRoomAmenities = async (id: string) => {

    // await new Promise(resolve => setTimeout(resolve, 2000));
    
    const bedroomAmenities = await bedroomAmenityApi.httpGetBedRoomAmenitiesByListingId(id)

    return bedroomAmenities;

}

const PBR = 'Private Bedroom';
const APR = 'Apartment';
const STU = 'Studio';
const SHR = 'Shared Room';

const Yourbedroom = async ({ id }: BedroomProps) => {

    const bas: Amenity = await getBedRoomAmenities(id);

    if(!bas){

        return (
            <SectionWrapper id='overview' headerText='Your bedroom'>
                <div>Failed to get data...</div>
            </SectionWrapper>
        )
    }

    const { listing, bedroomAmenities } = bas;

    const { id: listId, listingType, beds, bedrooms, isChecked } = listing;

    const renderAmenities = () => (

        bedroomAmenities.map(itm => (
            <li className={styles.baListItem} key={itm.id}>
                <Image src={`/bedroomAmenities${itm.icon}`} alt={`${itm.name} icon`} width={40} height={40}  />
                <span>{itm.name}</span>
            </li>
        ))
    )

    return (
        <SectionWrapper id='overview' headerText='Your bedroom' isChecked={isChecked}>
            <ul className={styles.bedroomAdmenities}>
                { renderAmenities() }
            </ul>
            <div className={styles.baInfo}>
                <div>
                    {
                        listingType === PBR || listingType === SHR &&
                            <Image src='/bedroomAmenities/bnf.svg' alt='bed icon' width={125} height={125}  />
                    } 
                    {
                        listingType === APR &&
                            <Image src='/bedroomAmenities/apartment.svg' alt='apartment icon' width={125} height={125}  />
                    }
                    {
                        listingType === STU &&
                            <Image src='/bedroomAmenities/studio.svg' alt='studio icon' width={125} height={125}  />
                    }
                </div>
                <div className={styles.baBedRoomText}>
                    {   
                        listingType === PBR &&
                        <>
                            <p className={styles.baHeader}>This is a <b>Private bedroom</b></p>
                            <p className={styles.baSmallTxt}>You won't have to share the bedroom with anyone else</p>
                            <p className={styles.baSmallTxt}>This room has a total of {beds} beds available</p>
                            <p><b>{bedrooms} room(s) in total</b></p>
                        </>
                    }
                    {
                        listingType === SHR &&
                        <>
                            <p className={styles.baHeader}>This is a <b>Shared bedroom</b></p>
                            <p className={styles.baSmallTxt}>You will be sharing the bedroom</p>
                            <p className={styles.baSmallTxt}>This room has a total of {beds} beds available</p>
                            <p><b>{bedrooms} room(s) in total</b></p>
                        </>
                    }
                    {   
                        listingType === APR &&
                        <>
                            <p className={styles.baHeader}>This is an <b>Apartment</b></p>
                            <p className={styles.baSmallTxt}>You'll have the entire place to yourself</p>
                            <p><b>{bedrooms} room(s) in total</b></p>
                        </>
                    }
                    {
                        listingType === STU &&
                        <>
                            <p className={styles.baHeader}>This is a <b>Studio</b></p>
                            <p className={styles.baSmallTxt}>You'll have the entire place to yourself</p>
                        </>
                    }
                </div>
            </div>
            <div>
                    {/* make button client component */}
                <button type='button'>See all features</button>
            </div>
        </SectionWrapper>
    )
};


export const SkeletonYourBedRoom = () => {

};

export default Yourbedroom;
