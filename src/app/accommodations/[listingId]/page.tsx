import Image from 'next/image';
import styles from './page.module.css';

const ListingsPage = () => {

    return (
        <div className={styles.container}>
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
                    <label>location icon</label>
                    <p>Carrer de Maó, Sant Gervasi - La Bonanova (Sarrià - Sant Gervasi), Barcelona</p>
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
            <div className={styles.split}>
                <div className={styles.leftSplit}>
                    <section className={styles.btnContainer}>
                        <button>Map</button>
                        <button>Floor Plan</button>
                        <button>Video</button>
                    </section>
                    <section className={styles.navLinks}>
                        <nav className={styles.navNav}>
                            <ul className={styles.links}>
                                <li className={styles.link}>Overview</li>
                                <li className={styles.link}>Availability</li>
                                <li className={styles.link}>Landlord</li>
                                <li className={styles.link}>Services and expenses</li>
                                <li className={styles.link}>Contract</li>
                            </ul>
                        </nav>
                    </section>
                    <section id='overview' className={styles.yourBedroom}>
                        <h3>Your Bedroom</h3>
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
                    </section>
                </div>
                <div className={styles.rightSplit}>
                    <section className={styles.bookingPrice}>
                        <form className={styles.bpInnerContainer}>
                            <header className={styles.bpHeader}>
                                <p><span>$600</span><span>/month</span></p>
                                <p>3 people</p>
                            </header>
                            <div className={styles.moveCoa}>
                                <div>
                                    <label>Move in</label>
                                    <input type='text' />
                                </div>
                                <div> {'-->'}</div>
                                <div>
                                    <label>Move Out</label>
                                    <input type='text' />
                                </div>
                                
                            </div>
                            <div>
                                <button>Select dates</button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    )
};

export default ListingsPage;