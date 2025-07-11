import { StepSidebarMap } from "@/app/landlord/types";
import styles from './styles.module.css';

interface Props {
    navLinks: StepSidebarMap
    changeComponentHandler: (index?: number ) => void;
}

const FormSidebar: React.FC<Props> = ({ navLinks, changeComponentHandler }) => {

    return (
        <>
            <nav id="formSidebar" className={styles.navL}>
                <ol className={styles.olContainer}>
                    { Array.from(navLinks).map((itm, idx) => (
                        <li key={itm[1].index} className={styles.complete}>
                            <button className={styles.noStyles} onClick={() => changeComponentHandler(itm[1].index)}>
                                <span>{itm[1].title}</span>
                            </button>
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    )
};

export default FormSidebar;