'use client'
import { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import styles from './dropdown.module.css';
import React from 'react';

interface DropdownProps {
    children: ReactNode; 
    dropDownContent: ReactNode;
    startFromRightSide?: boolean | null;
    onInputChange?: (...args: any) => void | null;
}

const Dropdown: React.FC<DropdownProps> = ({ children, dropDownContent, startFromRightSide = false, onInputChange }) => {

    const [ isActive, setIsActive ] = useState<boolean>(false);

    const wrapperRef = useRef<HTMLDivElement>(null); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setIsActive(e.target.value !== '');

        if(onInputChange) onInputChange(e)
    };

    const handleInputFocus = () => {

        setIsActive(true);
    };

    const handleClickOutside = (event: MouseEvent) => {
       
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setIsActive(false);
        }
    };

    useEffect(() => {
        
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);

    return (
        <div ref={wrapperRef} className={styles.dropdown_wrapper}>
            { React.Children.map(children, (child) => {

                if(React.isValidElement(child) && (child.type === 'input' || child.type === 'button')) {

                    return React.cloneElement(child  as ReactElement<React.InputHTMLAttributes<HTMLInputElement>>, {
                        onChange: handleInputChange,
                        onFocus: handleInputFocus,
                    })
                }

                return child;
        
            })}
            <div className={`${styles.dropdown} ${isActive ? styles.active : null} ${startFromRightSide ? styles.rightAlign : null}`}>
                {
                    (React.isValidElement(dropDownContent) && dropDownContent.type !== React.Suspense) ? React.cloneElement(dropDownContent) : (
                        dropDownContent
                    )
                }
            </div>
        </div>
    )
};

export default Dropdown;