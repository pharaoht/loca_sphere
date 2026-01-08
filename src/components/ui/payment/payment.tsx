'use client'
import BookingRequestFormGrid from "@/app/booking/[listingId]/form/form";
import { useState } from "react";
import Image from "next/image";

const PaymentDetailForm = () => {

    const [ show, setShow ] = useState<boolean>(false);

    const onSubmitHandler = async () => {

    };

    return (
        <BookingRequestFormGrid formSubmitHandler={onSubmitHandler}>
            <>
                <BookingRequestFormGrid.FormItem size='full' className='headerGroup'>
                    <h2>2. Payment Method</h2>
                    <button 
                        onClick={() => setShow(prev => !prev)} 
                        type='button'
                    >
                            {show && <><img src='/x.svg' width={20} height={20} alt='' />Close</>}
                            {!show && <><Image src='/pencil.avif' width={20} height={20} alt='' />Edit</>}
                    </button>
                </BookingRequestFormGrid.FormItem>

                { show && 
                    <>
                        <BookingRequestFormGrid.FormItem size="quarter">
                            <button type="button">
                                <img  src='/gpay.svg' height={25} />
                            </button>
                        </BookingRequestFormGrid.FormItem>
                        <BookingRequestFormGrid.FormItem size="quarter">
                            <button type="button">
                                <img src='/paypal.svg' height={25} />
                            </button>
                        </BookingRequestFormGrid.FormItem>

                        <BookingRequestFormGrid.FormItem size='full' customClass='blueButton' style={{ flexDirection: 'row-reverse' }}>
                            <button type="button">
                                Save payment method
                            </button>
                        </BookingRequestFormGrid.FormItem>

                        <BookingRequestFormGrid.FormItem size="full">
                            <hr></hr>
                        </BookingRequestFormGrid.FormItem>
                    </>
                }

                
            </>
        </BookingRequestFormGrid>
    )
};


export default PaymentDetailForm