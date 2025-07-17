import { Step6State } from '@/app/landlord/types';
import { StepComponentProps } from '../step_1/component';
import styles from '../step_1/styles.module.css';

const StepTenComponent: React.FC<StepComponentProps<Step6State>> = ({ isPending, setFormState, stepState, formId }) => {



    return (
        <section className={styles.sectionContainer}>
            <h1 className={styles.headerTitle}>Availability</h1>
            <h3 className={styles.subHeader}>Enter your property information here.</h3>
            <div className={styles.formGrid}>

            </div>
        </section>
    )
};

export default StepTenComponent;
