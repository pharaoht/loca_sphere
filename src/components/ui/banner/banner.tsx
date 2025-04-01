import Link from 'next/link';
import styles from './bannder.module.css';

interface BannerProps { 
    textInformation: string;
    linkLabel: string;
    backgroundColor: string;
    link: string
}

const Banner: React.FC<BannerProps> = ({ textInformation, linkLabel, backgroundColor, link}) => {
    
    return (
        <div 
            className={styles.banner} 
            style={{background: `${backgroundColor || ''}`}}
        >
            <p>{textInformation}</p>
            <p>
                <Link 
                    style={{color:`${backgroundColor || ''}`}} 
                    href={link}
                >
                    {linkLabel}
                </Link>
            </p>
        </div>
    )
};

export default Banner;
