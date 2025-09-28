import Searchbar from "@/components/ui/searchbar/searchbar";
import styles from "./page.module.css";
import addressApi from "@/api/address/address.api";
import ListingByLocations, { ListingLocationSkeleton } from "@/components/wrappers/home";
import React, { Suspense } from "react";
import { cookies } from "next/headers";

const LocationRender: React.FC<{ lat: string, long: string, radius: number, location: string }> = async ({ lat, long, radius, location }) => {

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const listings = await addressApi.getAddressesByCoordinates({ lat , long, radius, limit: 10 });

    return (
        <ListingByLocations location={location} apiData={listings}  />
    )
}

const getCookies = async () => {

    const cookieStore = await cookies();

    const refreshToken = cookieStore.get('refresh_token');

    return refreshToken?.value;
}

export default async function Home() {

    const tk = await getCookies();

    console.log(tk)
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
                    <LocationRender lat='51.508396' long='-0.12878' radius={10} location='London, England'/> 
                </Suspense>

                <Suspense fallback={<ListingLocationSkeleton/>}>
                    <LocationRender lat='38.71667' long='-9.13333' radius={10} location='Lisbon, Portugal'/> 
                </Suspense>

                <Suspense fallback={<ListingLocationSkeleton/>}>
                    <LocationRender lat='52.51666' long='13.383333' radius={10} location='Berlin, Germany'/> 
                </Suspense>

                <Suspense fallback={<ListingLocationSkeleton/>}>
                    <LocationRender lat='52.51666' long='13.383333' radius={10} location='Madrid, Spain'/> 
                </Suspense>

                <Suspense fallback={<ListingLocationSkeleton/>}>
                    <LocationRender lat='52.51666' long='13.383333' radius={10} location='New York, United States'/> 
                </Suspense>
                
            </div>
        </main>
    );
}
