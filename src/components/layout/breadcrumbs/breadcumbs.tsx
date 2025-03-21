import Link from "next/link";


interface BreadcumbProps {
    links: Array<{}>
}

const Breadcrumbs: React.FC<BreadcumbProps> = ({ links }) => {

    return (
        <nav aria-label='breadcrumb'>
            <ol>
                <li><Link href='/'>LocaSphere</Link></li>
                <li><Link href='/'>Accommodations</Link></li>
            </ol>
        </nav>
    )
};

export default Breadcrumbs;