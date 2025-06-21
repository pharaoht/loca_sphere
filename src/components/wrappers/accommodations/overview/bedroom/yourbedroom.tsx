import SectionWrapper from "@/components/wrappers/section/section";
import styles from './ybstyles.module.css';
import Image from "next/image";

interface BedroomAmenity {
    id: number;
    bedroomAmenity: {
        name: string;
        icon: string
    }
    name: string;
    icon: string;
}

interface BedroomProps {
    id: string,
    beds: string,
    bedrooms: string,
    isChecked: boolean,
    bedroomAmenity: BedroomAmenity[],
    listingType: {
        name: string
    }
}

const PBR = 'Private Room';
const APR = 'Apartment';
const STU = 'Studio';
const SHR = 'Shared Room';

const Yourbedroom = async ({ id, beds, bedroomAmenity, bedrooms, listingType, isChecked }: BedroomProps) => {


    if(!id){

        return (
            <SectionWrapper id='overview' headerText='Your bedroom'>
                <div>Failed to get data...</div>
            </SectionWrapper>
        )
    }

    const renderAmenities = () => (

        bedroomAmenity.map(itm => (
            <li className={styles.baListItem} key={itm.id}>
                <Image src={`/bedroomAmenities${itm.bedroomAmenity.icon}`} alt={`${itm.bedroomAmenity.name} icon`} width={40} height={40}  />
                <span>{itm.bedroomAmenity.name}</span>
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
                        (listingType.name === PBR || listingType.name === SHR) &&
                            <Image src='/bedroomAmenities/bnf.svg' alt='bed icon' width={125} height={125}  />
                    } 
                    {
                        listingType.name === APR &&
                            <Image src='/bedroomAmenities/apartment.svg' alt='apartment icon' width={125} height={125}  />
                    }
                    {
                        listingType.name === STU &&
                            <Image src='/bedroomAmenities/studio.svg' alt='studio icon' width={125} height={125}  />
                    }
                </div>
                <div className={styles.baBedRoomText}>
                    {   
                        listingType.name === PBR &&
                        <>
                            <p className={styles.baHeader}>This is a <b>Private bedroom</b></p>
                            <p className={styles.baSmallTxt}>You won't have to share the bedroom with anyone else</p>
                            <p className={styles.baSmallTxt}>This room has a total of {beds} beds available</p>
                            <p><b>{bedrooms} room(s) in total</b></p>
                        </>
                    }
                    {
                        listingType.name === SHR &&
                        <>
                            <p className={styles.baHeader}>This is a <b>Shared bedroom</b></p>
                            <p className={styles.baSmallTxt}>You will be sharing the bedroom</p>
                            <p className={styles.baSmallTxt}>This room has a total of {beds} beds available</p>
                            <p><b>{bedrooms} room(s) in total</b></p>
                        </>
                    }
                    {   
                        listingType.name === APR &&
                        <>
                            <p className={styles.baHeader}>This is an <b>Apartment</b></p>
                            <p className={styles.baSmallTxt}>You'll have the entire place to yourself</p>
                            <p><b>{bedrooms} room(s) in total</b></p>
                        </>
                    }
                    {
                        listingType.name === STU &&
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
