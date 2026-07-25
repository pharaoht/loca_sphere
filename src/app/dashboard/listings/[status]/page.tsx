import Link from 'next/link';
import styles from '../../bookings/[status]/dashboard.bookings.module.css'

interface PageProps {
    params: Promise<{ status: string }>
}

const getListingData = () => {};

const ListingStatusPage = async ({ params }: PageProps) => {

    const { status } = (await params);

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <nav>
                    <ul>
                        <li><Link href='/dashboard/listings/published'>Published</Link></li>
                        <li><Link href='/dashboard/listings/ongoing'>Ongoing</Link></li>
                        <li><Link href='/dashboard/listings/unpublished'>Unpublished</Link></li>
                    </ul>
                </nav>
            </aside>
            <div>
                {status}
            </div>
        </div>
    )
}

export default ListingStatusPage;