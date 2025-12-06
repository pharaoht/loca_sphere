import Image from 'next/image';
import styles from './li.module.css';

interface Props {
    address: {
        streetAddress: string, 
        city: string, 
        stateOrProvince: string, 
        countryCode: string
    },
    title: string, 
    placeAreaSqM: string, 
    roomAreaSqM: string,
    bathrooms: string, 
    bedrooms: string, 
    peopleAllowed: string,
    listingType: {
        name: string
    } 
};

export default async function ListingInfo({ address, title, placeAreaSqM, bathrooms, bedrooms, peopleAllowed, listingType, roomAreaSqM }: Props){

    if(!address){

        return (
            <div className={styles.leftSide}>
                <h2>No data</h2>
                <ul className={styles.infoRoom}>
                    <li>N/a </li>
                </ul>
                <div className={styles.location}>
                    <Image src='/location.png' alt='location icon' height={30} width={30} />
                    <span>N/a</span>
                </div>
            </div>
        )
    }

    const { streetAddress, city, stateOrProvince, countryCode} = address;

    const { name } = listingType;

    return (
        <div className={styles.leftSide}>
            <h2>{title}</h2>
            <ul className={styles.infoRoom}>
                <li>{bedrooms} Bedroom(s) </li>
                <li>•</li>
                <li>{name}</li>
                <li>•</li>
                <li>{bathrooms} Bathrooms</li>
                <li>•</li>
                <li>Up to {peopleAllowed} person(s)</li>
                <li>•</li>
                <li>Room {roomAreaSqM} m²</li>
                <li>•</li>
                <li>Property {placeAreaSqM} m²</li>
            </ul>
            <div className={styles.location}>
                <Image src='/location.png' alt='location icon' height={30} width={30} />
                <span>{streetAddress}, {city} - {stateOrProvince}, {countryCode}</span>
            </div>
        </div>
    )
};

export function ListingInfoSkeleton() {
    return (
        <div className={styles.leftSide}>
            <div className={styles.title}></div>

            <ul className={styles.infoRoom}>
                <li className={styles.chip}></li>
                <li>•</li>
                <li className={styles.chip}></li>
                <li>•</li>
                <li className={styles.chip}></li>
                <li>•</li>
                <li className={styles.chip}></li>
                <li>•</li>
                <li className={styles.chip}></li>
                <li>•</li>
                <li className={styles.chip}></li>
                <li>•</li>
                <li className={styles.chip}></li>
            </ul>

            <div className={styles.location}>
                <div className={styles.icon}></div>
                <div className={styles.text}></div>
            </div>
        </div>
    );
}