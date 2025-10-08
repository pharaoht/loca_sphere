import styles from './listings.module.css';
import { Address } from '../map/map';
import ListingCard from '../listingcard/listingCard';

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
                       <ListingCard variant='listing' data={itm}/>
                    </li>
                ))
            }
        </ul>
    )
};

export default Listings;