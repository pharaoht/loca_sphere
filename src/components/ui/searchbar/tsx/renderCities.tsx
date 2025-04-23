import { City } from '../types';
import CityListItem from './cityItem';
import styles from './li.module.css';

interface RenderCitiesProps {
    isLoading: boolean
    error?: string | null
    cities: Array<City>
    customWidth?: string | null
};

const RenderCities: React.FC<RenderCitiesProps> = ({ cities = [],  isLoading, error, customWidth }) => {

    const render = () => {

        return (
            cities.map((itm, idx) => (
                <CityListItem 
                    city={itm.city} 
                    name={itm.name}
                    latitude={itm.latitude}
                    longitude={itm.longitude}
                    country={itm.country} 
                    countryCode={itm.countryCode} 
                    region={itm.region}
                    id={itm.id}
                    key={itm.id}
                />
            ))
        )
    }
 
    return (
        <ul className={styles.cityContainer} style={ customWidth ? { minWidth: `${customWidth}`} : {}}>
            <li className={styles.header}>Cities</li>
            { error && <li className={styles.liContainer}> {error} </li> }
            { isLoading && <li className={styles.liContainer}>fetching...</li>}
            { !error && !isLoading && cities?.length > 0 && render() }
            { !error && !isLoading && cities?.length === 0 && <li className={styles.liContainer}>No cities found</li>} 

        </ul>
    )
};

export default RenderCities;