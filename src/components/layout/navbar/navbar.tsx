import Link from 'next/link';
import styles from './navbar.module.css';
import Image from 'next/image';

const Navbar = () => {

    return (
        <nav className={styles.container}>
            <div className={styles.logo}>
                <Link href='/'>
                    <Image src="/logo_full.avif" alt="Logo" priority height={60} width={175} />
                </Link>
            </div>

            
            <ul className={styles.details}>
                <li><Link href='/'>Contact us</Link></li>
                <li><Link href='/'>List your property</Link></li>
            </ul>
        

            <ul className={styles.coa}>
                <li className={styles.languageSelector}>
                    <button 
                        className={styles.button} 
                        aria-label="Select language" 
                        aria-haspopup="listbox" 
                        aria-expanded="false"
                    >
                        ENG <span className={styles.icon} aria-hidden="true">▼</span>
                    </button>
                    {/* <ul className={styles.dropdown} role="listbox">
                        
                    </ul> */}
                </li> 

                <li className={styles.refBtn}>
                    <Link href='/'className={styles.button}>
                        Sign up
                    </Link>
                </li>
                <li className={styles.refBtn}>
                    <Link href='/' className={styles.button}>
                        Login
                    </Link>
                </li>

                <li>
                    <button
                        className={styles.button} 
                    >
                        <Image src='/menu.svg' height={20} width={20} alt='menu_icon' />
                    </button>
                </li>


            </ul>
        </nav>
    )
};

export default Navbar;