'use client'
import Link from 'next/link';
import styles from './dashboardBar.module.css';
import { usePathname } from 'next/navigation';



interface DashboardBarProps {

}

const DashboardBar: React.FC<DashboardBarProps> = ({ }) => {

    const pathname = usePathname();

    const isActive = (path: string) => pathname.startsWith(path);

    return (
        <nav className={styles.container}>
            <ol className={styles.linkList}>
                <li><Link href='/dashboard/bookings'>Bookings</Link></li>
                <li><Link href='/dashboard/listings'>Listings</Link></li>
                <li>Reviews</li>
                <li>Accounts</li>
                <li>Insights</li>
                <li>Messages</li>
                <li>New Listing</li>
            </ol>
        </nav>
    )
};

export default DashboardBar;