import addressApi from '@/api/address/address.api';
import Listing from '../listing/listing';
import styles from './listings.module.css';
import { Address } from '../map/map';

interface Props {
    longitude: number,
    latitude: number,
}

const getListings = async (longitude: number, latitude: number) => {

    const ls = await addressApi.getAddressesByCoordinates(latitude, longitude, 10);

    return ls
}

const Listings: React.FC<Props> = async ({ longitude, latitude }) => {

    const listings : Address[] = await getListings(longitude, latitude);

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