import { ReactNode } from 'react';
import styles from './section.module.css';
import Image from 'next/image';
import React from 'react';

interface SectionProps {
    /** Unique section ID (used for navigation or anchoring) */
    id: string
    //**Provide a string to display the header <h3> tag */
    headerText: string
    isChecked?: boolean
    children: ReactNode
    checkText?: string
    title?: string
}

/**
 * Section is a layout component that wraps its children in a semantic <section> tag.
 * 
 * @param id - The unique identifier for the section.
 * @param children - The content to render inside the section.
 */
const SectionWrapper : React.FC<SectionProps> = async ({ id, headerText, children, isChecked = false, checkText = 'Checked' , title }) => {

    function CheckedLabel() {
        return (
            <span className={styles.statusLabel}>
                <span className={styles.statusIcon} title={title}>
                    <Image src='/info.svg' alt='' height={20} width={20} />
                </span>
                {checkText}
            </span>
        );
    }

    return (
        <section className={styles.sectionContainer} id={`${id}`}>
            <h2> { headerText } { isChecked && CheckedLabel() }</h2>
            { children }
        </section>
    )
};

export default SectionWrapper;


