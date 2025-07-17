import { Step1State } from '@/app/landlord/types';
import { StepComponentProps } from '../step_1/component';
import styles from '../step_1/styles.module.css';

const StepSixComponent: React.FC<StepComponentProps<Step1State>> = ({ isPending, dropDownData, setFormState, stepState, formId }) => {

    const { amenityOptions, amenityTypeOptions } = dropDownData

    return (
        <section className={styles.sectionContainer}>
            <h1 className={styles.headerTitle}>Listing Amenities</h1>
            <h3 className={styles.subHeader}>Enter your property information here.</h3>
            <div className={styles.formGrid}>

            </div>
        </section>
    )
};

export default StepSixComponent;
