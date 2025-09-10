export const stepKeys = [
    'step-1', 'step-2', 'step-3', 'step-4', 'step-5',
    'step-6', 'step-7', 'step-8', 'step-9', 'step-10', 'step-11'
] as const;

export type StepKey = typeof stepKeys[number];


//sidebar map

type StepSidebarInfo = {
    title: string;
    index: number;
};

export type StepSidebarMap = Map<StepKey, StepSidebarInfo>;

export const sideLinks: StepSidebarMap = new Map([
    ['step-1', { title: 'Property Details', index: 0}],
    ['step-2', { title: 'Address', index: 1}],
    ['step-3', { title: 'Fixures and Stay Limits', index: 2}],
    ['step-4', { title: 'Host Information', index: 3}],
    ['step-5', { title: 'Bedroom Amenities', index: 4}],
    ['step-6', { title: 'Listing Amenities', index: 5}],
    ['step-7', { title: 'Utilities', index: 6}],
    ['step-8', { title: 'House Rules', index: 7}],
    ['step-9', { title: 'Restrictions', index: 8}],
    ['step-10', { title: 'Availability', index: 9}],
    ['step-11', { title: 'Photos', index: 10}],
])

//end sidebar map

//step state
export const stepDefaultState: DefaultStateType = {
    'step-1': {
        id: '',
        title: '',
        monthlyRent: '',
        currencyId: 0,
        description: '',
        roomAreaSqM: '',
        placeAreaSqM: '',
        listingTypeId: 0,
    },
    'step-2': {
        id: '',
        listingId: '',
        streetAddress: '',
        houseNumber: '',
        postalCode: '',
        city: '',
        stateOrProvince: '',
        countryCode: '',
        latitude: undefined,
        longitude: undefined,
        extraInfo: ''
    },
    'step-3': {
        id: '',
        peopleAllowed: '',
        maxStayDays: '',
        minimumStayDays: '',
        bedrooms: '',
        beds: '',
        bathrooms: ''
    },
    'step-4': {
        id:'',
        listingId: '',
        livesInProperty: '',
        hasPets: '',
        hostAgeRange: '',
        hostGender: '',
        genderAllowedId: '',
        livesWithFamily: '',
        userId: '',
    },
    'step-5': { 
        amenities: [],
    },
    'step-6': {
        listingAmenities: []
    },
    'step-7': {
        id: '',
        cleaningIncluded: 0,
        cleaningFee: 0,
        internetIncluded: 0,
        gasIncluded: 0,
        electricIncluded: 0,
        waterIncluded: 0,
        listingId: ''
    },
    'step-8': {
        houseRules: [],

    },
    'step-9': {},
    'step-10': {},
    'step-11': { 
        existing: [],
        images: []
    },

} as const;

export type DefaultStateType = {
    'step-1': Step1State
    'step-2': Step2State
    'step-3': Step3State
    'step-4': Step4State
    'step-5': Step5State
    'step-6': Step6State
    'step-7': Step7State
    'step-8': Step8State
    'step-9': {}
    'step-10': {}
    'step-11': Step11State
    

}

export type StepFormData = DefaultStateType[StepKey]; 

export type Step1State = {
    id: string | null;
    title: string,
    monthlyRent: string,
    currencyId: number,
    description: string,
    roomAreaSqM: string,
    placeAreaSqM: string,
    listingTypeId: number,
}

export type Step2State = {
   id: string;
   listingId: string;
   streetAddress: string;
   houseNumber: string;
   postalCode: string;
   city: string;
   stateOrProvince: string;
   countryCode: string;
   latitude: number | undefined;
   longitude: number | undefined;
   extraInfo: string
}

export type Step3State = {
    id: string;
    peopleAllowed: string | number;
    bedrooms: string | number;
    beds: string | number;
    bathrooms: string | number;
    minimumStayDays: string | number;
    maxStayDays: string | number;
}

export type Step4State = {
    id: string;
    listingId: string;
    livesInProperty: number | string;
    hostGender: number | string;
    hostAgeRange: string;
    livesWithFamily: number | string;
    hasPets: number | string;
    userId: string;
    genderAllowedId: number | string;
}

export type Step5State = {
    amenities: Array<{ id: number, toDelete: boolean, listingId: string, bedroomAmenityId: number}>;
}

export type Step6State = {
    listingAmenities: Array<
    { 
        id: number | null, 
        toDelete: boolean, 
        listingId: string, 
        amenityTypeId: number, 
        roomNumber : number | null,
        amenity: Array<{ amenityId: number, }>
    }>
}

export type Step7State = {
    id: string | null;
    waterIncluded: number ;
    electricIncluded: number;
    gasIncluded: number;
    internetIncluded: number;
    cleaningIncluded: number;
    cleaningFee: number;
    listingId: string;
}

