import listingsApi from '@/api/listings/listings.api';
import SectionWrapper from '../../section/section';
import styles from './services.module.css';
import Image from 'next/image';


interface Props {
    id: string;
    utilityMap: Utility
}

type Utility = {
    waterIncluded: boolean,
    electricIncluded: boolean,
    gasIncluded: boolean,
    internetIncluded: boolean,
    cleaningIncluded: boolean,
    cleaningFee: number | null,
    securityDeposit: number,
    currency: string
}

const Services: React.FC<Props> = async ({ id, utilityMap }) => {

    if (!id || !utilityMap){

        return (
            <SectionWrapper id='servicesandexpenses' headerText='Services and expenses'>
                <p>No services found...</p>
            </SectionWrapper>
        )
    };

    const { waterIncluded, electricIncluded, gasIncluded, internetIncluded, cleaningIncluded, cleaningFee, securityDeposit, currency } = utilityMap;

    const isIncluded = (condition: boolean) => {

        return (
            <>
                {
                    !condition ? 
                        <>
                            <Image src='/x-circle.png' alt='imag' height={30} width={30} />
                            <span>Not included in the price</span>
                        </>
                            :
                        <>
                            <Image src='/green-check.png' alt='imag' height={30} width={30} />
                            <span className={styles.green}>Included in the price</span>
                        </>
                }
            </>
        )
    }

    return (
        <SectionWrapper id='servicesandexpenses' headerText='Services and expenses'>
            <p><b>Extra services, expenses and fees to be paid directly to the Landlord</b></p>

            <div className={styles.servicesPayment}>
                <h3>One-time payments</h3>
                <div className={styles.spSd}>
                    <h4>Security deposit</h4>
                    <h4><b>{currency} {securityDeposit}</b></h4>
                </div>
                <span>Refundable payment to be made directly to Landlord, which should be refunded if you meet all the rental conditions.</span>
            </div>

            <div className={styles.servicesPayment}>
                <h3>Fixed Monthly Bills</h3>

                <dl className={styles.spFMB}>
                    <div className={styles.spFMBContainer}>
                        <dt>Water</dt>
                        <dd className={styles.spAmenity}>
                            {isIncluded(waterIncluded)}
                        </dd>
                    </div>

                    <div className={styles.spFMBContainer}>
                        <dt>Electricity</dt>
                        <dd className={styles.spAmenity}>
                           {isIncluded(electricIncluded)}
                        </dd>
                    </div>
                    
                    <div className={styles.spFMBContainer}>
                        <dt>Internet</dt>
                        <dd className={styles.spAmenity}>
                            {isIncluded(internetIncluded)}
                        </dd>
                    </div>

                    <div className={styles.spFMBContainer}>
                        <dt>Gas</dt>
                        <dd className={styles.spAmenity}>
                            {isIncluded(gasIncluded)}
                        </dd>
                    </div>
                </dl>
            </div>

            <div className={styles.servicesPayment}>
                <h3>Other fees</h3>
                <div >
                    <div className={styles.spSd}>
                        <h4>Admin fee in advance</h4>
                        <h4><b>{currency} 75</b></h4>
                    </div>
                    <p>One time fee charged in advance for necessary maintenance.</p>
                </div>

                <div>
                    <div className={styles.spSd}>
                        <h4>Cleaning fee</h4>
                        <h4><b>{ cleaningIncluded ? 'Included' : `${currency} ${cleaningFee}` }</b></h4>
                    </div>
                    {
                        cleaningIncluded ? <p>One less thing on your to-do list! Cleaning is covered for you.</p> : <p></p>
                    }
                    
                </div>


            </div>
        </SectionWrapper>
    )
};

export default Services;