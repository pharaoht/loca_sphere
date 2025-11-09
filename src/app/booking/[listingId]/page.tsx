import Image from 'next/image';
import styles from './styles.module.css';
import PersonalDetailsForm from '@/components/ui/personalDetails/personalDetail';
import Link from 'next/link';
import listingsApi from '@/api/listings/listings.api';
import { notFound, redirect } from 'next/navigation';
import PaymentDetailForm from '@/components/ui/payment/payment';
import bookingApi from '@/api/booking/booking.api';

export const metadata = {
    title: "LocaSphere - Checkout",
    description: "Reserve your new place in minutes.",
};

interface ListParams {
    listingId: string
    moveIn: string;
    moveOut: string;
    people: number;
};

interface PageProps {
    params: Promise<ListParams>;
    searchParams: Promise<{ [key: string]: string | undefined }>;
}

const getListingDetails = async (listingId: string) => {

    if(!listingId) return false;

    const qs = 'amenity,utility,bedroomAmenity,hostRules,currency,listingType,host,images';

    const result = await listingsApi.httpGetDetailsForListing(qs, listingId);

    return result;
}

const getUserDetails = async () => {
    //get users details if there is a session
};

const checkListingAvalibility = async (listingId = '', startDate: string = '' , endDate: string = '') => {

    if(!startDate || !endDate) return false;

    const result = await bookingApi.httpCheckAvalibility(listingId, startDate, endDate);

    return result.success;
}


const Booking: React.FC<PageProps> = async ({ params, searchParams }) => {

    const { listingId } = await params;

    const searchP = await searchParams;

    const { moveIn, moveOut, peopleAllowed } = searchP;

    if(!listingId) return notFound();
    
    const isAvaliable = await checkListingAvalibility(listingId, moveIn, moveOut);

    if (!isAvaliable) return redirect(`/accommodations/${listingId}`)

    const listing = await getListingDetails(listingId);

    if(!listing) return notFound();

    const user = await getUserDetails();

    const { bedrooms, images, monthlyRent, description, placeAreaSqM, peopleAllowed: ppl, roomAreaSqM, beds, bathrooms, title, isChecked, bedroomAmenityMap, hostRulesMap, utilityMap, currency, listingType, hostingDetails, amenity, } = listing || {};

    return (
        <div className={styles.container}>
            <div className={styles.containerSplit}>
                <section className={styles.left}>
                    <h1 className={styles.h1}>Book your new place <span className={styles.blue}>in minutes</span></h1>
                    <p className={styles.banner}><Link className={styles.link} href='/login'>Log in</Link> for a faster checkout using your saved details, or <Link className={styles.link} href='/sign-up'>sign up</Link> to manage and track your bookings easily.</p>
                    <PersonalDetailsForm />
                    <PaymentDetailForm />
                </section>
                
                <section className={styles.right}>
                    <div className={styles.imageContainer}>
                        <Image 
                            src={images[0].url} 
                            alt='image of listing' 
                            fill
                            sizes="100vw"
                            style={{ objectFit: 'cover' }} />
                    </div>
                    <div className={styles.listingDetails}>
                        <ul className={styles.verifications}>
                            <li>Trusted landlord</li>
                            <li>Instant booking</li>
                            <li>Checked</li>
                        </ul>
                    
                        <h2 className={styles.title}>Single bedroom in Vilapicina i la Torre Llobeta</h2>

                        <div>
                            <span>Pin Icon</span>
                            <p>Address</p>
                        </div>

                        <div>
                            MoveIn date {'>'} MoveOut date 
                        </div>
                        

                        <hr></hr>
                        <div>
                            <h3>Price details</h3>
                            <div>

                            </div>
                        </div>

                    </div>

                    <div className={styles.listingDetails}>
                        hi
                    </div>
                </section>

            </div>
        </div>
    )
};

export default Booking;