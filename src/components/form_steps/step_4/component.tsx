import React, { useEffect, useState } from 'react';
import styles from '../step_1/styles.module.css';
import { StepComponentProps } from '../step_1/component';
import { Step4State } from '@/app/landlord/types';
import SelectGroup from '@/components/ui/input/select/select';
import listingsApi from '@/api/listings/listings.api';

const livesInPropertyOptions = [
    { id: 0, name: 'No' },
    { id: 1, name: 'Yes' }
]

const gender = [
    { id: 0, name: 'Male' },
    { id: 1, name: 'Female' }
]

const ageRange = [
    { id: '18-25 years', name: '18-25 years' },
    { id: '26-30 years', name: '26-30 years' },
    { id: '31-40 years', name: '31-40 years' },
    { id: '41+ years', name: '41+ years' },
]

const StepFourComponent: React.FC<StepComponentProps<Step4State>> = ({ isPending, setFormState, stepState, errorFormState, dropDownData }) => {

    return (
        <section className={styles.sectionContainer}>
            <h1 className={styles.headerTitle}>Host Information</h1>
            <h3 className={styles.subHeader}>Enter details about whoever is hosting.</h3>
            <div className={styles.formGrid}>
                <div className={styles.formGroupRow}>
                    <SelectGroup
                        label='Do you live on the property?'
                        isDisabled={isPending}
                        idnName='livesInProperty'
                        onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                        inputValue={stepState.livesInProperty ? 1 : 0}
                        isRequired={true}
                        dropDownOptions={livesInPropertyOptions}
                        defaultOptionLabel='Select an option'
                        inputType='select'
                    />
                    {
                        stepState.livesInProperty == 1 ? (
                            <SelectGroup
                                label='Do you have family that lives on the property?'
                                isDisabled={isPending}
                                idnName='livesWithFamily'
                                onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                                inputValue={stepState.livesWithFamily ? 1 : 0}
                                isRequired={true}
                                dropDownOptions={livesInPropertyOptions}
                                defaultOptionLabel='Select an option'
                                inputType='select'
                            />
                        )
                        : (
                            <div></div>
                        )
                    }
                    {
                        stepState.livesInProperty == 1 ? (
                            <SelectGroup
                                label='Do you have pets that live on the property?'
                                isDisabled={isPending}
                                idnName='hasPets'
                                onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                                inputValue={stepState.hasPets ? 1 : 0}
                                isRequired={true}
                                dropDownOptions={livesInPropertyOptions}
                                defaultOptionLabel='Select an option'
                                inputType='select'
                            />
                        )
                        : (
                            <div></div>
                        )
                    }
                </div>
                <div className={styles.formGroupRow}>
                    <SelectGroup
                        label='What is your gender?'
                        isDisabled={isPending}
                        idnName='hostGender'
                        onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                        inputValue={stepState.hostGender}
                        isRequired={true}
                        dropDownOptions={gender}
                        defaultOptionLabel='Select an option'
                        inputType='select'
                    />
                    <SelectGroup
                        label='What is your age group?'
                        isDisabled={isPending}
                        idnName='hostAgeRange'
                        onChangeHandler={(e) => setFormState({ [e.target.name]: e.target.value })}
                        inputValue={stepState.hostAgeRange}
                        isRequired={true}
                        dropDownOptions={ageRange}
                        defaultOptionLabel='Select an option'
                        inputType='select'
                    />
                    <SelectGroup
                        label='What gender is allowed to stay?'
                        isDisabled={isPending}
                        idnName='genderAllowedId'
                        onChangeHandler={(e) => setFormState({ [e.target.name]: +e.target.value })}
                        inputValue={stepState.genderAllowedId}
                        isRequired={true}
                        dropDownOptions={dropDownData.genderOptions}
                        defaultOptionLabel='Select an option'
                        inputType='select'
                    />
                </div>
            </div>
        </section>
    )
};

export default StepFourComponent;