import Image from 'next/image';
import styles from './styles.module.css';
import userApi from '@/api/user/user.api';
import bookingApi from '@/api/booking/booking.api';
import { notFound, redirect } from 'next/navigation';
import listingsApi from '@/api/listings/listings.api';
import BookingFormWrapper from './wrapper/formWrapper';
import { Suspense } from 'react';

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

    const qs = 'amenity,utility,bedroomAmenity,hostRules,currency,listingType,host,images,address';

    const result = await listingsApi.httpGetDetailsForListing(qs, listingId);

    return result.data;
}

const checkListingAvalibility = async (listingId = '', startDate: string = '' , endDate: string = '') => {

    if(!startDate || !endDate) return false;

    const result = await bookingApi.httpCheckAvalibility(listingId, startDate, endDate);

    return result.success;
}

const getUserOptions = async (option: string) => {
    
    const options = await userApi.httpGetUserOptions(option);

    return options?.data;
}

const Booking: React.FC<PageProps> = async ({ params, searchParams }) => {

    const { listingId } = await params;

    const searchP = await searchParams;

    const { moveIn, moveOut, peopleAllowed } = searchP;

    if(!listingId) return notFound();
    
    const isAvaliable = await checkListingAvalibility(listingId, moveIn, moveOut);

    if (!isAvaliable || !moveIn || !moveOut || !peopleAllowed) return redirect(`/accommodations/${listingId}`)

    const listing = await getListingDetails(listingId);

    if(!listing) return notFound();

    const nationalities = await getUserOptions('nationality');

    const occupations = await getUserOptions('occupation');

    const countryCodes = await getUserOptions('countryCode');

    const { bedrooms, address, images, monthlyRent, description, placeAreaSqM, peopleAllowed: ppl, roomAreaSqM, beds, bathrooms, title, isChecked, bedroomAmenityMap, hostRulesMap, utilityMap, currency, listingType, hostingDetails, amenity, } = listing || {};

    const { streetAddress, city, stateOrProvince } = address;

    const { dueAtBooking, adminFee } = utilityMap || {};

    const { symbol } = currency;

    return (
        <div className={styles.container}>
            <div className={styles.containerSplit}>
                <section className={styles.left}>
                    <h1 className={styles.h1}>Book your new place <span className={styles.blue}>in minutes</span></h1>
                    <Suspense fallback={<>Loading...</>}>
                        <BookingFormWrapper 
                            countryCodes={countryCodes}
                            nationalities={nationalities} 
                            occupations={occupations} 
                            moveIn={moveIn}
                            moveOut={moveOut}
                            listingId={listingId}
                            guests={peopleAllowed}
                        />
                    </Suspense>
                </section>
                
                <section className={styles.right}>
                    <div className={styles.imageContainer}>
                        <Image 
                            src={images[0]?.url ?? '/photo.jpg'} 
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
                    
                        <h2 className={styles.title}>{title}</h2>

                        <address className={styles.address}>
                            <Image 
                                src='/location.png' 
                                alt=''
                                aria-hidden="true"
                                height={25}
                                width={25} />
                            <span>{streetAddress}, {city} {stateOrProvince}</span>
                        </address>

                        <div className={styles.moveCoa}>
                            <div className={styles.btnContainer}>
                                <label className={styles.btnLabel}>Move in</label>
                                <button className={styles.fakeInput} type='button' disabled>
                                    {moveIn}
                                </button>
                            </div>
                            <div className={styles.arrowContainer}>
                                <Image src='/arrow-right.png' alt='' height={35} width={35} />
                            </div>
                            <div className={styles.btnContainer}>
                                <label className={styles.btnLabel}>Move out</label>
                                <button className={styles.fakeInput} type='button' disabled>
                                    {moveOut}
                                </button>
                            </div>
                        </div>
                        

                        <hr></hr>
                        <div>
                            <h3>Price details</h3>
                            <div className={styles.priceBreakDown}>
                                <span className={styles.smallFont}>First rental payment</span>
                                <span className={`${styles.fontBold} ${styles.smallFont}`}>{symbol} {monthlyRent}</span>
                            </div>
                            <div className={styles.priceBreakDown}>
                                <span className={styles.smallFont}>One time service fee</span>
                                <span className={`${styles.fontBold} ${styles.smallFont}`}>{symbol} {adminFee}</span>
                            </div>
                            <div className={styles.priceBreakDown}>
                                <span className={styles.smallFont}>Security Deposit</span>
                                <span className={`${styles.fontBold} ${styles.smallFont}`}><i>Paid to landlord directly</i></span>
                            </div>
                            <hr></hr>
                            <div className={styles.priceBreakDown}>
                                <span className={styles.bigFont}>Total</span>
                                <span className={`${styles.fontBold} ${styles.bigFont}`}>{symbol} {dueAtBooking}</span>
                            </div>
                            <hr></hr>
                            <p className={styles.disclaimerText}>You will be charged if, and only if, the landlord approves your request.</p>
                            <button className={styles.reviewBtn} type='button'>Review price details </button>
                        </div>

                    </div>

                    <div className={styles.listingDetails}>
                        <h3 className={styles.promoCodeHeader}><Image src='/promo-code.png' alt='' height={35} width={35} /> Do you have a promo code?</h3>
                        <div className={styles.inlineDiv}>
                            <input placeholder='Add promo code here' /> 
                            <button>Apply code</button>
                        </div>
                    </div>

                    <div className={styles.listingDetails}>
                        <h3>Your reservation</h3>
                        
                    </div>
                </section>

            </div>
        </div>
    )
};

export default Booking;