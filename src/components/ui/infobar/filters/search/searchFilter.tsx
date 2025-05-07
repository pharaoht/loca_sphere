'use client'
import Dropdown from "@/components/ui/dropdown/dropdown";
import styles from '../../infobar.module.css';
import Image from 'next/image';
import { useState } from "react";
import { City } from "@/components/ui/searchbar/types";
import RenderCities from "@/components/ui/searchbar/tsx/renderCities";
import useHttp from "@/hooks/useHttp";
import useDebounce from "@/hooks/useDebounce";

const SearchFilter = () => {

    const [ cities, setCities ] = useState<City[]>([]);

    const { isLoading, error, sendRequest } = useHttp();

    const debouncer = useDebounce(500, (val) => {

        const requestConfig = {
            url: `cities?location=${val}`,
        }

        sendRequest({ requestConfig: requestConfig, callback: setCities });
    });

    
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const inputValue = event.target.value;

        if(inputValue === '') return setCities([]);

        debouncer(inputValue)

    };

    const reRoute = () => {

    };


    return (
        <Dropdown dropDownContent={
                <RenderCities 
                    cities={cities} 
                    isLoading={isLoading} 
                    error={error} 
                    customWidth={'35vw'}
                />
            } 
            onInputChange={handleOnChange} 
        >
            <div className={styles.searchLabel}>
                <Image src='/search.svg' alt='Search icon' width={22} height={22}/>
            </div>

            <input className={styles.searchInput} type='text' placeholder='Search' id='search'/>
        </Dropdown>
    )
};

export default SearchFilter;