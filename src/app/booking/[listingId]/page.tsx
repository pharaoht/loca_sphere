interface ListParams {
    listingId: string
    moveIn: string;
    moveOut: string;
    people: number;
};

interface PageProps {
    params: Promise<ListParams>;
}

const getListingDetails = () => {

}

const getUserDetails = () => {

};


const Booking: React.FC<PageProps> = async ({ params }) => {

    const { listingId } = await params;

    return (
        <div>

        </div>
    )
};

export default Booking;