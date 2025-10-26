'use client'
import Link from 'next/link';
import styles from './navbar.module.css';
import Image from 'next/image';
import Dropdown from '@/components/ui/dropdown/dropdown';
import { usePathname } from 'next/navigation';
import { useAuthContext } from '@/context/auth.context';



const MenuBtnLinks: React.FC<{id: string}> = ({ id, }) => (
    <ul className={styles.menuDropDown}>
        <li>
            <Link href={`/dashboard`}>
                Dashboard
            </Link>
        </li>
        <hr></hr>
        <li>Settings</li>
        <li>How it works</li>
        <li>Help centre</li>
        <hr></hr>
        <li>Logout</li>
    </ul>
)

const Navbar = () => {

    const pathName = usePathname();

    const { userInfo, token } = useAuthContext();

    const cssHideClass = pathName === '/accommodations' ? styles.noStick : styles.stick;


    return (
        <nav id='navbar' className={`${styles.container} ${cssHideClass}`}>
            <div className={styles.logo}>
                <Link href='/'>
                    <Image className={styles.mainLogo} src="/logo_full.avif" alt="Logo" priority height={60} width={175} />
                    <Image className={styles.mobileLogo} src="/logo2.avif" alt="Logo" priority height={60} width={60} />
                </Link>
            </div>

            
            <ul className={styles.details}>
                <li><Link href='/'>Contact us</Link></li>
                <li><Link href='/landlord'>List your property</Link></li>
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
                </li> 

                {
                    userInfo && userInfo.hasOwnProperty('id') ? 
                        <li>Welcome, {userInfo?.displayName}</li> 
                    :
                    <>
                        <li className={styles.refBtn}>
                            <Link href='/'className={styles.button}>
                                Sign up
                            </Link>
                        </li>
                        <li className={styles.refBtn}>
                            <Link href='/login' className={styles.button}>
                                Login
                            </Link>
                        </li>
                    </>
                }


                <li>
                    <Dropdown startFromRightSide={true} dropDownContent={<MenuBtnLinks id={userInfo?.id || ''}/>}>
                        <button
                            className={styles.button} 
                        >
                            <Image src='/menu.svg' height={20} width={20} alt='menu_icon' />
                        </button>
                    </Dropdown>
                </li>


            </ul>
        </nav>
    )
};

export default Navbar;