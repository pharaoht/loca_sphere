'use client'
import styles from './layout.module.css';
import { DefaultStateType, DropDownOptions, parseFormData, sideLinks, Step11State, stepDefaultState, StepFormData, StepKey, stepKeys } from './types';
import React, { FormEvent, Suspense, useEffect, useState, useTransition } from 'react';
import FormSidebar from '@/components/form_steps/sidebar/formSidebar';
import StepOneComponent, { StepComponentProps } from '@/components/form_steps/step_1/component';
import listingsApi from '@/api/listings/listings.api';
import useParams from '@/hooks/useParams';

interface Props {
    preLoadFormData: any[];
    formId: string | undefined;
    dropDownData: DropDownOptions
};

const stepComponents: Record<StepKey, React.FC<StepComponentProps<any>> 
    | React.LazyExoticComponent<React.FC<StepComponentProps<any>>>> = {
    'step-1': StepOneComponent, //loaded eagerly
    'step-2': React.lazy(() => import('@/components/form_steps/step_2/component')),
    'step-3': React.lazy(() => import('@/components/form_steps/step_3/component')),
    'step-4': React.lazy(() => import('@/components/form_steps/step_4/component')),
    'step-5': React.lazy(() => import('@/components/form_steps/step_5/component')),
    'step-6': React.lazy(() => import('@/components/form_steps/step_6/component')),
    'step-7': React.lazy(() => import('@/components/form_steps/step_7/component')),
    'step-8': React.lazy(() => import('@/components/form_steps/step_8/component')),
    'step-9': React.lazy(() => import('@/components/form_steps/step_9/component')),
    'step-10': React.lazy(() => import('@/components/form_steps/step_10/component')),
    'step-11': React.lazy(() => import('@/components/form_steps/step_11/component')),
};

const StepComponentLayout: React.FC<Props> = ({ preLoadFormData = undefined, formId = undefined, dropDownData }) => {

    const { setParam, getParam } = useParams();

    const listingId = getParam('formId');
    
    const [ stepIndex, setStepIndex ] = useState<number>(0);

    const [formState, setFormState] = useState<DefaultStateType>(preLoadFormData ? parseFormData(preLoadFormData) : stepDefaultState);

    const [ errorFormState, setErrorFormState ] = useState({});

    const [ isPending, setTransition ] = useTransition();

    const StepComponent = stepComponents[stepKeys[stepIndex]];

    const backHandler = (jumpIndex?: number) => {

        if(typeof jumpIndex === 'number'){

            if(!formId) return;
            
            return setStepIndex(jumpIndex);
        };

        if(stepIndex == 0) return;

        setStepIndex(prevState => prevState - 1);
    
        return;
    };

    const nextSubmitHandler = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        setTransition(async () => {

            const isFile = stepKeys[stepIndex] === 'step-11' ? true : false;

            const formData = isFile ? listingsApi.transformToFormData(formState[stepKeys[stepIndex]] as Step11State) : formState[stepKeys[stepIndex]];
 
            const result = await listingsApi.httpPostCreateListing(stepKeys[stepIndex], formData, isFile, listingId);

            if(result?.success == false) return setErrorFormState(result?.invalidInputs);

            else if(stepIndex == 0 && result.id) setParam([{ key: 'formId', value: result.id }]);

            else if (stepKeys[stepIndex] === 'step-5' && result.data.length > 0) onChangeHandler({ amenities: result.data })

            else if (stepKeys[stepIndex] === 'step-8' && result.success) onChangeHandler({ houseRules: result.data });

            else if(result.id) onChangeHandler({ id: result.id });
            
            if(stepKeys[stepIndex] === 'step-11') return 
        
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

    useEffect(() => { 
        
        setErrorFormState({});
        onChangeHandler({ xxFormxx: listingId });

    }, [ stepIndex ]);

    return (
        <main className={styles.parentStyles}>
            <section className={styles.split}>
                <aside className={styles.siderBar}>
                    <FormSidebar navLinks={sideLinks} changeComponentHandler={backHandler}/>
                </aside>
                <article className={styles.article}>
                    <form className={styles.form} onSubmit={nextSubmitHandler}>
                        <div className={styles.scrollableContent}>
                            <Suspense fallback={<div>Loading step...</div>}>
                                <StepComponent 
                                    key={stepKeys[stepIndex]} 
                                    isPending={isPending} 
                                    stepState={formState[stepKeys[stepIndex]]} 
                                    setFormState={onChangeHandler}
                                    errorFormState={errorFormState}
                                    dropDownData={dropDownData}
                                    formId={formId ?? ''}
                                />
                            </Suspense>
                        </div>
                        <nav className={styles.footerNav} aria-label="Step navigation">
                            <button onClick={() => backHandler()} disabled={isPending} type='button'>back</button>
                            <button disabled={isPending} type='submit'>Next</button>
                        </nav>
                    </form>
                </article>
            </section>
        </main>
    )
};

export default StepComponentLayout;