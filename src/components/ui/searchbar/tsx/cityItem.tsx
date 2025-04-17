import { City } from '../types';
import Image from 'next/image';
import styles from './li.module.css';
import Link from 'next/link';

const CityListItem: React.FC<City> = ({ id, name, city, country, countryCode, latitude, longitude, region }) => {

    return (
        <li key={id} >
            <Link className={styles.liContainer} href={`/accommodations?long=${longitude}&lat=${latitude}&cityName=${city}&radius=10`}>
                <label className={styles.liLabel} htmlFor={`${id}`}>
                    <Image src='/building.png' alt='' height={25} width={25}/>
                </label>
                <p id={`${id}`}>
                    <span>{city}, {region}, {country}</span>
                </p>
            </Link>
        </li>
    )
};

export default CityListItem;