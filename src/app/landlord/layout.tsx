import styles from './layout.module.css';
import { ReactElement } from "react";

interface Props {
    children: ReactElement
}

const StepComponentLayout: React.FC<Props> = ({ children }) => {

    return (
        <div className={styles.parentStyles}>
            {children}
        </div>
    )
};

export default StepComponentLayout