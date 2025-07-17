import styles from './styles.module.css';
import { DropDownOptions, Step1State, StepFormData } from '@/app/landlord/types';
import InputGroup from '@/components/ui/input/input/input';
import SelectGroup from '@/components/ui/input/select/select';

export interface StepComponentProps<T> {
	isPending: boolean;
    formId: string;
	stepState: T;
	errorFormState?: any;
    dropDownData: DropDownOptions,
	setFormState: (update: Partial<StepFormData>) => void;
}

const StepOneComponent: React.FC<StepComponentProps<Step1State>> = ({ isPending, stepState, setFormState, errorFormState, dropDownData }) => {

    console.count('stepComponent1 render times')
   
    return (
        <section className={styles.sectionContainer}>
            <h1 className={styles.headerTitle}>Property Details</h1>
            <h3 className={styles.subHeader}>Enter your property information here.</h3>
            <div className={styles.formGrid}>

                <InputGroup 
                    label='Name your listing'
                    inputType='text'
                    idnName='title'
                    isRequired={true}
                    inputValue={stepState?.title}
                    placeHolder='Double bedroom, with balcony, in 1-bedroom apartment'
                    onChangeHandler={(e) => setFormState({ [e.target.name]: e.target.value })}
                    isDisabled={isPending}
                />


                <div className={styles.formGroupRow}>
                    <SelectGroup
                        label='Currency type'
                        isDisabled={isPending}
                        idnName='currencyId'
                        onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                        inputValue={stepState.currencyId}
                        isRequired={true}
                        dropDownOptions={dropDownData.currencyOptions}
                        defaultOptionLabel='Select a currency'
                        inputType='select'
                    />

                    <InputGroup
                        label='Monthly rent'
                        inputType='number'
                        idnName='monthlyRent'
                        isRequired={true}
                        isDisabled={isPending}
                        inputValue={stepState.monthlyRent}
                        onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                        validationMessage={ Array.isArray(errorFormState?.monthlyRent) && errorFormState?.monthlyRent[0]?.message ? errorFormState.monthlyRent[0].message : null}
                    />

                    <SelectGroup
                        label="Listing type"
                        isDisabled={isPending}
                        idnName="listingTypeId"
                        onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                        inputValue={stepState.listingTypeId}
                        isRequired={true}
                        dropDownOptions={dropDownData.listingTypeOptions}
                        defaultOptionLabel="Select a type"
                        inputType="select"
                    />

                </div>

                <div className={styles.formGroupRow}>

                    <InputGroup
                        label='Area of room'
                        inputType='number'
                        idnName='roomAreaSqM'
                        isRequired={true}
                        isDisabled={isPending}
                        inputValue={stepState.roomAreaSqM}
                        onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                        unitText='m²'
                    />

                    <InputGroup
                        label='Area of property '
                        inputType='number'
                        idnName='placeAreaSqM'
                        isRequired={true}
                        isDisabled={isPending}
                        inputValue={stepState.placeAreaSqM}
                        onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                        unitText='m²'
                    />

                    <div className={styles.formGroup}>
                        <label></label>
                        <div className={styles.inputWrapper}>

                        </div>
                    </div>

                    
                    
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='description'>Please describe the listing * <i>(the more, the better)</i></label>
                    <textarea 
                        id='description'
                        name={'description'} 
                        required 
                        disabled={isPending}
                        value={stepState.description}
                        onChange={(e) => setFormState({ [e.target.name]: e.target.value })}
                    >
                    </textarea>
                </div>
            </div>
        </section>
    )
};


export default StepOneComponent;