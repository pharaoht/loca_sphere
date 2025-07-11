'use client'
import { useState } from 'react';
import styles from '../input/input.module.css';

interface SearchInputProps {
    label: string;
    idnName: string;
    placeholder?: string;
    isDisabled?: boolean;
    suggestions: string[];
    inputValue: string;
    onChange: (...args: any) => void;
    onClickHandler?: (...args: any) => void;
}
  
const SearchInput: React.FC<SearchInputProps> = ({ label, inputValue, idnName, isDisabled, placeholder, suggestions, onChange, onClickHandler }) => {

    const [ isActive, setIsActive ] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setIsActive(e.target.value !== '');

    };
    
    const handleInputFocus = () => {

        setIsActive(true);
    };
    
     
    return (
        <div className={styles.formGroup}>
            <label htmlFor={idnName}>{label}</label>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    id={idnName}
                    name={idnName}
                    placeholder={placeholder}
                    disabled={isDisabled}
                    value={inputValue ?? ''}
                    onChange={(e) => {
                        onChange(e)
                        handleInputChange(e)
                    }}
                    onFocus={handleInputFocus}
                    className={styles.unitSpacing}
                />
                { isActive && suggestions.length > 0 &&
                    <ul className={styles.dropdown}>
                        {
                            suggestions.map((itm: any, idx) => (
                                <li key={itm.mapbox_id} onClick={() => {
                                    setIsActive(false);
                                    onClickHandler?.(itm.mapbox_id)
                                }}>{itm.full_address}</li>
                            ))
                        }
                        
                    </ul>
                }

            </div>
        </div>
    );
    
};

export default SearchInput;