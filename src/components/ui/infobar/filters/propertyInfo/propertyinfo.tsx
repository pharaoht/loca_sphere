'use client'
import useParams from '@/hooks/useParams';
import People from '../people/people';
import styles from './propertyinfo.module.css';

type InfoType = {
    label: string
    value: string
    type?: string
}

type PropertyType = {
    title: string
    info: InfoType[]
    name: string
    isDouble: boolean | null
    detail?: string | null
}

interface PropertyInfoProps {
    propertyInfoData: PropertyType[]
}

const CheckboxLegend: React.FC<PropertyType> = ({ title, info, name, isDouble = false, detail = '' }) => {

    const { getParam, setParam, deleteParam } = useParams();

    const cssClassName = isDouble ? styles.split : styles.fieldSet;

    const param = getParam(name)?.split(',') || '';

    const onClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        const cbInputName = event.currentTarget.name;
        const cbInputVal = event.currentTarget.value;
        const cbIsChecked = event.currentTarget.checked;

        const paramValue = getParam(cbInputName);
        const currentValues = paramValue?.split(',').filter(Boolean) || [];

        if (cbIsChecked) {
            // Add value
            const updatedValues = [...new Set([...currentValues, cbInputVal])];

            setParam([{ key: cbInputName, value: updatedValues.toString() }]);
    
        } else {
            // Remove value
            const updatedValues = currentValues.filter(val => val !== cbInputVal);

            if (updatedValues.length === 0) deleteParam([cbInputName]);
            else  setParam([{ key: cbInputName, value: updatedValues.toString() }]);
            
        }
    }

    return (
        <fieldset className={cssClassName}>
            <legend className={styles.legend}>
                <p>{title}</p>
                <span className={styles.detailSpan}>{detail}</span>
            </legend>
            {
                info.map((itm, idx) => {

                    const isDefault = param.includes(itm.value);

                    if(itm.type){

                        return (
                            <label key={idx} className={styles.fieldSetLabel}>
                                button
                            </label>
                        )
                    }
                    return (
                        
                        <label key={idx} className={styles.fieldSetLabel} >
                            <input type='checkbox' 
                                defaultChecked={isDefault} 
                                name={name}
                                value={itm.value} 
                                onChange={(e) => onClickHandler(e)}
                            />
                            {itm.label}
                        </label>
                    )
                })
            }
        </fieldset>
    )
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({ propertyInfoData }) => {

    if(propertyInfoData.length === 0){

        return (
            <div className={styles.noData}>
                No filters found...
            </div>
        )
    }

    return (
        <form className={styles.infoContainer}>
            <div className={styles.toggle}>
                <People />
            </div>
            {
                propertyInfoData.map((itm, idx) => (
                    <CheckboxLegend 
                        key={itm.name} 
                        title={itm.title} 
                        isDouble={itm.isDouble} 
                        info={itm.info} 
                        name={itm.name} 
                        detail={itm.detail}
                    />
                ))
            }
        </form>
    )
};


export const sampleData = [
    {
        title: 'Place',
        info: [
            { label: 'Apartment', value: '1'},
            { label: 'Studio', value: '2'},
            { label: 'Private bedroom', value: '3'},
            { label: 'Shared bedroom', value: '4'}
        ],
        name: 'listingType',
        isDouble: false
    },
    {
        title: 'Landlord',
        info: [
            { label: 'Instant booking', value: '1'},
            { label: 'Answers within 12h', value: '2'},
            { label: 'High response rate', value: '2'},
            { label: "Doesn't live in the property", value: '2'},
        ],
        name: 'landlord',
        isDouble: false
    },
    {
        title: 'Suitable for',
        info: [
            { label: 'Males', value: '1'},
            { label: 'Females', value: '2'},
            { label: 'Students', value: '2'},
            { label: "Professionals", value: '2'},
            { label: "Smokers", value: '2'},
            { label: "Pets", value: '2'},
            { label: "Overnight guests", value: '2'},
            { label: "Couples", value: '2'},
            { label: "Female only", value: '2'},
            { label: "Males only", value: '2'},
        ],
        name: 'suitablefor',
        isDouble: true
    },
    {
        title: 'Registration',
        info: [
            { label: 'Registration possible', value: '1'},
        ],
        name: 'registration',
        detail: 'Listings that allow registration on City Hall.',
        isDouble: false
    },
    {
        title: 'Typology',
        info: [
            { label: 'Bedrooms', value: '1', type: 'click', icon: ''},
            { label: 'Bathrooms', value: '2', type: 'click', icon: ''},
            { label: 'Private bathroom', value: '2'}
        ],
        name: 'typology',
        isDouble: false
    },
    {
        title: 'Bedroom',
        info: [
            { label: 'Wardrobe', value: '1'},
            { label: 'Desk/Table', value: '2'},
            { label: 'Chairs', value: '3'},
            { label: 'Sofa bed', value: '4'},
            { label: 'Window', value: '5'},
            { label: 'Balcony', value: '6'},
            { label: 'Double bed', value: '7'},
            { label: 'Single bed', value: '8'},
            { label: 'Bunk bed', value: '9'},
        ],
        name: 'brAmenities',
        isDouble: true
    },
    {
        title: 'House Admenities',
        info: [
            { label: 'Wi-Fi', value: '1' },
            { label: 'Cable TV', value: '2' },
            { label: 'Central heating', value: '3' },
            { label: 'Elevator', value: '4' },
            { label: 'Window', value: '5' },
            { label: 'Fridge', value: '6' },
            { label: 'Freezer', value: '7' },
            { label: 'Stove', value: '8' },
            { label: 'Oven', value: '9' },
            { label: 'Microwave', value: '10' },
            { label: 'Washing machine', value: '11' },
            { label: 'Dishes and cutlery', value: '12' },
            { label: 'Pots and pans', value: '13' },
            { label: 'Toilet', value: '14' },
            { label: 'Sink', value: '15' },
            { label: 'Shower', value: '16' },
            { label: 'Bathtub', value: '17' },
            { label: 'Sofa', value: '18' },
            { label: 'Coffee table', value: '19' },
            { label: 'TV', value: '20' },
            { label: 'Sofa bed', value: '21' },
            { label: 'Chairs', value: '22' },
            { label: 'Table', value: '23' },
            { label: 'Bed linen and towels', value: '24' },
            { label: 'Accessibility', value: '25' },
            { label: 'Air conditioning', value: '26' }
        ],
        name: 'houseAdmenities',
        isDouble: true
    },
    {
        title: 'Verification',
        info: [
            { label: 'Trusted landlords', value: '1'},
            { label: 'Checked places', value: '2'},
        ],
        name: 'isVerified',
        isDouble: false
    }
]

export default PropertyInfo;