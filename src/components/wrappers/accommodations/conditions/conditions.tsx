import SectionWrapper from "../../section/section";
import Image from "next/image";
import styles from './conditions.module.css'

interface ConditionsProps {
    hostRulesMap: Array<{[key: string]: string}>
}

const Conditions: React.FC<ConditionsProps> = ({ hostRulesMap = []}) => {

    
    return (
        <SectionWrapper id='rentalConditions' headerText='Rental Conditions'>
            <div>
                <h4>Requirements</h4>
                <p>You have to provide the landlord with these documents:</p>
                <ul>
                    <li>Tenancy agreement</li>
                    <li>Passport or ID</li>
                </ul>
            </div>
            <ul className={styles.ruleContainer}>
                {
                    hostRulesMap.length > 0 && (
                        hostRulesMap.map((itm, idx) => (
                            <li key={itm.id} className={`${styles.rule} ${itm.isAllowed ? styles.none : styles.strikeThrough}`}>
                                <Image src={itm.icon} alt={`icon: ${itm.ruleName}`} height={40} width={40} />
                                <span>{itm.ruleName}</span>
                            </li>
                        ))
                    )
                }
                {/* <li>
                    <Image src='/calender-icon.png' alt='' height={25} width={25} />
                    <span>Minimum stay 210 nights</span>
                </li>
                <li>
                    <Image src='/calender-icon.png' alt='' height={25} width={25} />
                    Overnight guests allowed
                </li>
                <li>
                    <Image src='/calender-icon.png' alt='' height={25} width={25} />
                    Couples allowed
                </li>
                <li>
                    <Image src='/calender-icon.png' alt='' height={25} width={25} />
                    Pets allowed
                </li>
                <li>
                    <Image src='/calender-icon.png' alt='' height={25} width={25} />
                    Smoking allowed
                </li> */}
            </ul>
        </SectionWrapper>
    )
};

export default Conditions;