
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

    const cssClassName = isDouble ? styles.split : styles.fieldSet;



    const handleOnClick = (event: React.MouseEvent<HTMLLabelElement>) => {

        event.preventDefault();
    }

    return (
        <fieldset className={cssClassName}>
            <legend className={styles.legend}>
                <p>{title}</p>
                <span className={styles.detailSpan}>{detail}</span>
            </legend>
            {
                info.map((itm, idx) => {

                    if(itm.type){

                        return (
                            <label key={idx} className={styles.fieldSetLabel}>
                                button
                            </label>
                        )
                    }
                    return (
                        
                        <label key={idx} className={styles.fieldSetLabel} >
                            <input type='checkbox' name={name} value={itm.value}/>
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
        <div className={styles.infoContainer}>
            <div className={styles.toggle}>
                <People />
            </div>
            {
                propertyInfoData.map((itm, idx) => (
                    <CheckboxLegend 
                        key={idx} 
                        title={itm.title} 
                        isDouble={itm.isDouble} 
                        info={itm.info} 
                        name={itm.name} 
                        detail={itm.detail}
                    />
                ))
            }
        </div>
    )
};


export const sampleData = [
    {
        title: 'Place',
        info: [
            { label: 'Entire Place', value: '1,2'},
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
            { label: 'Single bed', value: '1'},
            { label: 'Double bed', value: '2'},
            { label: 'Twin bed', value: '2'},
            { label: '3+ beds', value: '2'},
            { label: 'Wardrobe', value: '2'},
            { label: 'Window', value: '2'},
            { label: 'Balcony', value: '2'},
            { label: 'Desk', value: '2'},
            { label: 'Lock', value: '2'},
            { label: 'Unfurnished', value: '2'},
        ],
        name: 'bedroom',
        isDouble: true
    },
    {
        title: 'House Admenities',
        info: [
            { label: 'Wi-fi', value: '1'},
            { label: 'Central heating', value: '2'},
            { label: 'Dishwasher', value: '2'},
            { label: 'Washing machine', value: '2'},
            { label: 'Microwave', value: '2'},
            { label: 'Oven', value: '2'},
            { label: 'Tv', value: '2'},
            { label: 'Air conditioning', value: '2'},
            { label: 'Outdoor area', value: '2'},
            { label: 'Elevator', value: '2'},
            { label: 'Accessibility needs', value: '2'},
            { label: 'Unfurnished', value: '2'},
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