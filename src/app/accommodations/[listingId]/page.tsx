import Image from 'next/image';
import styles from './page.module.css';
import SectionWrapper from '@/components/wrappers/section/section';
import Link from 'next/link';
import BookingForm from '@/components/ui/bookingform/bookingform';
import Yourbedroom, { SkeletonYourBedRoom } from '@/components/wrappers/accommodations/bedroom/yourbedroom';
import About from '@/components/wrappers/accommodations/about/about';
import Availability from '@/components/wrappers/accommodations/availability/availability';
import { Suspense } from 'react';
import Services from '@/components/wrappers/accommodations/services/services';
import Spaces from '@/components/wrappers/accommodations/spaces/spaces';
import ListingInfo, { ListingInfoSkeleton } from '../../../components/wrappers/accommodations/listingInfo/ListingInfo';
import ImageContainer, { SkeletonImageContainer } from '../../../components/wrappers/accommodations/listingImage/ImageContainer';
import Landlord from '@/components/wrappers/accommodations/landlord/landlord';
import listingsApi from '@/api/listings/listings.api';
import { notFound } from 'next/navigation';
import Conditions from '@/components/wrappers/accommodations/conditions/conditions';

interface ListParams {
    listingId: string
};

interface PageProps {
    params: Promise<ListParams>;
}

const getListingDetails = async (listingId: string) => {

    const qs = 'address,amenity,utility,bedroomAmenity,hostRules,currency,listingType,host,images';

    const result = await listingsApi.httpGetDetailsForListing(qs, listingId);

    return result;
}

