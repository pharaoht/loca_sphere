import { ReactNode } from 'react';
import styles from './button.module.css';
import React from 'react';

interface ButtonProps {
    children: ReactNode;
    baseClassOverride: boolean;
    buttonHandler?: (...args: any) => void;
    isDisabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    buttonColor?: 'red' | 'blue' | 'grey';
    className?: string;
    ariaLabel?: string;
    tooltip?: string;
}

const Button: React.FC<ButtonProps> = (
    { 
        children, isDisabled = false, baseClassOverride = false, 
        type = 'button', className, buttonHandler, buttonColor,
        ariaLabel, tooltip
    }
) => {

    const isCustomStyles = baseClassOverride ? true : false;

    const cssButtonClassStyles = !isCustomStyles ? 
        `${styles.btnBaseClass} ${buttonColor && styles[buttonColor]}`
        : className;

    return (
        <button 
            type={type}
            className={cssButtonClassStyles}
            disabled={isDisabled}
            onClick={buttonHandler}
            aria-label={ariaLabel}
            title={tooltip}
        >
            {children}
        </button>
    )
};

export default Button;