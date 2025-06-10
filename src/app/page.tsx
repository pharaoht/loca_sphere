import Searchbar from "@/components/ui/searchbar/searchbar";
import styles from "./page.module.css";
import Slider from "@/components/ui/slider/slides";
import listingsApi from "@/api/listings/listings.api";
import addressApi from "@/api/address/address.api";
import ApiContainer from "@/components/containers/apiContainer";
import Card from "@/components/ui/card/card";
import ListingByLocations from "@/components/wrappers/home";

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

                <ApiContainer apiReqMethod={() => addressApi.getAddressesByCoordinates('51.50839697136402', '-0.1287844755969445', 10)}>
                    <ListingByLocations location="London, England"  />
                </ApiContainer> 

                <ApiContainer apiReqMethod={() => addressApi.getAddressesByCoordinates('38.71667', '-9.13333', 10)}>
                    <ListingByLocations location="Lisbon, Portugal" />
                </ApiContainer>

                <ApiContainer apiReqMethod={() => addressApi.getAddressesByCoordinates('52.516666666', '13.383333333', 10)}>
                    <ListingByLocations location="Berlin, Germany" />
                </ApiContainer>

                <ApiContainer apiReqMethod={() => addressApi.getAddressesByCoordinates('40.416944444', '-3.703333333', 10)}>
                    <ListingByLocations location="Madrid, Spain" />
                </ApiContainer>

                <ApiContainer apiReqMethod={() => addressApi.getAddressesByCoordinates('40.416944444', '-3.703333333', 10)}>
                    <ListingByLocations location="New York, United States" />
                </ApiContainer>

                
            </div>
        </main>
    );
}
