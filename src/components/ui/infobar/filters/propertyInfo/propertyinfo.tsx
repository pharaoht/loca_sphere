import styles from './propertyinfo.module.css';

type InfoType = {
    label: string
    value: string
}

type PropertyType = {
    title: string
    info: InfoType[]
    name: string
    isDouble: boolean | null
}

interface PropertyInfoProps {
    propertyInfoData: PropertyType[]
}

const CheckboxLegend: React.FC<PropertyType> = ({ title, info, name, isDouble = false}) => {

    const cssClassName = isDouble ? styles.split : styles.fieldSet;

    return (
        <fieldset className={cssClassName}>
            <legend className={styles.legend}>{title}</legend>
            {
                info.map((itm, idx) => (
                    <label key={idx} className={styles.fieldSetLabel}>
                        <input type='checkbox' name={name} value={itm.value}/>
                        {itm.label}
                    </label>
                ))
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
            {
                propertyInfoData.map((itm, idx) => (
                    <CheckboxLegend 
                        key={idx} 
                        title={itm.title} 
                        isDouble={itm.isDouble} 
                        info={itm.info} 
                        name={itm.name} 
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
            { label: 'Test', value: '1'},
            { label: 'Test 2', value: '2'},
            { label: 'Test 3', value: '2'}
        ],
        name: 'test',
        isDouble: false
    },
    {
        title: 'Type',
        info: [
            { label: 'Test', value: '1'},
            { label: 'Test 2', value: '2'},
            { label: 'Test 3', value: '2'}
        ],
        name: 'test',
        isDouble: true
    },
]

export default PropertyInfo;