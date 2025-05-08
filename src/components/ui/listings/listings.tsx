import addressApi from '@/api/address/address.api';
import Listing from '../listing/listing';
import styles from './listings.module.css';

interface Props {
    longitude: number,
    latitude: number,
}

export type List = {
    id: string;
    listingId: string;
    latitude: string;
    longitude: string;
    distance: number;
    city: string;
    stateOrProvince: string;
    postalCode: string;
    countryCode: string;
    streetAddress: string;
    houseNumber: string;
    extraInfo: string;
    monthlyRent: number;
    currency: string;
    title: string;
}

const getListings = async (longitude: number, latitude: number) => {

    const ls = await addressApi.getAddressesByCoordinates(latitude, longitude, 10);

    return ls
}

const Listings: React.FC<Props> = async ({ longitude, latitude }) => {

    const listings : List[] = await getListings(longitude, latitude);

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
                            listingInfo={itm}
                        />
                    </li>
                ))
            }
        </ul>
    )
};

export default Listings;