import { ReactNode } from 'react';
import styles from './section.module.css';

interface SectionProps {
    /** Unique section ID (used for navigation or anchoring) */
    id: string
    //**Provide a string to display the header <h3> tag */
    headerText: string
    children: ReactNode
}

/**
 * Section is a layout component that wraps its children in a semantic <section> tag.
 * 
 * @param id - The unique identifier for the section.
 * @param children - The content to render inside the section.
 */
const SectionWrapper : React.FC<SectionProps> = ({ id, headerText, children }) => {


    return (
        <section className={styles.sectionContainer} id={`${id}`}>
            <h2> { headerText } </h2>
            { children }
        </section>
    )
};

export default SectionWrapper;


