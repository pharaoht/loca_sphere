import { Step6State } from '@/app/landlord/types';
import { StepComponentProps } from '../step_1/component';
import styles from '../step_1/styles.module.css';
import MultiSelectGroup from '@/components/ui/input/multiselect/multiselect';
import InputGroup from '@/components/ui/input/input/input';

const StepSixComponent: React.FC<StepComponentProps<Step6State>> = ({ isPending, dropDownData, setFormState, stepState, formId }) => {

    const { amenityOptions, amenityTypeOptions } = dropDownData;
    console.log(stepState)
    const deleteHandler = () => {
        
    }

    const addRenderItem = () => {
        
        const currentState = stepState.listingAmenities;

        if(currentState.length == 10) return;

        const updatedState = [...currentState, {
            listingId: formId,
            amenityTypeId: '',
            roomNumber: null,
            amenity: []
        }]

        setFormState({ listingAmenities: updatedState })
    };

    const deleteRenderItem = (idx: number) => {

        const currentState = stepState.listingAmenities;

        if(currentState[idx].hasOwnProperty('id')){

        }

        const updatedState = currentState.filter((itm, index) => idx !== index)

        setFormState({ listingAmenities: updatedState });
    }

    const onChangeHandler = (index: number, value: string, key: string) => {

        const currentState = stepState.listingAmenities;

        const updatedState = currentState.map((itm, idx) => {

            if(idx === index ){
                return {
                    ...itm,
                    [key]: value
                }
            }

            return itm
        })

        setFormState({ listingAmenities: updatedState })
    }

    const msOnChangeHandler = (groupIndex: number, optionIndex: number) => {
        // a snapshot of state at render time.
        // /Both currentState and state are just references to parts of the stepState object.
        //If you mutate them directly(e.g., state.push(...)), you are mutating React state directly, 
        // which React does not detect as a change → no re - render.
        const currentState = stepState.listingAmenities;
        const state = currentState[groupIndex].amenity;

        const updatedState = inArray(state, optionIndex) ? 
            state.filter(itm => itm.amenityId !== optionIndex)
            : [...state, { amenityId: optionIndex }]
        ;
        
        const u = currentState.map((itm, idx) => {
            if(idx === groupIndex){
                
                return {
                    ...itm,
                    amenity: updatedState
                }

            }

            return itm
        })

        setFormState({ listingAmenities: u })

        function inArray(array: Array<any>, search: number){
            return array.some(itm => +itm.amenityId === +search)
        }
    }
console.log(stepState)
    return (
        <section className={styles.sectionContainer}>
            <h1 className={styles.headerTitle}>Listing Amenities</h1>
            <h3 className={styles.subHeader}>Enter your property information here.</h3>
            <div className={styles.formGrid}>
                <div>
                    <button onClick={addRenderItem} type='button'>add new</button>
                </div>
                <ul className={styles.selectGrid}>
                    {
                        (
                            stepState.listingAmenities.length > 0 && 
                            stepState.listingAmenities.map((itm, idx) => (
                                <li key={idx}>
                                    <button 
                                        onClick={() => deleteRenderItem(idx)}
                                        type='button'
                                    >
                                        X
                                    </button>
                                    <MultiSelectGroup
                                        selectDefaultOptionLabel='Select an option'
                                        selectIdnName='name'
                                        selectInputValue={itm.amenityTypeId}
                                        selectLabel='Select room type'
                                        selectOnChange={(e) => onChangeHandler(idx, e.currentTarget.value, 'amenityTypeId')}
                                        inputOnChange={(e) => onChangeHandler(idx, e.currentTarget.value, 'roomNumber')}
                                        inputValue={itm.roomNumber}
                                        selectedOptions={itm.amenity || []}
                                        selectOptions={amenityTypeOptions}
                                        multiSelectOptions={amenityOptions}
                                        multiSelectOnChange={(childValue) => msOnChangeHandler(idx, childValue)}
                                    />
                                </li>
                            ))
                        )
                    }
                </ul>
            </div>
        </section>
    )
};

export default StepSixComponent;



// {
//     amenityTypeId: 1,
//     roomNumber: 0,
//     listingId: formId,
//     amenities: [
//         { amenityId: 1}
//     ]
// }