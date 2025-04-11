import { City } from '../types';
import Image from 'next/image';
import styles from './li.module.css';

const CityListItem: React.FC<City> = ({ id, name, city, country, countryCode, latitude, longitude, }) => {

    const handler = () => {

    };

    return (
        <li key={id} className={styles.liContainer}>
            <label className={styles.liLabel} htmlFor={`${id}`}>
                <Image src='/building.png' alt='' height={25} width={25}/>
            </label>
            <p id={`${id}`}>
                <span>{city}, {country}</span>
            </p>
        </li>
    )
};

export default CityListItem;