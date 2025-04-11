'use client'
import Image from 'next/image';
import styles from './searchbar.module.css';
import Dropdown from '../dropdown/dropdown';
import useDebounce from '@/hooks/useDebounce';
import { saGetCities } from '@/server_actions/cities';
import { Suspense, useState } from 'react';
import { City } from './types';
import CityListItem from './tsx/cityItem';
import citiesApi from '@/api/cities/cities.api';

function getCities(){

    const [ cities, setCities ] = useState<City[]>([]);

    const fetchCities = async (searchTerm: string) => {
       
        const data: City[] = await saGetCities(searchTerm);

        setCities(data);
    }

    const RenderCities = () => (
        <ul className={styles.cityContainer}>
            <li className={styles.header}>Cities</li>
            {   cities?.length > 0 &&
                cities.map(itm => (
                    <CityListItem 
                        city={itm.city} 
                        name={itm.name}
                        latitude={itm.latitude}
                        longitude={itm.longitude}
                        country={itm.country} 
                        countryCode={itm.countryCode} 
                        id={itm.id}
                        key={itm.id}
                    />
                ))
            }
        </ul>
    )


    return {
        RenderCities, 
        fetchCities
    }
};


const Searchbar = () => {

    const { RenderCities, fetchCities } = getCities();

    const debouncer = useDebounce(500, fetchCities);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const inputValue = event.target.value;

        debouncer(inputValue)

    };


    return (
        <form
            role='search'
            aria-label='Site Search'
            className={styles.container}
        >
            <label className={styles.inputLabel} htmlFor='destination-search' >
                <div className={styles.imageWrapper}>
                    <Image className={styles.image} src='/search.svg' alt='Search icon' fill/>
                </div>
            </label>

            <Dropdown dropDownContent={<RenderCities/>} onInputChange={handleOnChange}>
                <input             
                    id='destination-search' 
                    name='destination' 
                    type='text' 
                    placeholder='Search your destination' 
                    aria-label='Search for your destination' />
            </Dropdown>
            <button type='submit' aria-label='Sumbit Search for your destination'>Search</button>
        </form>
    )
};

export default Searchbar;