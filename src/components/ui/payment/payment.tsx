'use client'
import BookingRequestFormGrid from "@/app/booking/[listingId]/form/form";
import { useState } from "react";

const PaymentDetailForm = () => {

    const [ show, setShow ] = useState<boolean>(true);

    const onSubmitHandler = async () => {

    };

    return (
        <BookingRequestFormGrid formSubmitHandler={onSubmitHandler}>
            <>
                <BookingRequestFormGrid.FormItem size='full' className='headerGroup'>
                    <h2>2. Payment details</h2>
                    <button onClick={() => setShow(prev => !prev)} type='button'>Edit</button>
                </BookingRequestFormGrid.FormItem>


                <h3>deatils</h3>
                <BookingRequestFormGrid.FormItem size="full">
                    <label>Name on card</label>
                    <input type="text" />
                </BookingRequestFormGrid.FormItem>

                <BookingRequestFormGrid.FormItem size="half">
                    <label>Card number</label>
                    <input type='number' />
                </BookingRequestFormGrid.FormItem>

                <BookingRequestFormGrid.FormItem size='quarter'>
                    <label>Expiration date</label>
                    <input type="text" />
                </BookingRequestFormGrid.FormItem>
                <BookingRequestFormGrid.FormItem size='quarter'>
                    <label>CVC</label>
                    <input type="text" />
                </BookingRequestFormGrid.FormItem>

                <h4>Or choose another method</h4>
                <BookingRequestFormGrid.FormItem size='quarter'>
                    <label>Card</label>
                    <input type="text" />
                </BookingRequestFormGrid.FormItem>
            

            </>
        </BookingRequestFormGrid>
    )
};


export default PaymentDetailForm