'use client'
import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';

interface FloatingWindowProps {
    isOpen: boolean;
    anchorRef: React.RefObject<HTMLButtonElement | null>;
    children: React.ReactNode;
    setIsOpen: (...args: any) => void
}

const FloatingWindow: React.FC<FloatingWindowProps> = ({ isOpen, anchorRef, children, setIsOpen }) => {

    const wrapperRef = useRef<HTMLDivElement>(null); 

    const handleClickOutside = (event: MouseEvent) => {
        
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };
    
    useEffect(() => {
        
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);

    return (
        <div
            ref={wrapperRef}
            className={`${styles.window} ${isOpen ? styles.open : ''}`}
            role="dialog"
        >
            {children}
        </div>
    );
};

export default FloatingWindow;
