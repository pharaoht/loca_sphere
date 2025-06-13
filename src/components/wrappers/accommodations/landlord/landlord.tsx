import listingsApi from "@/api/listings/listings.api";
import SectionWrapper from "../../section/section";
import styles from './landlord.module.css';
import Image from "next/image";

interface Props {
    id: string
}

const getLandlordDetails = async (listId: string) => {
    
    const listingDetails = await listingsApi.httpGetListingDetails(listId);
     
    return listingDetails;
};

const Landlord: React.FC<Props> = async ({ id }) => {

    const details = await getLandlordDetails(id);

    if(!details){

        return (
            <SectionWrapper id="landlord" headerText="LandLord">
                No details....
            </SectionWrapper>
        )
    };

    const { hostingDetails } = details;

    const { peopleHosted, hostGender, hostAgeRange } = hostingDetails;

    return (
        <SectionWrapper id="landlord" headerText="Landlord" isChecked={true} checkText="Verified" title="This host went through our verification process">
            <ul className={styles.ulContainer}>
                <li className={styles.item} >
                    <Image src='/gender.png' alt='gender icon' width={40} height={40}/>
                    <span>{hostGender}</span>
                </li>
                <li className={styles.item}>
                    <Image src='/man-icon.png' alt='man icon' width={40} height={40}  />
                    <span>{hostAgeRange}</span>
                </li>
                <li className={styles.item}>
                    <Image src='/group.png' alt='group icon' width={40} height={40}  />
                    <span>People hosted {peopleHosted}</span>
                </li>
            </ul>
        </SectionWrapper>
    )
};

export default Landlord;