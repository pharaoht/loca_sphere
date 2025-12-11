import styles from './listings.module.css';
import { Address } from '../map/map';
import ListingCard from '../listingcard/listingCard';

interface Props {
    listings: Array<Address> | any
}

const Listings: React.FC<Props> = async ({ listings }) => {
    
    if (!listings || listings.length === 0){
        return (
            <ul>
                <li>No listings found.</li>
                <li>"{listings?.message}"" status code {listings?.statusCode}</li>
            </ul>
        )
    }


    return (
        <ul className={styles.listingContainer}>
            {
                Array.isArray(listings) ? listings.map((itm, idx) => (
                    <li key={itm.id}>
                       <ListingCard variant='listing' data={itm}/>
                    </li>
                ))
                :
                null
            }
        </ul>
    )
};

export default Listings;