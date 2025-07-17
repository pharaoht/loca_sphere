'use client'
import styles from './layout.module.css';
import { DefaultStateType, parseFormData, sideLinks, stepDefaultState, StepFormData, StepKey, stepKeys } from './types';
import React, { FormEvent, useEffect, useState, useTransition } from 'react';
import FormSidebar from '@/components/form_steps/sidebar/formSidebar';
import StepOneComponent, { StepComponentProps } from '@/components/form_steps/step_1/component';
import StepThreeComponent from '@/components/form_steps/step_3/component';
import StepTwoComponent from '@/components/form_steps/step_2/component';
import listingsApi from '@/api/listings/listings.api';
import useParams from '@/hooks/useParams';
import StepFourComponent from '@/components/form_steps/step_4/component';

interface Props {
    preLoadFormData: any[]
    formId: string | undefined
}

export const stepComponents: Record<StepKey, React.FC<StepComponentProps<any>>> = {
    'step-1': StepOneComponent,
    'step-2': StepTwoComponent,
    'step-3': StepThreeComponent,
    'step-4': StepFourComponent,
    'step-5': StepTwoComponent,
    'step-6': StepThreeComponent,
    'step-7': StepOneComponent,
    'step-8': StepTwoComponent,
    'step-9': StepThreeComponent,
    'step-10': StepThreeComponent,
    'step-11': StepThreeComponent,
    'step-12': StepThreeComponent,
};

const StepComponentLayout: React.FC<Props> = ({ preLoadFormData = undefined, formId = undefined}) => {

    const { setParam } = useParams();
    
    const [ stepIndex, setStepIndex ] = useState<number>(0);

    const [formState, setFormState] = useState<DefaultStateType>(preLoadFormData ? parseFormData(preLoadFormData) : stepDefaultState);

    const [ errorFormState, setErrorFormState ] = useState({});

    const [ isPending, setTransition ] = useTransition();

    const StepComponent = stepComponents[stepKeys[stepIndex]];

    const backHandler = (jumpIndex?: number) => {

        if(typeof jumpIndex === 'number'){

            if(!formId) return;
            
            return setStepIndex(jumpIndex)
        };

        if(stepIndex == 0) return;

        setStepIndex(prevState => prevState - 1);
    
        return
    };

    const nextSubmitHandler = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        setTransition(async () => {

            const formData = formState[stepKeys[stepIndex]];

            const result = await listingsApi.httpPostCreateListing(stepKeys[stepIndex], formData);

            if(result?.success == false) return setErrorFormState(result?.invalidInputs);

            else if(stepIndex == 0 && result.id) setParam([{ key: 'formId', value: result.id }]);

            else if(result.id) onChangeHandler({ id: result.id });
            
            setStepIndex(prevState => prevState + 1);
            
        })
    }

    const onChangeHandler = (updates: Partial<StepFormData>) => {
        
        setFormState((prevState) => ({
            ...prevState,
            [stepKeys[stepIndex]]: {
                ...prevState[stepKeys[stepIndex]],
                ...updates,
            }
        }))
    }

    useEffect(() => setErrorFormState({}), [ stepIndex ]);

    return (
        <main className={styles.parentStyles}>
            <section className={styles.split}>
                <aside className={styles.siderBar}>
                    <FormSidebar navLinks={sideLinks} changeComponentHandler={backHandler}/>
                </aside>
                <article>
                    <form className={styles.form} onSubmit={nextSubmitHandler}>
                        <div className={styles.scrollableContent}>
                            <StepComponent 
                                key={stepKeys[stepIndex]} 
                                isPending={isPending} 
                                stepState={formState[stepKeys[stepIndex]]} 
                                setFormState={onChangeHandler}
                                errorFormState={errorFormState}
                            />
                        </div>
                        <nav className={styles.footerNav} aria-label="Step navigation">
                            <button onClick={() => backHandler()} disabled={false} type='button'>back</button>
                            <button disabled={false} type='submit'>Next</button>
                        </nav>
                    </form>
                </article>
            </section>
        </main>
    )
};

export default StepComponentLayout