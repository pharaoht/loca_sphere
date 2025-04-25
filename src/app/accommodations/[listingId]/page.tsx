import Image from 'next/image';
import styles from './page.module.css';
import SectionWrapper from '@/components/wrappers/section/section';
import Link from 'next/link';
import AvailabilityCalendar from '@/components/ui/availabilitycalendar/availabilitycalendar';
import BookingForm from '@/components/ui/bookingform/bookingform';

const ListingsPage = () => {

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
                                <li className={styles.link}>
                                    <Link href='#contract'>Contract</Link>
                                </li>
                            </ul>
                        </nav>
                    </section>

                    <SectionWrapper id='overview' headerText='Your bedroom'>
                        <ul className={styles.bedroomAdmenities}>
                            <li className={styles.baListItem}>
                                <Image src='/bed.png' alt='bed icon' width={40} height={40}  />
                                <span>Double bed</span>
                            </li>
                            <li className={styles.baListItem}>
                                <Image src='/wardrobe.png' alt='bed icon' width={40} height={40}  />
                                <span>Wardrobe</span>
                            </li>
                            <li className={styles.baListItem}>
                                <Image src='/desk.png' alt='bed icon' width={40} height={40}  />
                                <span>Desk</span></li>
                            <li className={styles.baListItem}>
                                <Image src='/office_chair.png' alt='bed icon' width={40} height={40}  />
                                <span>Chairs</span>
                            </li>
                            <li className={styles.baListItem}>
                                <Image src='/sofa.png' alt='bed icon' width={40} height={40}  />
                                <span>Sofa bed</span>
                            </li>
                        </ul>
                        <div className={styles.baInfo}>
                            <div>
                                <Image src='/bnf.svg' alt='bed icon' width={125} height={125}  />
                            </div>
                            <div className={styles.baBedRoomText}>
                                <p className={styles.baHeader}>This is a <b>Private bedroom</b></p>
                                <p className={styles.baSmallTxt}>You won't have to share the bedroom with anyone else</p>
                                <p className={styles.baSmallTxt}>This room has a total of 1 beds available</p>
                                <p><b>4 rooms in total</b></p>
                            </div>
                        </div>
                        <div>
                            <button type='button'>See all features</button>
                        </div>
                    </SectionWrapper>

                    <hr/>

                    <SectionWrapper id='aboutApartment' headerText='About this apartment'>
                        <div className={styles.textContainer}>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>

                            <div className={styles.aiButton}>
                                <button type='button'>
                                    <Image src="/ai.png" alt="AI Icon" height={20} width={20} />
                                    <span className={styles.tooltip}>Summarize with AI</span>
                                </button>
                            </div>
                        </div>
                        <h4>You'll be living with</h4>
                        <ul className={styles.bedroomAdmenities}>
                            <li className={styles.baListItem}>
                                <Image src='/gender.png' alt='gender icon' width={40} height={40}  />
                                <span>Mixed gender</span>
                            </li>
                            <li className={styles.baListItem}>
                                <Image src='/landlord.png' alt='gender icon' width={40} height={40}  />
                                <span>Resident landlord</span>
                            </li>
                            <li className={styles.baListItem}>
                                <Image src='/family.png' alt='gender icon' width={40} height={40}  />
                                <span>Landlord lives with family</span>
                            </li>
                            <li className={styles.baListItem}>
                                <Image src='/pets.png' alt='gender icon' width={40} height={40}  />
                                <span>Landlord has pets</span>
                            </li>
                            
                        </ul>
                    </SectionWrapper>

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
                                    <dd><b>Apr 2025</b></dd>
                                </div>
                                <div className={styles.avInfoRow}>
                                    <dt className={styles.avInfoLabel}>Minimum stay:</dt>
                                    <dd><b>140 nights</b></dd>
                                </div>
                                <div></div>
                                <div className={styles.avInfoRow}>
                                    <dt className={styles.avInfoLabel}>Maximum stay:</dt>
                                    <dd><b>No maximum stay</b></dd>
                                </div>   
                                    
                            </div>
                        </div>
                    </SectionWrapper>

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
                            <div className={styles.spSd}>
                                <h4>Admin fee in advance</h4>
                                <h4><b>$75</b></h4>
                            </div>
                            <p>One time fee charged in advance for necessary maintenance.</p>

                        </div>
                    </SectionWrapper>

                    <hr/>

                    <SectionWrapper id='rentalConditions' headerText='Rental Conditions'>
                        <ul>
                            <li>Minimum stay</li>
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
                    More Place like this
                </section>
            </div>
        </div>
    )
};

export default ListingsPage;




