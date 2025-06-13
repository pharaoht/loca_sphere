import Image from 'next/image';
import styles from './page.module.css';
import SectionWrapper from '@/components/wrappers/section/section';
import Link from 'next/link';
import BookingForm from '@/components/ui/bookingform/bookingform';
import Yourbedroom from '@/components/wrappers/accommodations/overview/bedroom/yourbedroom';
import About from '@/components/wrappers/accommodations/overview/about/about';
import Availability from '@/components/wrappers/accommodations/availability/availability';
import { Suspense } from 'react';
import Services from '@/components/wrappers/accommodations/services/services';
import Spaces from '@/components/wrappers/accommodations/overview/spaces/spaces';
import ListingInfo, { ListingInfoSkeleton } from '../../../components/wrappers/accommodations/listingInfo/ListingInfo';
import ImageContainer, { SkeletonImageContainer } from '../../../components/wrappers/accommodations/listingImage/ImageContainer';
import Landlord from '@/components/wrappers/accommodations/landlord/landlord';

interface ListParams {
    listingId: string
};

interface PageProps {
    params: Promise<ListParams>;
}

const ListingsPage = async ({ params }: PageProps ) => {

    const { listingId } = await params;

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <header className={styles.headerSection}>
                    <Suspense fallback={<ListingInfoSkeleton/>}>
                        <ListingInfo id={listingId} />
                    </Suspense>
                    <div className={styles.rightSide}>
                        <ul className={styles.coas}>
                            <li>
                                <button className={styles.coasBtn}>
                                    <span className={styles.mapBtnIcon}>
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
                    <ImageContainer />
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

                    <Suspense fallback={<>Loading...</>}>
                        <Yourbedroom id={listingId}/>
                    </Suspense>
                    <hr/>

                    <Suspense fallback={<>Loading...</>}>
                        <About id={listingId}/>
                    </Suspense>
                    <hr/>

                    <Suspense fallback={<>Loading...</>}>
                        <Spaces id={listingId}/>
                    </Suspense>
                    <hr/>

                    <Suspense fallback={<>Loading...</>}>
                        <Availability id={listingId}/>
                    </Suspense>
                    <hr/>

                    <Suspense fallback={<>Loading...</>}>
                        <Landlord id={listingId} />
                    </Suspense>

                    <hr/>
                    <Suspense fallback={<>Loading...</>}>
                        <Services id={listingId} />
                    </Suspense>

                    <hr/>
                    
                    <SectionWrapper id='reviews' headerText='Reviews'>
                        <div>
                            Reviews
                        </div>
                    </SectionWrapper>

                    <hr/>

                    <SectionWrapper id='rentalConditions' headerText='Rental Conditions'>
                        <div>
                            <h4>Requirements</h4>
                            <p>You have to provide the landlord with these documents:</p>
                            <ul>
                                <li>Tenancy agreement</li>
                                <li>Passport or ID</li>
                            </ul>
                        </div>
                        <ul>
                            <li>
                                <Image src='/calender-icon.png' alt='' height={25} width={25} />
                                <span>Minimum stay 210 nights</span>
                            </li>
                            <li>
                                <Image src='/calender-icon.png' alt='' height={25} width={25} />
                                Overnight guests allowed
                            </li>
                            <li>
                                <Image src='/calender-icon.png' alt='' height={25} width={25} />
                                Couples allowed
                            </li>
                            <li>
                                <Image src='/calender-icon.png' alt='' height={25} width={25} />
                                Pets allowed
                            </li>
                            <li>
                                <Image src='/calender-icon.png' alt='' height={25} width={25} />
                                Smoking allowed
                            </li>
                        </ul>
                    </SectionWrapper>

                    <hr/>

                    <SectionWrapper id='contract' headerText='Contract'>
                        <p>text</p>
                    </SectionWrapper>

                    <hr/>
     
                </div>

                <div className={styles.rightSplit}>
                    <BookingForm />
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