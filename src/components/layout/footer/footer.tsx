'use client'
import Link from 'next/link';
import styles from './footer.module.css';
import Image from 'next/image';
import Section from './sections/sections';
import { usePathname } from 'next/navigation';

const Footer = () => {

    const pathName = usePathname();

    const cssHideClass = pathName === '/accommodations' || /landlord/.test(pathName) ? styles.hide : null;

    return (
        <footer className={`${styles.container} ${cssHideClass}`}>
            <ul className={styles.icons}>
                <li>
                    <a href="https://www.facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                        <Image src="/icons/facebook_icon.svg" alt="Facebook" width={40} height={40} />
                    </a>
                </li>
                <li>
                    <a href="https://www/.instagram.com" aria-label="Threads" target="_blank" rel="noopener noreferrer">
                        <Image src="/icons/threads_icon.svg" alt="Threads" width={40} height={40} />
                    </a>
                </li>
                <li>
                    <a href="https://www/.tiktok.com" aria-label="Tiktok" target="_blank" rel="noopener noreferrer">
                        <Image src="/icons/tiktok_icon.svg" alt="Tiktok" width={40} height={40} />
                    </a>
                </li>
                <li>
                    <a href="https://www/.snapchat.com" aria-label="SnapChat" target="_blank" rel="noopener noreferrer">
                        <Image src="/icons/snapchat_icon.svg" alt="Instagram" width={40} height={40} />
                    </a>
                </li>
            </ul>

            <hr className={styles.hr}></hr>

            <div className={styles.info}>

                <Section 
                    sectionTitle='LocaSphere'
                    sectionData={[
                        { href: '/', text: 'About us'},
                        { href: '/', text: 'How it works'},
                        { href: '/', text: 'Partners'},
                        { href: '/', text: 'Newsroom'},
                        { href: '/', text: 'Guides'},
                        
                    ]}
                />

                <Section 
                    sectionTitle='Tenants'
                    sectionData={[
                        { href: '/', text: 'Book with an agent'},
                        { href: '/', text: 'Invite friends'},
                        { href: '/', text: 'Stories'},
                        { href: '/', text: 'Group Booking'},
                    ]}
                />

                <Section 
                    sectionTitle='Landlords'
                    sectionData={[
                        { href: '/', text: 'How it works'},
                        { href: '/', text: 'Start listing'},
                        { href: '/', text: 'List your place'},
                    ]}
                />

                <Section 
                    sectionTitle='Support'
                    sectionData={[
                        { href: '/', text: 'Cancellation policies'},
                        { href: '/', text: 'Help'},
                        { href: '/', text: 'Talk to us'},
                    ]}
                />

                <Section 
                    sectionTitle='Join us'
                    sectionData={[
                        { href: '/', text: 'Become an Affiliate'},
                        { href: '/', text: 'Become an Ambassador'},
                        { href: '/', text: 'B2B Partnerships'},
                        { href: '/', text: 'Careers'},
                    ]}
                />

            </div>

            <hr className={styles.hr}></hr>

            <div className={styles.privacy_section}>
                <div className={styles.logo}>
                    <Image src="/logo2.avif" alt="Logo" width={50} height={50} priority />
                    <p> © 2025 LocaSphere, All rights reserved</p>
                </div>
                <ul className={`${styles.link_group} ${styles.show}`}>
                    <li><Link className={styles.link} href='/'>Terms</Link></li>
                    <li><Link className={styles.link}href='/'>Privacy</Link></li>
                    <li><Link className={styles.link}href='/'>Consent Preferences</Link></li>
                </ul>
            </div>

        </footer>
    )
};

export default Footer;