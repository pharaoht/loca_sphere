import AvailabilityCalendar from "@/components/ui/availabilitycalendar/availabilitycalendar";
import SectionWrapper from "../../section/section";
import styles from './a.module.css';
import listingsApi from "@/api/listings/listings.api";

interface Props {
    id: string
}

interface ListingDetails {
    id: number;

    monthlyRent: number;
    hostGender: string;
    isChecked: boolean;
    minimumStayDays: number;
    maxStayDays: number;
    updatedAt: string;
    
}

const getListingAvailability = async (id: string) => {

    const results = await listingsApi.httpGetListingbyId(id);

    return results;
}

const Availability: React.FC<Props> = async ({ id }) => {

    const details: ListingDetails = await getListingAvailability(id);

    if(!details){

        return (
            <SectionWrapper id='availability' headerText='Availability'>
                No details found...
            </SectionWrapper>
        )
    };

    const { minimumStayDays, maxStayDays, updatedAt, } = details;

    return (
        <SectionWrapper id='availability' headerText='Availability'>
            <div className={styles.availabilitySection}>
                <div className={styles.availabilityCalendar}>
                    <AvailabilityCalendar year={new Date().getFullYear()}/>
                    <AvailabilityCalendar year={new Date().getFullYear() + 1}/>
                </div>
            
                <ul className={styles.availabilityLegend}>
                    <li className={styles.legendLi}>
                        <span className={styles.availableBlock}></span>
                        <span>Available</span>
                    </li>
                    <li className={styles.legendLi}>
                        <span className={styles.occupiedBlock}></span>
                        <span>Occupied</span>
                    </li>
                </ul>

                <div className={styles.avInfoContainer}>
                    <div className={styles.avInfoRow}>
                        <dt className={styles.avInfoLabel}>Available from:</dt>
                        <dd><b>May 2025</b></dd>
                    </div>
                    <div className={styles.avInfoRow}>
                        <dt className={styles.avInfoLabel}>Last updated:</dt>
                        <dd><b>{updatedAt}</b></dd>
                    </div>
                    <div className={styles.avInfoRow}>
                        <dt className={styles.avInfoLabel}>Minimum stay:</dt>
                        <dd><b>{minimumStayDays} days</b></dd>
                    </div>
                    <div></div>
                    <div className={styles.avInfoRow}>
                        <dt className={styles.avInfoLabel}>Maximum stay:</dt>
                        <dd><b>{maxStayDays} days</b></dd>
                    </div>   
                        
                </div>
            </div>
        </SectionWrapper>
    )
};

export default Availability;