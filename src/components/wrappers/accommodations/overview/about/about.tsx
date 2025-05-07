import SectionWrapper from "@/components/wrappers/section/section";
import styles from './about.module.css';
import Image from "next/image";
import listingsApi from "@/api/listings/listings.api";

interface AboutProps {
    id: string
}

interface ListingDetails {
    id: number;
    title: string;
    monthlyRent: number;
    description: string;
    livesInProperty: boolean;
    hostAgeRange: string;
    livesWithFamily: boolean;
    hasPets: boolean;
    hostGender: string;
    isChecked: boolean;
    sex: string;
}

const getListingDetails = async (id: string) =>  {

    const listingDetails = await listingsApi.httpGetListingDetails(id);
     
    return listingDetails;
}

const MIXEDGENDER = 'Mixed Gender';
const MALES = 'Males';
const FEMALES = 'Females'

const About = async ({ id }: AboutProps ) => {

    const details : ListingDetails[] = await getListingDetails(id);

    if(!details || details.length === 0){

        return (
            <SectionWrapper id='aboutApartment' headerText='About this apartment'>
                No details found...
            </SectionWrapper>
        )
    };

    const { description, sex, livesInProperty, livesWithFamily, hasPets } = details[0];

    return (
        <SectionWrapper id='aboutApartment' headerText='About this apartment'>
            <div className={styles.textContainer}>
                <p>{description}</p>

                <div className={styles.aiButton}>
                    <button type='button'>
                        <Image src="/ai.png" alt="AI Icon" height={20} width={20} />
                        <span className={styles.tooltip}>Summarize with AI</span>
                    </button>
                </div>
            </div>
            <h4>You'll be living with</h4>
            <ul className={styles.bedroomAdmenities}>
                {   sex === MIXEDGENDER &&
                    <li className={styles.baListItem}>
                        <Image src='/gender.png' alt='gender icon' width={40} height={40}  />
                        <span>{sex}</span>
                    </li>
                }
                {
                    sex === MALES &&
                    <li className={styles.baListItem}>
                        <Image src='/gender.png' alt='gender icon' width={40} height={40}  />
                        <span>{sex}</span>
                    </li>
                }
                {
                    sex === FEMALES &&
                    <li className={styles.baListItem}>
                        <Image src='/gender.png' alt='gender icon' width={40} height={40}  />
                        <span>{sex}</span>
                    </li>
                }
                {   livesInProperty &&
                    <li className={styles.baListItem}>
                        <Image src='/landlord.png' alt='gender icon' width={40} height={40}  />
                        <span>Resident landlord</span>
                    </li>
                }
                {
                    livesInProperty && livesWithFamily &&
                    <li className={styles.baListItem}>
                        <Image src='/family.png' alt='gender icon' width={40} height={40}  />
                        <span>Landlord lives with family</span>
                    </li>
                }
                {
                    livesInProperty && hasPets &&
                    <li className={styles.baListItem}>
                        <Image src='/pets.png' alt='gender icon' width={40} height={40}  />
                        <span>Landlord has pets</span>
                    </li>
                }
            </ul>
        </SectionWrapper>
    )
};

export default About;