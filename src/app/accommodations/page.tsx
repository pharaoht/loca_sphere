import Infobar from '@/components/ui/infobar/infobar';
import styles from './accomodations.module.css'
import Mapbox from '@/components/ui/map/map';
import Breadcrumbs from '@/components/layout/breadcrumbs/breadcumbs';
import { Suspense } from 'react';
import { mapBoxApiKey } from '@/server_actions/mapbox';


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
                        Banner
                    </div>

                    <div className={styles.listingContainer}>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
                    </div>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
                        <div>hi</div>
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