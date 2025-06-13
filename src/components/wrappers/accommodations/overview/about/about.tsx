import SectionWrapper from "@/components/wrappers/section/section";
import styles from './about.module.css';
import Image from "next/image";
import listingsApi from "@/api/listings/listings.api";

interface AboutProps {
    id: string
}

export type Gender = 'male' | 'female' | 'non-binary' | string;
export type AgeRange = '18-25 years' | '26-30 years' | '31-40 years' | '41+ years' | string;
export type AllowedGender = 'Males' | 'Females' | 'Mixed Gender' | string;

export interface GenderMapping {
  id: number;
  sex: AllowedGender;
}

export interface ListingDetails {
    description: string;
    hostingDetails: {
        id: string;
        listingId: string;
        livesInProperty: boolean;
        hostGender: Gender;
        hostAgeRange: AgeRange;
        livesWithFamily: boolean;
        hasPets: boolean;
        peopleHosted: string;
        isVerified: boolean;
        createdAt: string; // Use `Date` if you parse it
        genderAllowedId: number;
        userId: string;
        genderMapping: GenderMapping;
    }
}

const getListingDetails = async (id: string) =>  {

    const listingDetails = await listingsApi.httpGetListingDetails(id);
     
    return listingDetails;
}

const MIXEDGENDER = 'Mixed Gender';
const MALES = 'Males';
const FEMALES = 'Females'

const About = async ({ id }: AboutProps ) => {

    const details = await getListingDetails(id);

    if(!details){

        return (
            <SectionWrapper id='aboutApartment' headerText='About this apartment'>
                No details found...
            </SectionWrapper>
        )
    };

    const { description, hostingDetails } = details;

    const { livesInProperty, livesWithFamily, hasPets, genderMapping } = hostingDetails;

    const { sex } = genderMapping

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