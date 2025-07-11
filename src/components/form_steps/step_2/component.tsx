import { Step2State } from "@/app/landlord/types";
import { StepComponentProps } from "../step_1/component";
import styles from '../step_1/styles.module.css';
import InputGroup from "@/components/ui/input/input/input";
import { useEffect, useRef, useState } from "react";
import addressApi from "@/api/address/address.api";
import SearchInput from "@/components/ui/input/search/search";

const StepTwoComponent: React.FC<StepComponentProps<Step2State>> = ({ isPending, stepState, setFormState, errorFormState }) => {

    const [ address, setAddress ] = useState([]);

    const skipEffectRef = useRef(false);

    const getGeoData = async (mapboxId: string) => {

        skipEffectRef.current = true;

        await addressApi.httpFetGeoCodingAddress(mapboxId, cb, true);

        function cb(addy: any){

            const a = {
                streetAddress: addy.context.address.name,
                houseNumber: addy?.context.address?.address_number,
                postalCode: addy?.context.postcode.name,
                city: addy?.context?.locality?.name
                    ?? addy?.context?.place?.name
                    ?? addy?.context?.district?.name,
                stateOrProvince: addy?.context.region?.name,
                countryCode: addy?.context.country?.country_code,
                latitude: Math.round(addy.coordinates.latitude * 1e8) / 1e8,
                longitude: Math.round(addy.coordinates.longitude * 1e8) / 1e8,
            };

            setFormState(a)
        }
    }

    useEffect(() => {

        if (skipEffectRef.current){

            skipEffectRef.current = false;

            return
        }

        const fetchData = async () => {

            if(stepState.streetAddress){
                await addressApi.httpFetGeoCodingAddress(stepState.streetAddress, setAddress);
            }
            
        }

        let timer;

        timer = setTimeout(() => fetchData(), 500)

        return () => clearTimeout(timer);

    }, [ stepState.streetAddress ]);

    return (
        <section className={styles.sectionContainer}>
            <h1 className={styles.headerTitle}>Address</h1>
            <h3 className={styles.subHeader}>Enter your property information here.</h3>
            <div className={styles.formGrid}>
                <SearchInput
                    label="Street name"
                    idnName="streetAddress"
                    suggestions={address}   
                    inputValue={stepState.streetAddress}
                    onChange={(e) => setFormState({ [e.target.name]: e.target.value })}
                    onClickHandler={getGeoData}
                />

                <div className={styles.formGroupRow}>
                    <InputGroup
                        label="House number"
                        inputType="text"
                        idnName='houseNumber'
                        isRequired={true}
                        isDisabled={isPending}
                        inputValue={stepState.houseNumber}
                        onChangeHandler={(e) => setFormState({ [e.target.name]: e.target.value })}
                    />
                    <InputGroup
                        label="Postal code"
                        inputType="text"
                        idnName="postalCode"
                        inputValue={stepState.postalCode}
                        onChangeHandler={(e) => setFormState({ [e.target.name]: e.target.value })}
                    />
                    <InputGroup
                        label="City"
                        inputType="text"
                        idnName="city"
                        inputValue={stepState.city}
                        onChangeHandler={(e) => setFormState({ [e.target.name]: e.target.value })}
                    />

                </div>

                <div  className={styles.formGroupRow}>
                    <InputGroup
                        label="State or Province"
                        inputType="text"
                        idnName="stateOrProvince"
                        inputValue={stepState.stateOrProvince}
                        onChangeHandler={(e) => setFormState({ [e.target.name]: e.target.value })}
                    />
                    <InputGroup
                        label="Country code"
                        inputType="text"
                        idnName="countryCode"
                        inputValue={stepState.countryCode}
                        onChangeHandler={(e) => setFormState({ [e.target.name]: e.target.value })}
                    />
                    <div className={styles.formGroup}>
                        <label></label>
                        <div className={styles.inputWrapper}>

                        </div>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='description'>Extra info</label>
                    <textarea
                        id='extraInfo'
                        name='extraInfo'
                        disabled={isPending}
                        value={stepState.extraInfo ?? ''}
                        placeholder="Apartment number 9"
                        onChange={(e) => setFormState({ [e.target.name]: e.target.value })}
                    >
                    </textarea>
                </div>

            </div>
        </section>
    )
};


export default StepTwoComponent;