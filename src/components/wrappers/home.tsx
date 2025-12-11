import { CardLoadingSkeleton } from "../ui/card/card";
import ListingCard from "../ui/listingcard/listingCard";
import { Address } from "../ui/map/map";
import Slider from "../ui/slider/slides"

interface Props {
    apiData?: Address[] | null | any
    location: string
}
const ListingByLocations: React.FC<Props> = ({ apiData, location }) => {

    if( apiData?.length === 0){

        return (
            <Slider title={location}>
                No places found...
            </Slider>
        )
    }

    return (
        <Slider title={location}>
            {
                Array.isArray(apiData) && apiData?.map((listing) => (
                    <li key={listing.id}>
                        <ListingCard
                            variant="card"
                            data={listing}
                        />
                    </li>
                ))
            }
        </Slider>
    )
};

export const ListingLocationSkeleton = () => {

    const l = [null, null, null, null, null, null];

    return (
        <Slider title={'Fetching...'}>
            {
                l.map((itm, idx) => (
                    <CardLoadingSkeleton key={idx} />
                ))
            }
        </Slider>
    )
}

export default ListingByLocations;