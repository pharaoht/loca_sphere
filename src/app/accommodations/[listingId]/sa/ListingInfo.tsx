import listingsApi from "@/api/listings/listings.api";
import Image from 'next/image';
import styles from '../page.module.css';


export default async function ListingInfo({ id }: { id: string}){

    const w = await new Promise((resolve) => setTimeout(resolve, 2000));

    const data = await listingsApi.httpGetListingbyId(id);

    if(!data){

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

    const { address, title, placeAreaSqM, bathrooms, bedrooms, listingType } = data;

    const { streetAddress, city, stateOrProvince, countryCode} = address;

    const { name } = listingType;

    return (
        <div className={styles.leftSide}>
            <h2>{title}</h2>
            <ul className={styles.infoRoom}>
                <li>{bedrooms} bedroom(s) </li>
                <li>•</li>
                <li>{name}</li>
                <li>•</li>
                <li>{bathrooms} bathrooms</li>
                <li>•</li>
                <li>1 person</li>
                <li>•</li>
                <li>{placeAreaSqM} m²</li>
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
            </ul>

            <div className={styles.location}>
                <div className={styles.icon}></div>
                <div className={styles.text}></div>
            </div>
        </div>
    );
}