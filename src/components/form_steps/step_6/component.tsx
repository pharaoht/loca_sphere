import { Step6State } from '@/app/landlord/types';
import { StepComponentProps } from '../step_1/component';
import styles from '../step_1/styles.module.css';
import MultiSelectGroup from '@/components/ui/input/multiselect/multiselect';
import InputGroup from '@/components/ui/input/input/input';

const StepSixComponent: React.FC<StepComponentProps<Step6State>> = ({ isPending, dropDownData, setFormState, stepState, formId }) => {

    const { amenityOptions, amenityTypeOptions } = dropDownData;

    const deleteHandler = () => {
        
    }

    const addRenderItem = () => {
        
        const currentState = stepState.listingAmenities;

        if(currentState.length == 10) return;

        const updatedState = [...currentState, {
            listingId: formId,
            amenityTypeId: '',
            roomNumber: null,
            amenity: [
                {
                    amenityId: undefined,
                }
            ]
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

    const msOnChangeHandler = (index: number) => {

        const currentState = stepState.listingAmenities[index];

        const updatedState = ''
    }

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
                                        selectOptions={amenityTypeOptions}
                                        multiSelectOptions={amenityOptions}
                                        multiSelectOnChange={msOnChangeHandler}
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