const ListingsPage = async ({ params }: PageProps ) => {

    const { listingId } = await params;

    const listing = await getListingDetails(listingId);

    if (listing.success === false) return notFound();
    
    const { bedrooms, images, monthlyRent, description, beds, bathrooms, title, isChecked, address, bedroomAmenityMap, hostRulesMap, utilityMap, currency, listingType, hostingDetails, amenity, minimumStayDays, maxStayDays, updatedAt, } = listing || {};

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <header className={styles.headerSection}>
                    <Suspense fallback={<ListingInfoSkeleton/>}>
                        <ListingInfo
                            address={address}
                            listingType={listingType}
                            title={title}
                            placeAreaSqM={bathrooms}
                            bathrooms={bathrooms}
                            bedrooms={bedrooms}
                        />
                    </Suspense>
                    <div className={styles.rightSide}>
                        <ul className={styles.coas}>
                            <li>
                                <button className={styles.coasBtn}>
                                    <span>
                                        <Image src='/heart.png' alt='Heart button icon' height={25} width={25} />
                                    </span>
                                    Save
                                </button>
                            </li>
                            <li>
                                <button className={styles.coasBtn}>
                                    <span>
                                        <Image src='/share.svg' alt='Share button icon' height={25} width={25} />
                                    </span>
                                    Share
                                </button>
                            </li>
                            <li>
                                <button className={styles.coasBtn}>
                                    <span>
                                        <Image src='/report.png' alt='Report button icon' height={25} width={25} />
                                    </span>
                                    Report
                                </button>
                            </li>
                        </ul>
                    </div>
                </header>
                <Suspense fallback={<SkeletonImageContainer />}>
                    <ImageContainer images={images} />
                </Suspense>
            </div>
            <div className={styles.split}>
                <div className={styles.leftSplit}>
                    <ul className={styles.btnContainer}>
                        <li>
                            <button className={styles.mapBtn}>
                                <span className={styles.mapBtnIcon}>
                                    <Image src='/map.png' alt='Map button icon' height={25} width={25} />
                                </span>
                                Map
                            </button>
                        </li>
                        <li>
                            <button className={styles.mapBtn}>
                                <span className={styles.mapBtnIcon}>
                                    <Image src='/floorplan.png' alt='Map button icon' height={25} width={25} />
                                </span>
                                Floor plan
                            </button>
                        </li>
                        <li>
                            <button className={styles.mapBtn}>
                                <span className={styles.mapBtnIcon}>
                                    <Image src='/camera.png' alt='Map button icon' height={25} width={25} />
                                </span>
                                Photos
                            </button>
                        </li>
                        <li>
                            <button className={styles.mapBtn}>
                                <span className={styles.mapBtnIcon}>
                                    <Image src='/video.png' alt='Map button icon' height={25} width={25} />
                                </span>
                                Video
                            </button>
                        </li>
                    </ul>
                    <section className={styles.navLinks}>
                        <nav className={styles.navNav}>
                            <ul className={styles.links}>
                                <li className={styles.link}>
                                    <Link href='#overview'>Overview</Link>
                                </li>
                                <li className={styles.link}>
                                    <Link href='#availability'>Availability</Link>
                                </li>
                                <li className={styles.link}>
                                    <Link href='#landlord'>Landlord</Link>
                                </li>
                                <li className={styles.link}>
                                    <Link href='#servicesandexpenses'>Services and expenses</Link>
                                </li>
                                <li>
                                    <Link href='#reviews'>Reviews</Link>
                                </li>
                                <li className={styles.link}>
                                    <Link href='#contract'>Contract</Link>
                                </li>
                            </ul>
                        </nav>
                    </section>

                    <Suspense fallback={<SkeletonYourBedRoom/>}>
                        <Yourbedroom 
                            id={listingId}
                            beds={beds}
                            bedrooms={bedrooms}
                            isChecked={isChecked}
                            bedroomAmenity={bedroomAmenityMap}
                            listingType={listingType}
                        />
                    </Suspense> 
                    <hr/>

                    <Suspense fallback={<>Loading...</>}>
                        <About
                            hostingDetails={hostingDetails || undefined}
                            description={description}
                        />
                    </Suspense>
                    <hr/>
                    
                    <Suspense fallback={<>Loading...</>}>
                        <Spaces id={listingId} amenity={amenity || undefined}/>
                    </Suspense>
                    <hr/>
                   
                    <Suspense fallback={<>Loading...</>}>
                        <Availability 
                            id={listingId}
                            maxStayDays={maxStayDays}
                            minimumStayDays={minimumStayDays}
                            updatedAt={updatedAt}
                        />
                    </Suspense>
                    <hr/>

                    <Suspense fallback={<>Loading...</>}>
                        <Landlord 
                            id={listingId} 
                            hostingDetails={hostingDetails || undefined}
                        />
                    </Suspense>
                    
                    <hr/>
                    <Suspense fallback={<>Loading...</>}>
                        <Services id={listingId} utilityMap={utilityMap || undefined} />
                    </Suspense>  

                    <hr/>
                    
                    <SectionWrapper id='reviews' headerText='Reviews'>
                        <div>
                            Reviews
                        </div>
                    </SectionWrapper>

                    <hr/>

                    <Suspense fallback={<>Loading...</>}>
                        <Conditions hostRulesMap={hostRulesMap}/>
                    </Suspense>

                    <hr/>

                    <SectionWrapper id='contract' headerText='Contract'>
                        <p>text</p>
                    </SectionWrapper>

                    <hr/>
     
                </div>

                <div className={styles.rightSplit}>
                    <BookingForm monthlyRent={monthlyRent} currency={currency} />
                </div>

                
            </div>
            <div>
                <section>
                    More Place like this (section)
                </section>

                <SectionWrapper id='whyLocaSphere' headerText='Why Loca-Sphere?'>
                    <ul className={styles.wslGrid}>
                        <li className={styles.wlsContainer}>
                            <h3>No guarantor, no bureaucracies</h3>
                            <p>Say goodbye to guarantors, income proofs, and endless calls. Book your stay online effortlessly with Uniplaces from anywhere in the world.</p>
                        </li>
                        <li className={styles.wlsContainer}>
                            <h3>Safe arrival</h3>
                            <p>If your property isn’t as listed, report it within 24 hours of your move-in. We’ll freeze your payment and help resolve the issue fast.</p>
                        </li>
                        <li className={styles.wlsContainer}>
                            <h3>Certificate of Prepaid Accommodation</h3>
                            <p>Need a document for your visa application? We’ve got you covered with a prepaid accommodation certificate.</p>
                        </li>
                        <li className={styles.wlsContainer}>
                            <h3>Send multiple booking requests, only pay one</h3>
                            <p>Interested in more than one place? Send multiple booking requests! The first accepted one will be confirmed and paid automatically.</p>
                        </li>
                    </ul>
                </SectionWrapper>
            </div>
        </div>
    )
};

export default ListingsPage;


                    // <div className={styles.leftSide}>
                    //     <h2>Double bedroom, large terrace and private bathroom</h2>
                    //     <ul className={styles.infoRoom}>
                    //         <li>Double bedroom </li>
                    //         <li>•</li>
                    //         <li>4-bedrooms apartment</li>
                    //         <li>•</li>
                    //         <li>2 bathrooms</li>
                    //         <li>•</li>
                    //         <li>1 person</li>
                    //         <li>•</li>
                    //         <li>180 m²</li>
                    //     </ul>
                    //     <div className={styles.location}>
                    //         <Image src='/location.png' alt='location icon' height={30} width={30} />
                    //         <span>Carrer de Maó, Sant Gervasi - La Bonanova (Sarrià - Sant Gervasi), Barcelona</span>

                    //     </div>
                    // </div>