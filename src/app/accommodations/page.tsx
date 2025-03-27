import Infobar from '@/components/ui/infobar/infobar';
import styles from './accomodations.module.css'
import Mapbox from '@/components/ui/map/map';
import Breadcrumbs from '@/components/layout/breadcrumbs/breadcumbs';
import { Suspense } from 'react';
import { mapBoxApiKey } from '@/server_actions/mapbox';
import Listing from '@/components/ui/listing/listing';
import Link from 'next/link';


const apikey = await mapBoxApiKey();

const Accommodations = () => {

    return (
        <main>
            <Infobar />
            <div className={styles.split}>
                <section className={styles.leftSide}>
                    <Breadcrumbs links={[]}/>
                    <div className={styles.coas}>
                        <p>Long term accommodations</p>
                        <div>
                            Sort by
                        </div>
                    </div>

                    <div className={styles.banner}>
                        <p>Book now with complete peace of mind; if you find it cheaper elsewhere, we'll refund the difference.</p>
                        <p><Link href='/'>Learn more</Link></p>
                    </div>

                    <ul className={styles.listingContainer}>
                        
                        <li><Listing/></li>
                        <li><Listing/></li>
                        <li><Listing/></li>
                        <li><Listing/></li>
                    </ul>

                </section>
                <section className={styles.rightSide} >
                    <Suspense fallback={<>Loading</>}>
                        <Mapbox coordinates={[]} mpKey={apikey}/>
                   </Suspense>
                </section>
            </div>
            
        </main>
    )
};

export default Accommodations;