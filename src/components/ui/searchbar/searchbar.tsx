import Image from 'next/image';
import styles from './searchbar.module.css';
import Dropdown from '../dropdown/dropdown';

const Searchbar = () => {

    return (
        <form
            role='search'
            aria-label='Site Search'
            className={styles.container}
        >
            <label htmlFor='destination-search'>
                <Image src='/search.svg' alt='Search icon' width={35} height={35}/>
            </label>
            <Dropdown dropDownContent={<></>}>

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