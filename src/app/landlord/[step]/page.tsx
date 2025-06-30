'use client';
import { notFound, useParams, useRouter } from 'next/navigation';
import StepOneComponent from '@/components/form_steps/step-1/component';
import StepComponentLayout from '../layout';

export const stepKeys = ['step-1'] as const;

export type StepKey = typeof stepKeys[number];

interface StepComponentProps {
    backHandler: () => void;
}

export const stepComponents: Record<StepKey, React.FC<StepComponentProps>> = {
  'step-1': StepOneComponent,

};

interface PageProps {

}

const WizardFormProvider: React.FC<PageProps> = ({}) => {

    const router = useRouter();
    const params = useParams();
    const stepParam = params.step;

    const step = Array.isArray(stepParam) ? stepParam[0] : stepParam;

    if(!step || !(step in stepComponents)){
        return notFound();
    }

    const StepComponent = stepComponents[step as StepKey];

    return (
        <StepComponentLayout>
            <StepComponent backHandler={() => null}/>
        </StepComponentLayout>
    )
}