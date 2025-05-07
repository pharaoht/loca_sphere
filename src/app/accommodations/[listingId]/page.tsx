import Image from 'next/image';
import styles from './page.module.css';
import SectionWrapper from '@/components/wrappers/section/section';
import Link from 'next/link';
import BookingForm from '@/components/ui/bookingform/bookingform';
import Yourbedroom from '@/components/wrappers/accommodations/overview/bedroom/yourbedroom';
import About from '@/components/wrappers/accommodations/overview/about/about';
import Availability from '@/components/wrappers/accommodations/availability/availability';

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
                    <div className={styles.leftSide}>
                        <h2>Double bedroom, large terrace and private bathroom</h2>
                        <ul className={styles.infoRoom}>
                            <li>Double bedroom </li>
                            <li>•</li>
                            <li>4-bedrooms apartment</li>
                            <li>•</li>
                            <li>2 bathrooms</li>
                            <li>•</li>
                            <li>1 person</li>
                            <li>•</li>
                            <li>180 m²</li>
                        </ul>
                        <div className={styles.location}>
                            <Image src='/location.png' alt='location icon' height={30} width={30} />
                            <span>Carrer de Maó, Sant Gervasi - La Bonanova (Sarrià - Sant Gervasi), Barcelona</span>

                        </div>
                    </div>
                    <div className={styles.rightSide}>
                        <ul className={styles.coas}>
                            <li>Save</li>
                            <li>Share</li>
                            <li>Report</li>
                        </ul>
                    </div>
                </header>
                <section className={styles.imageContainer}>
                    <div className={styles.mainImage}>
                        <Image className={styles.listImage} src='/photo.jpg' alt='image' fill/>
                    </div>
                    <div className={styles.grid}>
                        <div className={styles.smallImage}><Image className={styles.listImage} src="/photo.jpg" alt="Small 1" fill /></div>
                        <div className={styles.smallImage}><Image className={styles.listImage} src="/photo.jpg" alt="Small 2" fill /></div>
                        <div className={styles.smallImage}><Image className={styles.listImage} src="/photo.jpg" alt="Small 3" fill /></div>
                        <div className={styles.smallImage}><Image className={styles.listImage} src="/photo.jpg" alt="Small 4" fill /></div>
                    </div>
                </section>
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

                    <Yourbedroom id={listingId}/>

                    <hr/>

                    <About id={listingId}/>

                    <hr/>

                    <SectionWrapper id='sharedSpaces' headerText='Shared spaces and admentities'>
                        <ul className={styles.shareAdmenities}>
                            <li>
                                <div className={styles.shareAdmenImage}>
                                    <Image className={styles.listImage} src='/photo.jpg' alt='image' fill />
                                </div>
                                <h4>Kitchen</h4>
                            </li>
                            <li>
                                <div className={styles.shareAdmenImage}>
                                    <Image className={styles.listImage} src='/photo.jpg' alt='image' fill />
                                </div>
                                <h4>Bathroom</h4>
                            </li>
                            <li>
                                <div className={styles.shareAdmenImage}>
                                    <Image className={styles.listImage} src='/photo.jpg' alt='image' fill />
                                </div>
                                <h4>Living room</h4>
                            </li>

                        </ul>
                        <button>See all shared admentities</button>
                    </SectionWrapper>

                    <hr/>

                   <Availability id={listingId}/>

                    <hr/>

                    <SectionWrapper id='landlord' headerText='Landlord'>
                        <ul>
                            <li>male 40's</li>
                        </ul>
                    </SectionWrapper>

                    <hr/>

                    <SectionWrapper id='servicesandexpenses' headerText='Services and expenses'>
                        <p><b>Extra services, expenses and fees to be paid directly to the Landlord</b></p>

                        <div className={styles.servicesPayment}>
                            <h3>One-time payments</h3>
                            <div className={styles.spSd}>
                                <h4>Security deposit</h4>
                                <h4><b>$1290</b></h4>
                            </div>
                            <span>Refundable payment to be made directly to Landlord, which should be refunded if you meet all the rental conditions.</span>
                        </div>

                        <div className={styles.servicesPayment}>
                            <h3>Fixed Monthly Bills</h3>

                            <dl className={styles.spFMB}>
                                <div className={styles.spFMBContainer}>
                                    <dt>Water</dt>
                                    <dd className={styles.spAmenity}>
                                        <Image src='/x-circle.png' alt='imag' height={30} width={30} />
                                        <span>Not included in the price</span>
                                    </dd>
                                </div>

                                <div className={styles.spFMBContainer}>
                                    <dt>Electricity</dt>
                                    <dd className={styles.spAmenity}>
                                        <Image src='/x-circle.png' alt='imag' height={30} width={30} />
                                        <span>Not included in the price</span>
                                    </dd>
                                </div>
                                
                                <div className={styles.spFMBContainer}>
                                    <dt>Internet</dt>
                                    <dd className={styles.spAmenity}>
                                        <Image src='/green-check.png' alt='imag' height={30} width={30} />
                                        <span className={styles.green}>Included in the price</span>
                                    </dd>
                                </div>

                                <div className={styles.spFMBContainer}>
                                    <dt>Gas</dt>
                                    <dd className={styles.spAmenity}>
                                        <Image src='/green-check.png' alt='imag' height={30} width={30} />
                                        <span className={styles.green}>Included in the price</span>
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div className={styles.servicesPayment}>
                            <h3>Other fees</h3>
                            <div >
                                <div className={styles.spSd}>
                                    <h4>Admin fee in advance</h4>
                                    <h4><b>$75</b></h4>
                                </div>
                                <p>One time fee charged in advance for necessary maintenance.</p>
                            </div>

                            <div>
                                <div className={styles.spSd}>
                                    <h4>Cleaning fee</h4>
                                    <h4><b>Included</b></h4>
                                </div>
                                <p>One less thing on your to-do list! Cleaning is covered for you.</p>
                            </div>


                        </div>
                    </SectionWrapper>

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
     
                </div>

                <div className={styles.rightSplit}>
                    <BookingForm />
                </div>
            </div>
            <div>
                <section>
                    More Place like this (section)
                </section>

                <section>
                    Why LocaSphere (section)
                </section>
            </div>
        </div>
    )
};

export default ListingsPage;