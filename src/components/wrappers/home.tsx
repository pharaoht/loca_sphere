import Card, { CardLoadingSkeleton } from "../ui/card/card";
import { Address } from "../ui/map/map";
import Slider from "../ui/slider/slides"

interface Props {
    apiData?: Address[] | null
    location: string
}
const ListingByLocations: React.FC<Props> = ({ apiData, location }) => {
    
    if( apiData?.length === 0 ){

        return (
            <Slider title={location}>
                No places found...
            </Slider>
        )
    }

    return (
        <Slider title={location}>
            {
                apiData?.map((listing) => (
                    <li key={listing.id}>
                        <Card
                            longitude={listing.longitude}
                            latitude={listing.latitude}
                            price={listing.listing.monthlyRent}
                            isVerified={listing.listing.isChecked}
                            beds={listing.listing.bedrooms}
                            city={listing.city}
                            currency={listing.listing.currency.symbol}
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
        <Slider title={''}>
            {
                l.map((itm, idx) => (
                    <CardLoadingSkeleton key={idx} />
                ))
            }
        </Slider>
    )
}

export default ListingByLocations;