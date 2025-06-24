import Searchbar from "@/components/ui/searchbar/searchbar";
import styles from "./page.module.css";
import addressApi from "@/api/address/address.api";
import ApiContainer from "@/components/containers/apiContainer";

import ListingByLocations, { ListingLocationSkeleton } from "@/components/wrappers/home";
import { Suspense } from "react";

export default async function Home() {

    return (
        <main className={styles.main}>
            <header>
                <h1>The largest global platform for <span>furnished rentals</span></h1>
            </header>
            <div className={`${styles.top} ${styles.stickywrapper}`}>
                <Searchbar/>

            </div>
            <h3>Best price guaranteed: if you find it cheaper elsewhere, we’ll refund the difference</h3>
            <div className={styles.listings_grid}>

                <Suspense fallback={<ListingLocationSkeleton/>}>
                    <ApiContainer apiReqMethod={() => addressApi.getAddressesByCoordinates({lat: '51.50839697136402', long: '-0.1287844755969445', radius: 10})}>
                        <ListingByLocations location="London, England"  />
                    </ApiContainer> 
                </Suspense>

                <ApiContainer apiReqMethod={() => addressApi.getAddressesByCoordinates({lat: '38.71667', long: '-9.13333', radius: 10})}>
                    <ListingByLocations location="Lisbon, Portugal" />
                </ApiContainer>

                <ApiContainer apiReqMethod={() => addressApi.getAddressesByCoordinates({lat:'52.516666666', long: '13.383333333', radius:10})}>
                    <ListingByLocations location="Berlin, Germany" />
                </ApiContainer>

                <ApiContainer apiReqMethod={() => addressApi.getAddressesByCoordinates({lat:'52.516666666', long: '13.383333333', radius:10})}>
                    <ListingByLocations location="Madrid, Spain" />
                </ApiContainer>

                <ApiContainer apiReqMethod={() => addressApi.getAddressesByCoordinates({lat:'52.516666666', long: '13.383333333', radius:10})}>
                    <ListingByLocations location="New York, United States" />
                </ApiContainer>

                
            </div>
        </main>
    );
}
