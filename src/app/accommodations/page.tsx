import Infobar from '@/components/ui/infobar/infobar';
import styles from './accomodations.module.css'
import Mapbox from '@/components/ui/map/map';
import Breadcrumbs from '@/components/layout/breadcrumbs/breadcumbs';
import { Suspense } from 'react';
import { mapBoxApiKey } from '@/server_actions/mapbox';
import Listing from '@/components/ui/listing/listing';
import Sortby from '@/components/ui/sortby/sortby';
import Banner from '@/components/ui/banner/banner';

const apikey = await mapBoxApiKey();

const Accommodations = () => {




    return (
        <main>
            <Infobar />
            <div className={styles.split}>
                <section id='leftSide' className={styles.leftSide}>
                    <Breadcrumbs links={[]}/>

                    <div className={styles.coas}>
                        <p>Long term accommodations</p>
                        <div className={styles.mapHide}>
                            <Sortby/>
                        </div>
                        
                        
                    </div>
                    <Banner 
                        textInformation='Book now with complete peace of mind; if you find it cheaper elsewhere, we will refund the difference.'
                        backgroundColor='rgb(255, 102, 178)'
                        linkLabel='Learn more'
                        link='/'
                    />

                    <ul className={styles.listingContainer}>
                        
                        <li><Listing/></li>
                        <li><Listing/></li>
                        <li><Listing/></li>
                        <li><Listing/></li>
                    </ul>

                </section>
                <section id='rightSide' className={`${styles.rightSide} ${styles.mapHide}`}>
                    <Suspense fallback={<>Loading</>}>
                        <Mapbox coordinates={[]} mpKey={apikey}/>
                   </Suspense>
                </section>
            </div>
            
        </main>
    )
};

export default Accommodations;