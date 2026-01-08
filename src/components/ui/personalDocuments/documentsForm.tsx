import BookingRequestFormGrid from "@/app/booking/[listingId]/form/form"
import Image from "next/image";
import { useState } from "react";
import LoadingVisual from "../loader/loader";
import styles from '@/app/booking/[listingId]/form/formstyles.module.css';

interface ComponentProps {
    loadingState: boolean
    submitHandler: (...args: any) => void;
}

interface formStateProps {
    additionalInfo: string;
    updateViaEmail: boolean;
    updateViaText: boolean;
}

const defaultFormProps: formStateProps = {
    additionalInfo: '',
    updateViaEmail: false,
    updateViaText: false
}

const BookingConfirmationForm: React.FC<ComponentProps> = ({ submitHandler, loadingState }) => {

    const [formState, setFormState] = useState<formStateProps>(defaultFormProps);
    const [ show, setShow ] = useState<boolean>(true);
    const cssTransition = show ? null : styles.hide;

    const onUpdateField = (e: React.SyntheticEvent<HTMLTextAreaElement >) => {

        const target = e.currentTarget.value;
        const name = e.currentTarget.name;

        setFormState(prevState => ({
            ...prevState,
            [name]: target
        }))
    }

    return (
        <>
            <BookingRequestFormGrid formSubmitHandler={() => {}}>
                <>
                    <BookingRequestFormGrid.FormItem size='full' className='headerGroup' customClass={show ? 'redButton' : ''}>
                        <h2>3. Submit Request</h2>
                        <button 
                            onClick={() => setShow(prev => !prev)} 
                            type='button'
                        >
                            {show && <><img src='/x.svg' width={20} height={20} alt='' />Close</>}
                            {!show && <><Image src='/pencil.avif' width={20} height={20} alt='' />Edit</>}
                        </button>
                    </BookingRequestFormGrid.FormItem>

                    <div className={`${styles.subFormGrid} ${cssTransition}`}>
                        <BookingRequestFormGrid.FormItem size='full'>
                            <fieldset>
                                <legend>Keep me updated with exclusive deals and promotions <span>(optional)</span>: </legend>
                                <div>
                                    <div>
                                        <input id='updateViaEmail' type='checkbox' />
                                        <label htmlFor='updateViaEmail'>Via email </label>
                                    </div>

                                    <div>
                                        <input id='updateViaText' type='checkbox' />
                                        <label htmlFor='updateViaText'>Via Whatsapp</label>
                                    </div>
                                </div>
                            </fieldset>
                        </BookingRequestFormGrid.FormItem>

                        <BookingRequestFormGrid.FormItem size='full'>
                            <label htmlFor='additionalInfo'>Write a message to your landlord </label>
                            <span>Landlords are more likely to accept your request if you share your reasons for moving, your work or studies, and details about yourself and companions.</span>
                            <textarea id='additionalInfo' name='additionalInfo' onChange={onUpdateField}></textarea>
                        </BookingRequestFormGrid.FormItem>
                    </div>
                        
                    
                    <BookingRequestFormGrid.FormItem size='full'  customClass='blueButton' style={{ flexDirection: 'row-reverse' }}>
                        <button type="button" onClick={() => submitHandler(formState)}>
                            { !loadingState ? 
                                <> Submit booking request <Image src='/arrow-right.png' width={30} height={25} alt="" /> </>
                                : <LoadingVisual/> 
                            }
                        </button>
                    </BookingRequestFormGrid.FormItem>
                </>
            </BookingRequestFormGrid>
        </>
    )
};

export default BookingConfirmationForm;