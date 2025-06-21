
import SectionWrapper from "../../section/section";
import styles from './landlord.module.css';
import Image from "next/image";

interface Props {
    id: string
    hostingDetails: {
        listingId: string;
        livesInProperty: boolean;
        hostGender: string;
        hostAgeRange: string;
        livesWithFamily: boolean;
        hasPets: boolean;
        isVerified: boolean;
        createdAt: string;
        genderAllowedId: number;
        userId: string;
        peopleHosted: number;
    }
}


const Landlord: React.FC<Props> = async ({ id, hostingDetails }) => {

    if(!id){

        return (
            <SectionWrapper id="landlord" headerText="LandLord">
                No details....
            </SectionWrapper>
        )
    };

    const { hostGender, peopleHosted, hostAgeRange, isVerified } = hostingDetails;

    return (
        <SectionWrapper id="landlord" headerText="Landlord" isChecked={isVerified} checkText="Verified" title="This host went through our verification process">
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