export type Step8State = {
    houseRules: Array<{
        id: number,
        listingId: string,
        ruleId: number,
        isAllowed: number
    }>

}

export type Step11State = {
    existing: Array<{
        id: number,
        url: string,
        isPrimary: boolean,
        amenityTypeId: number,
        listingId: string
    }>
    images: Array<{
        fileData: File,
        isPrimary: boolean,
        tag: string,
        listingId: string
    }>
}

export function parseFormData(data: any):  DefaultStateType{

    return {
        'step-1': {
            id: data?.id,
            title: data?.title,
            monthlyRent: data?.monthlyRent,
            currencyId: data?.currencyId,
            description: data?.description,
            roomAreaSqM: data?.roomAreaSqM,
            placeAreaSqM: data?.placeAreaSqM,
            listingTypeId: data?.listingTypeId,
        },
        'step-2': {
            id: data?.address?.id,
            listingId: data?.address?.listingId ?? data?.id,
            streetAddress: data?.address?.streetAddress,
            houseNumber: data?.address?.houseNumber,
            postalCode: data?.address?.postalCode,
            city: data?.address?.city,
            stateOrProvince: data?.address?.stateOrProvince,
            countryCode: data?.address?.countryCode,
            latitude: +data?.address?.latitude,
            longitude: +data?.address?.longitude,
            extraInfo: data?.address?.extraInfo
        },
        'step-3': {
            id: data?.id,
            peopleAllowed: data?.peopleAllowed,
            maxStayDays: data?.maxStayDays,
            minimumStayDays: data?.minimumStayDays,
            bedrooms: data?.bedrooms,
            beds: data?.beds,
            bathrooms: data?.bathrooms
        },
        'step-4': {
            id: data?.hostingDetails?.id,
            listingId: data?.hostingDetails?.listingId ?? data?.id,
            livesInProperty: data?.hostingDetails?.livesInProperty,
            hasPets: data?.hostingDetails?.hasPets,
            hostAgeRange: data?.hostingDetails?.hostAgeRange,
            hostGender: data?.hostingDetails?.hostGenderId,
            genderAllowedId: data?.hostingDetails?.genderAllowedId,
            livesWithFamily: data?.hostingDetails?.livesWithFamily,
            userId: data?.userId,
        },
        'step-5': {
            amenities: data?.bedroomAmenityMap,
        },
        'step-6': {
            listingAmenities: Object.values(data?.amenity?.amenities.reduce((acc: any, current: any) => {

                const key = current.amenityTypeId;
                
                if (!acc[key]) {

                    acc[key] = {
                        amenityTypeId: current.amenityTypeId,
                        id: current.id,
                        listingId: current.listingId,
                        roomNumber: current.roomNumber,
                        amenity: [],
                    }
                }

                acc[key].amenity.push({ amenityId: current.amenityId, toDelete: false, id: current.listingAmenityMap.id });

                return acc;
            }, {}))
        },
        'step-7': {
            id: data?.utilityMap?.id,
            cleaningIncluded: data?.utilityMap?.cleaningIncluded ? 1 : 0,
            cleaningFee: data?.utilityMap?.cleaningFee,
            internetIncluded: data?.utilityMap?.internetIncluded ? 1 : 0,
            gasIncluded: data?.utilityMap?.gasIncluded ? 1 : 0,
            electricIncluded: data?.utilityMap?.electricIncluded ? 1 : 0,
            waterIncluded: data?.utilityMap?.waterIncluded ? 1 : 0,
            listingId: data?.id
        },
        'step-8': {
            houseRules: data?.hostRulesMap.map((itm: any) => {
                
                return {
                    id: itm.id,
                    ruleId: itm.ruleId,
                    isAllowed: itm.isAllowed ? 1 : 0,
                    listingId: itm.listingId,
                }
            })
        },
        'step-9': {},
        'step-10': {},
        'step-11': {
            existing: data?.images.map((itm: any) => {
                return {
                    id: itm.id,
                    url: itm.url,
                    isPrimary: Boolean(itm.isPrimary),
                    amenityTypeId: itm.amenityTypeId,
                    listingId: itm.listingId

                }
            }),
            images: []
        },
    }
     
}


export type DropDownOptions = {
    currencyOptions: Array<{ id: number, name: string }>;
    listingTypeOptions: [];
    genderOptions: [];
    bedroomAmenityOptions: Array<{ id: number, name: string, icon: string }>;
    amenityTypeOptions: [];
    amenityOptions: [];
    houseRulesOptions: Array<{ id: number, name: string, icon: string }>;
}