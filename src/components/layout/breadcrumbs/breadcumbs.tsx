import Link from "next/link";
import styles from './breadcrumbs.module.css';

interface BreadcumbProps {
    links: Array<{}>
}

const Breadcrumbs: React.FC<BreadcumbProps> = ({ links }) => {

    return (
        <nav aria-label='breadcrumb'>
            <ol className={styles.container}>
                <li><Link href='/'>LocaSphere</Link></li>
                <li> {'>'}</li>
                <li><Link href='/'>Accommodations</Link></li>
            </ol>
        </nav>
    )
};

export default Breadcrumbs;