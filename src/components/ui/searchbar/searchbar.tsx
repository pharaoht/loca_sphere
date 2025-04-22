'use client'
import Image from 'next/image';
import styles from './searchbar.module.css';
import Dropdown from '../dropdown/dropdown';
import useDebounce from '@/hooks/useDebounce';
import useHttp from '@/hooks/useHttp';
import { useState } from 'react';
import RenderCities from './tsx/renderCities';


const Searchbar = () => {

    const [ cities, setCities ] = useState([]);

    const { isLoading, error, sendRequest } = useHttp();

    const debouncer = useDebounce(500, async (val) => {

        const requestConfig = {
            url: `aities?location=${val}`,
        }

    
        await sendRequest({ requestConfig: requestConfig, callback: setCities });

    });

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const inputValue = event.target.value;

        if(inputValue === '') return setCities([])

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

            <Dropdown dropDownContent={<RenderCities cities={cities} isLoading={isLoading} error={error}/>} onInputChange={handleOnChange}>
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