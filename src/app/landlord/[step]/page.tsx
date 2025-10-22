import { type Metadata } from 'next';
import StepComponentLayout from '../layout_step';
import listingsApi from '@/api/listings/listings.api';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import authApi from '@/api/auth/auth.api';

interface PageProps {
    params: Promise<{ step: string}>
    searchParams: Promise<{ [key: string]: string | undefined }>;
};


const WizardFormProvider: React.FC<PageProps> = async ({ params, searchParams }) => {
    
    const param = await params;

    const searchParam = await searchParams;

    const cookieStore = await cookies();

    const token = cookieStore.get('refresh_token')?.value;

    const stepParam = param.step;

    const formId = searchParam.formId;

    let formData: Awaited<ReturnType<typeof listingsApi.httpGetDetailsForListing>> | null = null;

    if(formId) {

        const isOwner = await authApi.httpOwnerShip(token || '', formId)
        
        if(!isOwner.success) return notFound();

        formData = await listingsApi.httpGetDetailsForListing('all', String(formId));

        if (formData?.success === false) return notFound();
    }

    const [currencyOptions, listingTypeOptions, genderOptions, bedroomAmenityOptions, amenityTypeOptions, amenityOptions, houseRulesOptions, selectedAmenities ] 
    = await Promise.all([
        listingsApi.httpGetListingOptions('currency'),
        listingsApi.httpGetListingOptions('listingType'),
        listingsApi.httpGetListingOptions('gender'),
        listingsApi.httpGetListingOptions('bedroomAmenity'),
        listingsApi.httpGetListingOptions('amenityType'),
        listingsApi.httpGetListingOptions('amenity'),
        listingsApi.httpGetListingOptions('houseRules'),
        listingsApi.httpGetDetailsForListing('amenity', formId ?? '')
    ]);

    return (

        <StepComponentLayout 
            preLoadFormData={formData} 
            formId={formId} 
            dropDownData={{
                currencyOptions,
                listingTypeOptions,
                genderOptions,
                bedroomAmenityOptions, 
                amenityTypeOptions,
                amenityOptions,
                houseRulesOptions,
                selectedAmenities
            }}
        />

    )
};

export default WizardFormProvider;