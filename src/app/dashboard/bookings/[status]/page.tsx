import { headers } from "next/headers";
import styles from './dashboard.bookings.module.css';
import Link from "next/link";
import bookingApi from "@/api/booking/booking.api";

interface PageProps {
    params: Promise<{ status: string }>
}

const getBookingData = async (token: string, status: string) => {

    return
    const data = await bookingApi.httpGetHostBookings(token, status);

    return data;
}

//router.refresh()

const BookingStatusPage = async ({ params }: PageProps) => {

    const header = (await headers()).get('access-token') || '';

    const { status } = (await params)

    const bookingData = await getBookingData(header, status);
    //booking side bar
    //booking table

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <nav>
                    <ul>
                        <li><Link href='/dashboard/bookings/requests'>Requests</Link></li>
                        <li><Link href='/dashboard/bookings/confirmed'>Confirmed</Link></li>
                        <li><Link href='/dashboard/bookings/cancelled'>Cancelled</Link></li>
                        <li><Link href='/dashboard/bookings/declined'>Declined</Link></li>
                        <li><Link href='/dashboard/bookings/ongoing'>Ongoing</Link></li>
                    </ul>
                </nav>
            </aside>
            <div className={styles.tableSide}>
                booking table
                <table>
                    <caption>Bookings</caption>
                    <thead>
                        <tr>
                            <th>Guest</th>
                            <th>Listing</th>
                            <th>Dates</th>
                            <th>Nights</th>
                            <th>Guests</th>
                            <th>Requested</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}
//name, date, 
export default BookingStatusPage;