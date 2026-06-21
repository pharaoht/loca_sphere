import styles from './dashboardBar.module.css';

interface DashboardBarProps {

}

const DashboardBar: React.FC<DashboardBarProps> = ({ }) => {

    return (
        <nav className={styles.container}>
            <ol className={styles.linkList}>
                <li>Bookings</li>
                <li>Listings</li>
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