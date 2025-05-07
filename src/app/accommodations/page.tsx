import Infobar from '@/components/ui/infobar/infobar';
import styles from './accomodations.module.css'
import Mapbox from '@/components/ui/map/map';
import Breadcrumbs from '@/components/layout/breadcrumbs/breadcumbs';
import { Suspense } from 'react';
import { mapBoxApiKey } from '@/server_actions/mapbox';
import Listing from '@/components/ui/listing/listing';
import Sortby from '@/components/ui/sortby/sortby';
import Banner from '@/components/ui/banner/banner';
import { notFound } from 'next/navigation';


interface SearchParams {
    lat?: string;
    long?: string;
    cityName?: string;
}

interface PageProps {
    searchParams: Promise<SearchParams>;
}

const apikey = await mapBoxApiKey();


const Accommodations = async ({ searchParams }: PageProps) => {

    const { lat, long, cityName } = await searchParams;

    const isValidCoords = long && lat && !isNaN(Number(long)) && !isNaN(Number(lat));

    if (!isValidCoords || !cityName) return notFound();

    return (
        <main>
            <Infobar />
            <div className={styles.split}>
                <section id='leftSide' className={styles.leftSide}>
                    <Breadcrumbs links={[]}/>

                    <div className={styles.coas}>
                        <p>Long term accommodations in {cityName}</p>
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
                        <Mapbox key={cityName} coordinates={[Number(long) || 0.0, Number(lat) || 0.0]} mpKey={apikey}/>
                   </Suspense>
                </section>
            </div>
            
        </main>
    )
};

export default Accommodations;