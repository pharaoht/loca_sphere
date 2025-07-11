import { type Metadata } from 'next';
import StepComponentLayout from '../layout_step';
import listingsApi from '@/api/listings/listings.api';
import { notFound } from 'next/navigation';


interface PageProps {
    params: {
        step: string; // will be 'step-1'
    };
    searchParams: { [key: string]: string | undefined };
};


const WizardFormProvider: React.FC<PageProps> = async ({ params, searchParams }) => {
    
    const param = await params;
    const searchParam = await searchParams;

    const stepParam = param.step;
    const formId = searchParam.formId;
    
    const formData = formId != undefined ? await listingsApi.httpGetDetailsForListing('all', String(formId)) : [];

    if(formData?.success === false) return notFound()
    console.log(formData)
    return (

        <StepComponentLayout preLoadFormData={formData} formId={formId} />

    )
};

export default WizardFormProvider;