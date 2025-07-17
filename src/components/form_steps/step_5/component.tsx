import { Step5State } from '@/app/landlord/types';
import { StepComponentProps } from '../step_1/component';
import styles from '../step_1/styles.module.css';
import Image from 'next/image';

const StepFiveComponent: React.FC<StepComponentProps<Step5State>> = ({ setFormState, stepState, dropDownData, errorFormState, isPending, formId }) => {

    const { bedroomAmenityOptions } = dropDownData;

    const handleCheckboxChange = (baId: number) => {

        const current = stepState.amenities ?? [];

        const updatedState = doesExist(baId) ? current.map(itm => {
            if(+itm.bedroomAmenityId === +baId){
                itm.toDelete = !itm.toDelete
            }
            return itm
        }) : [...current, { toDelete: false, bedroomAmenityId: baId, listingId: formId }]


        setFormState({amenities: updatedState})
    }

    const doesExist = (baId: number) => {

        return stepState.amenities.some(itm => +itm.bedroomAmenityId === +baId) 
    }

    const isChecked = (baId: number) => {
        return stepState.amenities.some(itm => +itm.bedroomAmenityId === +baId && !itm.toDelete) 
    }

    return (
        <section className={styles.sectionContainer}>
            <h1 className={styles.headerTitle}>Bedroom Amenities</h1>
            <h3 className={styles.subHeader}>Enter your property information here.</h3>
            <div className={styles.formGrid}>
                <ul>
                    {
                        bedroomAmenityOptions.length > 0 ? bedroomAmenityOptions.map((itm, idx) => (
                            <li key={itm.id}  >
                                <label className={styles.cbLabel} htmlFor={itm.name}>
                                    <input 
                                        className={styles.checkbox}
                                        type='checkbox'
                                        id={itm.name}     
                                        name='amenities'
                                        value={itm.id}
                                        checked={isChecked(itm.id)}
                                        onChange={(e) => handleCheckboxChange(+e.target.value)}
                                        disabled={isPending}
                                    />
                                    {
                                        itm.icon &&
                                        <Image src={`/bedroomAmenities${itm.icon}`} alt='' height={40} width={40}/>
                                    }
                                    <span >{itm.name}</span>
                                </label>
                            </li>
                        ))
                        :
                        null
                    }
                </ul>
            </div>
        </section>
    )
};

export default StepFiveComponent;