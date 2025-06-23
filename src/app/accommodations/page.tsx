import Infobar from '@/components/ui/infobar/infobar';
import styles from './accomodations.module.css'
import Mapbox from '@/components/ui/map/map';
import Breadcrumbs from '@/components/layout/breadcrumbs/breadcumbs';
import { Suspense } from 'react';
import { mapBoxApiKey } from '@/server_actions/mapbox';
import Sortby from '@/components/ui/sortby/sortby';
import Banner from '@/components/ui/banner/banner';
import { notFound } from 'next/navigation';
import Listings from '@/components/ui/listings/listings';
import addressApi from '@/api/address/address.api';


interface SearchParams {
    lat?: string;
    long?: string;
    cityName?: string;
}

interface PageProps {
    searchParams: Promise<SearchParams>;
}

const apikey = await mapBoxApiKey();

const getAddressByCoordinates = async (latitude: string, longitude: string) => {
    
    const ls = await addressApi.getAddressesByCoordinates(latitude, longitude, 10);

    return ls
};

const Accommodations = async ({ searchParams }: PageProps) => {

    const { lat, long, cityName } = await searchParams;

    const isValidCoords = long && lat && !isNaN(Number(long)) && !isNaN(Number(lat));

    if (!isValidCoords || !cityName) return notFound();

    const listings = await getAddressByCoordinates(lat, long);

    return (
        <main>
            <Infobar />
            <div className={styles.split}>
                <section id='leftSide' className={styles.leftSide}>
                    <Breadcrumbs links={[]}/>

                    <div className={styles.coas}>
                        <p>Long term accommodations in {cityName}</p>
                        <div className={styles.mapHide}>
                            <Sortby length={listings?.length || 0}/>
                        </div>
                        
                        
                    </div>
                    <Banner 
                        textInformation='Book now with complete peace of mind; if you find it cheaper elsewhere, we will refund the difference.'
                        backgroundColor='rgb(255, 102, 178)'
                        linkLabel='Learn more'
                        link='/'
                    />
                    <Suspense fallback={<>Loading</>}>
                        <Listings listings={listings || []} />
                    </Suspense>

                </section>
                <section id='rightSide' className={`${styles.rightSide} ${styles.mapHide}`}>
                    <Suspense fallback={<>Loading</>}>
                        <Mapbox key={cityName} listings={listings || []} coordinates={[Number(long) || 0.0, Number(lat) || 0.0]} mpKey={apikey}/>
                   </Suspense>
                </section>
            </div>
            
        </main>
    )
};

export default Accommodations;