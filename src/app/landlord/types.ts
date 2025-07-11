export const stepKeys = [
    'step-1', 'step-2', 'step-3', 'step-4', 'step-5',
    'step-6', 'step-7', 'step-8', 'step-9', 'step-10', 'step-11', 'step-12'
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
    ['step-3', { title: 'Accommodation and Stay Limits', index: 2}],
    ['step-4', { title: 'Host Information', index: 3}],
    ['step-5', { title: 'House rules', index: 4}],
    ['step-6', { title: 'Resident landlord', index: 5}],
    ['step-7', { title: 'Bedroom', index: 6}],
    ['step-8', { title: 'Bedroom amenities', index: 7}],
    ['step-9', { title: 'Restrictions', index: 8}],
    ['step-10', { title: 'Rent & Bills', index: 9}],
    ['step-11', { title: 'Availability', index: 10}],
    ['step-12', { title: 'Title & Description', index: 11}],
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
    'step-5': {},
    'step-6': {},
    'step-7': {},
    'step-8': {},
    'step-9': {},
    'step-10': {},
    'step-11': {},
    'step-12': {},

} as const;

export type DefaultStateType = {
    'step-1': Step1State
    'step-2': Step2State
    'step-3': Step3State
    'step-4': Step4State
    'step-5': {}
    'step-6': {}
    'step-7': {}
    'step-8': {}
    'step-9': {}
    'step-10': {}
    'step-11': {}
    'step-12': {}
    

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
            hostGender: data?.hostingDetails?.hostGender,
            genderAllowedId: data?.hostingDetails?.genderAllowedId,
            livesWithFamily: data?.hostingDetails?.livesWithFamily,
            userId: data?.userId,
        },
        'step-5': {},
        'step-6': {},
        'step-7': {},
        'step-8': {},
        'step-9': {},
        'step-10': {},
        'step-11': {},
        'step-12': {},
    }
     
}