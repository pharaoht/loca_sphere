import { Step7State } from '@/app/landlord/types';
import { StepComponentProps } from '../step_1/component';
import styles from '../step_1/styles.module.css';
import SelectGroup from '@/components/ui/input/select/select';
import InputGroup from '@/components/ui/input/input/input';
import { useEffect } from 'react';

const options = [
    { id: 0, name: 'No'},
    { id: 1, name: 'Yes' }
]

const StepSevenComponent: React.FC<StepComponentProps<Step7State>> = ({ isPending, setFormState, stepState, formId }) => {

    console.count('step 7 component renders:')
    useEffect(() => {

        if(!stepState.listingId){

            setFormState({ listingId: formId});
        }
    }, []);

    return (
        <section className={styles.sectionContainer}>
            <h1 className={styles.headerTitle}>Utilities</h1>
            <h3 className={styles.subHeader}>Bills that will be covered by you or the tenant.</h3>
            <div className={styles.formGrid}>
                <div className={styles.formGroupRow}>
                    <SelectGroup
                        label='Is water included?'
                        isDisabled={isPending}
                        idnName='waterIncluded'
                        onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                        inputValue={stepState.waterIncluded}
                        isRequired={true}
                        dropDownOptions={options}
                        defaultOptionLabel='Select an option'
                        inputType='select'
                    />
                    <SelectGroup
                        label='Is gas included?'
                        isDisabled={isPending}
                        idnName='gasIncluded'
                        onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                        inputValue={stepState.gasIncluded}
                        isRequired={true}
                        dropDownOptions={options}
                        defaultOptionLabel='Select an option'
                        inputType='select'
                    />
                </div>
                <div className={styles.formGroupRow}>
                    <SelectGroup
                        label='Is internet included?'
                        isDisabled={isPending}
                        idnName='internetIncluded'
                        onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                        inputValue={stepState.internetIncluded}
                        isRequired={true}
                        dropDownOptions={options}
                        defaultOptionLabel='Select an option'
                        inputType='select'
                    />
                    <SelectGroup
                        label='Is electric included?'
                        isDisabled={isPending}
                        idnName='electricIncluded'
                        onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                        inputValue={stepState.electricIncluded}
                        isRequired={true}
                        dropDownOptions={options}
                        defaultOptionLabel='Select an option'
                        inputType='select'
                    />       
                </div>
                <div className={styles.formGroupRow}>
                    <SelectGroup
                        label='Is cleaning included?'
                        isDisabled={isPending}
                        idnName='cleaningIncluded'
                        onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                        inputValue={stepState.cleaningIncluded}
                        isRequired={true}
                        dropDownOptions={options}
                        defaultOptionLabel='Select an option'
                        inputType='select'
                    />
                    {
                        stepState.cleaningIncluded === 0 ? (
                            <InputGroup 
                                label='Cleaning Fee'
                                inputType='number'
                                idnName='cleaningFee'
                                inputValue={stepState.cleaningFee}
                                placeHolder='30.00'
                                onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                            />
                        )
                        :
                        (
                            <div></div>
                        )
                    }
                </div>
            </div>
        </section>
    )
};

export default StepSevenComponent;
