'use client';

import BookingRequestFormGrid from '@/app/booking/[listingId]/form/form';
import { useState } from 'react';

export default function PersonalDetailsForm( ) {

    const [ show, setShow ] = useState<boolean>(true);

    const onSubmitHandler = async () => {

    };

    return (
        <>
            <BookingRequestFormGrid formSubmitHandler={onSubmitHandler}>
                <>
                    <BookingRequestFormGrid.FormItem size='full' className='headerGroup'>
                        <h2>Personal details</h2>
                        <button onClick={() => setShow(prev => !prev)} type='button'>Edit</button>
                    </BookingRequestFormGrid.FormItem>
                    { show && 
                        <>
                            <BookingRequestFormGrid.FormItem size='half'>
                                <label htmlFor='email'>Email</label>
                                <input id='email' type='text' />
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='quarter'>
                                <label htmlFor='countryCode'>Country Code</label>
                                <input type='text' id='countryCode'/>
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='quarter'>
                                <label htmlFor='phoneNumber'>Phone number</label>
                                <input type='text' id='phoneNumber' />
                            </BookingRequestFormGrid.FormItem>


                            <BookingRequestFormGrid.FormItem size='half'>
                                <label htmlFor='firstName'>First Name</label>
                                <input type='text' id='firstName' />
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='half'>
                                <label htmlFor='lastName'>Last Name</label>
                                <input type='text' id='lastName' />
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='half'>
                                <label htmlFor='birthday'>Birthday</label>
                                <input type='date' id='birthday' />
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='half'>
                                <fieldset>
                                    <legend>Gender</legend>
                                    <div>
                                        <div>
                                            <input type='radio' id='gender-male' name='gender' />
                                            <label htmlFor='gender-male'>Male</label>
                                        </div>
                                        <div>
                                            <input type='radio' id='gender-female' name='gender' />
                                            <label htmlFor='gender-female'>Female</label>
                                        </div>
                                    </div>
                                </fieldset>
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='half'>
                                <label htmlFor='nationality' >Nationality</label>
                                <input type='text' id='nationality' />
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='half'>
                            <label htmlFor='occupation'>Occupation</label>
                                <input type='text' id='occupation'/>
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='full'>
                                <label htmlFor='destination'>Destination University/Place of work</label>
                                <input type='text' id='destination'/>
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='full'>
                                <fieldset>
                                    <legend>Keep me updated with exclusive deals and promotions:</legend>
                                    <div>
                                        <div>
                                            <input id='v' type='checkbox' />
                                            <label htmlFor='v'>Via email <span>(optional)</span></label>
                                        </div>

                                        <div>
                                            <input id='w' type='checkbox' />
                                            <label htmlFor='w'>Via Whatsapp</label>
                                        </div>
                                    </div>
                                </fieldset>
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='full'>
                                <label htmlFor='message'>Write a message to your landlord </label>
                                <p>Landlords are more likely to accept your request if you share your reasons for moving, your work or studies, and details about yourself and companions.</p>
                                <textarea id='message'></textarea>
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='quarter'>
                                <button type='button'>Save personal details</button>
                            </BookingRequestFormGrid.FormItem>

                            <BookingRequestFormGrid.FormItem size='full'>
                                <hr></hr>
                            </BookingRequestFormGrid.FormItem>
                        </>
                    }
                </>
            </BookingRequestFormGrid>
                
        </>
    )

}

