'use client'
import Link from 'next/link';
import styles from '../footer.module.css';
import { useEffect, useState } from 'react';

type SectionProps = {
    href: string
    text: string
}

interface SectionComponentProps {
    sectionData: Array<SectionProps>
    sectionTitle: string
}

const Section = ({ sectionData, sectionTitle }: SectionComponentProps) => {

    const [ screenSize, setScreenSize ] = useState<number>(0);

    const [ toggle, setToggle ] = useState<boolean>(true);

    const ismobileScreen = screenSize >= 800;

    const ulToggleClass = toggle ? styles.show : '';

    const renderLinksFromArray = () => (
        sectionData.map((itm, idx) => (
            <li key={idx}>
                <Link className={styles.link} href={itm.href}>{itm.text}</Link>
            </li>
        ))
    );

    const debounce = (callback: (...args: any) => void, delay: number = 500) => {

        let timerId:number;

        return (...args: any) => {

            if(timerId) {
                clearTimeout(timerId)
            }

            timerId = window.setTimeout(() => {
                callback(...args)
            }, delay)
        }
    }

    useEffect(() => {

        const handleResize = () => {
            setScreenSize(window.innerWidth);
            setToggle(window.innerWidth < 800 ? false : true)
        };

        const rdb = debounce(handleResize, 500);

        rdb();
    
        window.addEventListener("resize", rdb);
    
        return () => {
            window.removeEventListener("resize", rdb);
        };
    
    }, [])

    return (
        <section>
            <div className={styles.title_div}>
                <h2>{sectionTitle}</h2>
                <button 
                    className={`${ismobileScreen ? styles.hide_button : ''} ${styles.carrotBtn}`}
                    onClick={() => setToggle(prev => !prev)}
                    aria-expanded={ismobileScreen} 
                    aria-label={`Toggle ${sectionTitle} visibilty`}
                >
                    {toggle ? '▲' : '▼'}
                </button>
            </div>
            <ul className={`${styles.link_group} ${ulToggleClass}`}>
                {
                    renderLinksFromArray()
                }
            </ul>
            
        </section>
    )
};

export default Section;