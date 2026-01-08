
interface ComponentProps {
    images: Array<{ url: string }> | undefined;
    isChecked: Boolean;
    isVerified: Boolean;
    streetAddress: String;
    city: String;
    stateOrProvince: String;
    moveIn: String;
    moveOut: String;
    symbol: String;
    monthlyRent: Number;
    adminFee: Number;
    dueAtBooking: Number;
    placeAreaSqM: String;
    bedrooms: String;
    amenity: Array<any>;
};

const BookingDetailWrapper: React.FC<ComponentProps> = (
    {
        images, isChecked, isVerified, streetAddress, city, stateOrProvince,
        monthlyRent, moveIn, moveOut, dueAtBooking, adminFee, amenity, bedrooms, 
        symbol, placeAreaSqM, 
    }
) => {

    const applyPromoCodeHandler = () => {};
    

    return (
        <>
        </>
    )
};

export default BookingDetailWrapper;