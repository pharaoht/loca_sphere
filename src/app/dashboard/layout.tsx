import DashboardBar from '@/components/layout/dashboard-bar/dashboardBar';
import styles from './dashboard.module.css';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

//URL-driven State Management (or URL-as-Single-Source-of-Truth).

const Dashboard = async ({ children }: {children: React.ReactNode}) => {

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;

    if(!refreshToken){
        redirect('/login')
    }

    return (
        <div className={styles.dashBoardWrapper}>
            <DashboardBar/>
            <main>
                {children}
            </main>
        </div>

    )
};

export default Dashboard;