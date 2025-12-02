'use client'
import React, { CSSProperties, ElementType, ReactNode } from 'react';
import styles from './formstyles.module.css';

interface Props {
    children: React.ReactNode;
    formSubmitHandler: (...args: any) => void;
    formOnChangeHandler?: (...args: any) => void;
}

export interface BookingRequestFormGridItemProps {
    as?: ElementType;
    size?: 'full' | 'half' | 'quarter';
    className?: 'formGroup' | 'headerGroup';
    style?: CSSProperties;
    children?: ReactNode;
    customClass?: string;
    [key: string]: any;
}

const BookingRequestFormGrid: React.FC<Props> & {
    FormItem: React.FC<BookingRequestFormGridItemProps>;
} = ({ children, formSubmitHandler }) => {

    if (!React.isValidElement(children)) {
        console.error('Not a valid React element');
        return
    }

    return (
        <form onSubmit={(e) => formSubmitHandler(e)} className={`${styles.formGrid}`}>{children}</form>
    )
};

BookingRequestFormGrid.FormItem = ({
    as: Component = 'div',
    size = 'half',
    className = 'formGroup',
    style,
    children,
    customClass,
    ...rest
}: BookingRequestFormGridItemProps) => {
    return (
        <Component
            className={`${styles[className]} ${styles[size]}`}
            style={style}
            {...rest}
        >
            {children}
        </Component>
    );
};


export default BookingRequestFormGrid;