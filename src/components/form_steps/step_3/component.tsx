import styles from '../step_1/styles.module.css';
import { Step3State } from "@/app/landlord/types";
import { StepComponentProps } from "../step_1/component";
import InputGroup from '@/components/ui/input/input/input';
import { useEffect } from 'react';


const StepThreeComponent: React.FC<StepComponentProps<Step3State>> = ({ isPending, setFormState, formId, stepState, errorFormState }) => {
    
    useEffect(() => { !stepState.id && setFormState({ id: formId })}, []);

    console.count('stepComponent3 render times');

    return (
        <section className={styles.sectionContainer}>
            <h1 className={styles.headerTitle}>Fixures and Stay Limits</h1>
            <h3 className={styles.subHeader}>Enter your property information here.</h3>
            <div className={styles.formGrid}>
                <div className={styles.formGroupRow}>
                    <InputGroup
                        label='How many people are allowed to stay?'
                        inputType='number'
                        idnName='peopleAllowed'
                        isRequired={true}
                        inputValue={stepState?.peopleAllowed}
                        placeHolder='1 bedroom with 1 bed? up to 2 people allowed'
                        onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                        isDisabled={isPending}
                        validationMessage={Array.isArray(errorFormState.peopleAllowed) && errorFormState.peopleAllowed[0].message}
                    />
                    <InputGroup
                        label='How many total bedrooms on the property?'
                        inputType='number'
                        idnName='bedrooms'
                        isRequired={true}
                        inputValue={stepState?.bedrooms}
                        placeHolder='3 bedrooms'
                        onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                        isDisabled={isPending}
                    />
                </div>
                <div className={styles.formGroupRow}>
                    <InputGroup
                        label='How many total beds are in the room/property you are listing'
                        inputType='number'
                        idnName='beds'
                        isRequired={true}
                        inputValue={stepState?.beds}
                        placeHolder='2 beds'
                        onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                        isDisabled={isPending}
                    />
                    <InputGroup
                        label='How many total bathrooms are on the property?'
                        inputType='number'
                        idnName='bathrooms'
                        isRequired={true}
                        inputValue={+stepState?.bathrooms}
                        step={0.5}
                        placeHolder='2.5 bathrooms'
                        onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                        isDisabled={isPending}
                    />
                </div>
                <div className={styles.formGroupRow}>
                    <InputGroup
                        label='Minimum days a tenant could stay?'
                        inputType='number'
                        idnName='minimumStayDays'
                        isRequired={true}
                        inputValue={stepState?.minimumStayDays}
                        placeHolder='60 days minimum'
                        onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                        isDisabled={isPending}
                    />
                    <InputGroup
                        label='Maximum days a tenant could stay?'
                        inputType='number'
                        idnName='maxStayDays'
                        isRequired={true}
                        inputValue={stepState?.maxStayDays}
                        placeHolder='365 days maximum'
                        minimum={0}
                        maximum={365}
                        onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                        isDisabled={isPending}
                    />
                </div>

            </div>
        </section>
    )
};


export default StepThreeComponent;