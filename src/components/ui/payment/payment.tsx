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
                    <h2>Payment details</h2>
                    <button onClick={() => setShow(prev => !prev)} type='button'>Edit</button>
                </BookingRequestFormGrid.FormItem>

                <BookingRequestFormGrid.FormItem size="full">
                    <div>
                        <h3>deatils</h3>
                        <BookingRequestFormGrid.FormItem size="full">
                            <label>Name on card</label>
                            <input type="text" />
                        </BookingRequestFormGrid.FormItem>
                    </div>
                </BookingRequestFormGrid.FormItem>
            </>
        </BookingRequestFormGrid>
    )
};


export default PaymentDetailForm