import { Step8State } from '@/app/landlord/types';
import { StepComponentProps } from '../step_1/component';
import styles from '../step_1/styles.module.css';
import SelectGroup from '@/components/ui/input/select/select';

const options = [
    { id: 0, name: 'No'},
    { id: 1, name: 'Yes'}
]

const StepEightComponent: React.FC<StepComponentProps<Step8State>> = ({ isPending, setFormState, stepState, formId, dropDownData }) => {

    const { houseRulesOptions } = dropDownData;

    const onChangeHandler = (hrId: number, state: number) => {

        const currentState = stepState.houseRules;

        const updatedState = doesExist(hrId) ? currentState.map((itm) => {

            if(+itm.ruleId === +hrId){
                itm.isAllowed = state;
            }

            return itm;
        
        }) : [...currentState, { listingId: formId, ruleId: hrId, isAllowed: state }];

        setFormState({ houseRules: updatedState})
    }

    const doesExist = (hrId: number): boolean => stepState.houseRules.some(itm => +itm.ruleId == +hrId);
    
    const getInputValue = (id: number) => {
        const currentState = stepState.houseRules;
        const d = currentState.find(itm => +itm.ruleId == +id);
        return d?.isAllowed;
    }

    return (
        <section className={styles.sectionContainer}>
            <h1 className={styles.headerTitle}>House Rules</h1>
            <h3 className={styles.subHeader}>Enter your property information here.</h3>
            <div className={styles.formGrid}>
                <div className={styles.formGroupRow}>
                    {
                        houseRulesOptions.length > 0 && (
                            houseRulesOptions.map((itm, idx) => (
                                <SelectGroup
                                    key={itm.icon}
                                    label={itm.name}
                                    isDisabled={isPending}
                                    idnName={String(itm.id)}
                                    onChangeHandler={(e) => onChangeHandler(itm.id, +e.currentTarget.value)}
                                    inputValue={getInputValue(itm.id)}
                                    isRequired={true}
                                    dropDownOptions={options}
                                    defaultOptionLabel='Select an option'
                                    inputType='select'
                                />
                            ))
                        )
                    }

                </div>
                
            </div>
        </section>
    )
};

export default StepEightComponent;
