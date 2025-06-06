import Searchbar from "@/components/ui/searchbar/searchbar";
import styles from "./page.module.css";
import Slider from "@/components/ui/slider/slides";
import listingsApi from "@/api/listings/listings.api";
import addressApi from "@/api/address/address.api";

export default async function Home() {

    const londonListings = await addressApi.getAddressesByCoordinates(1.23,2.3,0);

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
                <Slider title="London, England" listings={['hi', 'hi', 'hi', 'hi', 'hi', 'hi', 'hi', 'hi', 'hi',]}/>
                <Slider title="Lisbon, Portugal" listings={['hi', 'hi', 'hi', 'hi', 'hi', 'hi', 'hi', 'hi', 'hi',]}/>
            </div>
        </main>
    );
}
