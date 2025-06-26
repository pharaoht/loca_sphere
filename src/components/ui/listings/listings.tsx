import Listing from '../listing/listing';
import styles from './listings.module.css';
import { Address } from '../map/map';

interface Props {
    listings: Array<Address>
}

const Listings: React.FC<Props> = async ({ listings }) => {

    if(!listings || listings.length === 0){
        return (
            <ul><li>No listings found</li></ul>
        )
    }


    return (
        <ul className={styles.listingContainer}>
            {
                listings.map((itm, idx) => (
                    <li key={itm.id}>
                        <Listing
                            listingInfo={itm.listing}
                        />
                    </li>
                ))
            }
        </ul>
    )
};

export default Listings;