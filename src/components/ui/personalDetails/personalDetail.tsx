'use client';
import BookingRequestFormGrid from '@/app/booking/[listingId]/form/form';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { UserInfo } from '@/hooks/useAuth';
import LoadingVisual from '../loader/loader';

type formProps = {
    email: string,
    countryCode: string,
    phoneNumber: string,
    givenName: string,
    surName: string,
    birthday: string,
    gender: string,
    nationality: string,
    occupation: string,
    placeOfWork?: string,
}

interface ComponentProps {
    nationalities: Array<{id: number, countryName: string}>
    occupations: Array<any>
    submitHandler: (...args: any) => void
    userInfo: UserInfo |  null
    token: string | null | undefined;
    loadingState: boolean;
    inValidInputs: Array<{}>;
    returnUrl: string;
    isLoggedIn: boolean;
}

const defaultProps: formProps = {
    email: '',
    countryCode: '',
    phoneNumber: '',
    givenName: '',
    surName: '',
    birthday: '',
    gender: '',
    nationality: '',
    occupation: '',
    placeOfWork: '',
} 

//todo: display form validation errors
// add country code drop down
//add date validations, nothing in the future, and minimum age of 18
//add color to button, loading states.

const PersonalDetailsForm: React.FC<ComponentProps> = ({ nationalities, occupations, submitHandler, userInfo, token, loadingState, inValidInputs, returnUrl, isLoggedIn }) => {

    const [ show, setShow ] = useState<boolean>(true);
    const [formState, setFormState] = useState<formProps>(defaultProps);

    const onUpdateField = (e: React.SyntheticEvent<HTMLInputElement | HTMLSelectElement>) => {

        const target = e.currentTarget.value;
        const name = e.currentTarget.name;

        setFormState( prevState => ({
            ...prevState,
            [name]: target
        }))
    }

    const isValidArray = (arr: Array<any> = []) => {

        return Array.isArray(arr) && arr.length > 0;
    }

    useEffect(() => {

        if(userInfo){

            setFormState(prevState => ({
                ...prevState,
                email: userInfo.email,
                countryCode: userInfo.countryCode ? String(userInfo.countryCode) : '',
                givenName: userInfo.givenName,
                surName: userInfo.surName,
                nationality: userInfo.nationality ? String(userInfo.nationality) : '',
                occupation: userInfo.occupation ? String(userInfo.occupation) : '',
                phoneNumber: userInfo.phoneNumber ? String(userInfo.phoneNumber) : '',
                gender: userInfo.gender ? String(userInfo.gender) : '',
                birthday: userInfo.birthday || '',
                placeOfWork: userInfo.placeOfWork || '',

            }))
        }
    }, [ userInfo ])

    return (
        <>

            <BookingRequestFormGrid formSubmitHandler={() => {}}>
                <>
                    { !token &&
                        <BookingRequestFormGrid.FormItem 
                            size='full' 
                            className='headerGroup' 
                            style={{ padding: '1rem', lineHeight: '1rem', borderRadius: '10px', backgroundColor: 'var(--five-blue)', color: 'black'}}
                        >
                            <p>
                                <Link href={`/login?returnTo=${returnUrl}`}>Log in</Link> for a faster checkout using your saved details, or <Link href='/sign-up'>sign up</Link> to manage and track your bookings easily.
                            </p>
                        </BookingRequestFormGrid.FormItem>
                    }
                    <BookingRequestFormGrid.FormItem size='full' className='headerGroup'>
                        <h2>1. Personal Information</h2>
                        <button 
                            onClick={() => setShow(prev => !prev)} 
                            type='button'
                        >
                            {show && <><img src='/x.svg' width={20} height={20} alt='' />Close</>}
                            {!show && <><Image src='/pencil.avif' width={20} height={20} alt='' />Edit</>}
                        </button>
                    </BookingRequestFormGrid.FormItem>
                    { show && 
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', width: '100%', gridColumn: 'span 4'}}>
                            <BookingRequestFormGrid.FormItem size='half'>
                                <label htmlFor='email'>Email</label>
                                <input 
                                    id='email' 
                                    name='email' 
                                    type='text' 
                                    placeholder='Enter your email '
                                    onChange={onUpdateField} 
                                    value={formState?.email}  
                                    
                                />
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='quarter'>
                                <label htmlFor='countryCode'>Country Code</label>
                                <input 
                                    type='text' 
                                    id='countryCode' 
                                    name='countryCode' 
                                    onChange={onUpdateField} 
                                    value={formState?.countryCode} 
                                />
                            </BookingRequestFormGrid.FormItem>
 
                            <BookingRequestFormGrid.FormItem size='quarter'>
                                <label htmlFor='phoneNumber'>Phone number</label>
                                <input 
                                    type='text' 
                                    id='phoneNumber' 
                                    name='phoneNumber' 
                                    onChange={onUpdateField} 
                                    value={formState?.phoneNumber} 
                                />
                            </BookingRequestFormGrid.FormItem>


                            <BookingRequestFormGrid.FormItem size='half'>
                                <label htmlFor='givenName'>First Name</label>
                                <input 
                                    type='text' 
                                    id='givenName' 
                                    name='givenName' 
                                    placeholder='Enter your first name'
                                    onChange={onUpdateField} 
                                    value={formState?.givenName} 
                                />
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='half'>
                                <label htmlFor='surName'>Last Name</label>
                                <input
                                    type='text' 
                                    id='surName' 
                                    name='surName' 
                                    placeholder='Enter your last name'
                                    onChange={onUpdateField} 
                                    value={formState?.surName} 
                                />
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='half'>
                                <label htmlFor='birthday'>Birthday</label>
                                <input type='date' id='birthday' name='birthday' onChange={onUpdateField} value={formState?.birthday}  />
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='half'>
                                <fieldset>
                                    <legend>Gender</legend>
                                    <div>
                                        <div>
                                            <input 
                                                type='radio' 
                                                id='gender-male' 
                                                name='gender' 
                                                value={'1'}
                                                checked={formState.gender == '1'} 
                                                onChange={onUpdateField}
                                            />
                                            <label htmlFor='gender-male'>Male</label>
                                        </div>
                                        <div>
                                            <input 
                                                type='radio' 
                                                id='gender-female' 
                                                name='gender' 
                                                value={'2'}
                                                checked={formState.gender == '2'} 
                                                onChange={onUpdateField}
                                            />
                                            <label htmlFor='gender-female'>Female</label>
                                        </div>
                                    </div>
                                </fieldset>
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='half'>
                                <label htmlFor='nationality' >Nationality</label>
                                <select id='nationality' name='nationality' onChange={onUpdateField} value={formState.nationality}>
                                    <option value=''>Choose your nationality</option>
                                    {
                                        isValidArray(nationalities) && nationalities?.map((itm, idx) => (
                                            <option key={itm.id} value={itm.id}>{itm.countryName}</option>
                                        ))
                                    }
                                </select>
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='half'>
                                <label htmlFor='occupation'>Occupation</label>
                            <select id='occupation' name='occupation' onChange={onUpdateField} value={formState.occupation}>
                                    <option value=''>Choose your Occupation</option>
                                    {
                                        isValidArray(occupations) && occupations?.map((itm, idx) => (
                                            <option key={itm.id} value={itm.id}>{itm.occupationName}</option>
                                        ))
                                    }
                                </select>
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='full'>
                                <label htmlFor='placeOfWork'>Destination University/Place of work</label>
                                <input 
                                    type='text' 
                                    id='placeOfWork' 
                                    name='placeOfWork'
                                    placeholder='University of London / Freelancer'
                                    onChange={onUpdateField} 
                                    value={formState?.placeOfWork}
                                />
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='full' customClass='blueButton' style={{flexDirection: 'row-reverse'}} >
                                <button 
                                    onClick={() => submitHandler(formState)} 
                                    type='button'
                                    disabled={loadingState}
                                >
                                    { !loadingState ? 'Save personal details' : <LoadingVisual/> }
                                </button>
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='full'>
                                <hr></hr>
                            </BookingRequestFormGrid.FormItem>
                        </div>
                    }
                </>
            </BookingRequestFormGrid>
                
        </>
    )

}

export default PersonalDetailsForm;