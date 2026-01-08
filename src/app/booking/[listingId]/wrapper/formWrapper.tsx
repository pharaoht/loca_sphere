'use client';
import bookingApi from "@/api/booking/booking.api";
import userApi from "@/api/user/user.api";
import PaymentDetailForm from "@/components/ui/payment/payment";
import PersonalDetailsForm from "@/components/ui/personalDetails/personalDetail";
import BookingConfirmationForm from "@/components/ui/personalDocuments/documentsForm";
import { useAuthContext } from "@/context/auth.context";
import useParams from "@/hooks/useParams";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface ComponentProps {
    nationalities: Array<any>,
    occupations: Array<any>,
    moveIn: string,
    moveOut: string,
    listingId: string,
    guests: string,
};

const BookingFormWrapper: React.FC<ComponentProps> = ({ nationalities, occupations, moveIn, moveOut, listingId, guests }) => {

    const { userInfo, isLoading, token } = useAuthContext();

    const { getCurrentUrl } = useParams();

    const [ loadingState, setLoadingState ] = useState<Record<string, boolean>>({
        personalDetailLoadState: false,
        paymentDetailLoadState: false,
        bookingSubmitLoadState: false,
    });

    const [ inValidInputs, setInValidInputs ] = useState([]);

    const isLoggedIn = userInfo && token ? true : false;

    if(isLoading) return <>Loading...</>

    const personalDetailSubmitHandler = async (formState: any) => {

        if (!isLoggedIn) return toast.error('Please login to continue.');


        try {

            setLoadingState(prev => ({
                ...prev,
                personalDetailLoadState: true
            }));

            const results = await userApi.httpPatchUpdateUserProfile(token || '', formState);

            if (results.data.success == false || results.success == false){
                setInValidInputs(results.data)
                return toast.error(`Error occurred | "${results.data.message || results.message}" | Status code ${results.data.statusCode || results.statusCode}`)
            }

            return toast.success('Saved Successfully!');
        }
        catch(error){

            console.error(error);
        }
        finally {
            setLoadingState(prev => ({
                ...prev,
                personalDetailLoadState: false
            }));
        }
    };

    const paymentDetailSubmitHandler = async () => {};

    const bookingSubmitHandler = async (bookingConfirmation: any) => {

        if(!token) return toast.error('Please register/login before submitting a request');
        //Accessing a missing property in JavaScript/TypeScript is safe.
        if(typeof bookingConfirmation.additionalInfo !== 'string' || bookingConfirmation.additionalInfo.trim().length ===  0){
            return toast.error('Please fill out Step 3')
        }

        try{
            setLoadingState(prev => ({
                ...prev,
                bookingSubmitLoadState: true
            }));

            const req = {
                ...bookingConfirmation,
                startDate: moveIn,
                endDate: moveOut,
                listingId: listingId,
                guests: guests,
            };

            const results = await bookingApi.httpCreateBooking(token, req);

            if (!results.data.success) {
                return toast.error(results.data.message);

            }
            //todo: add redirect
            return toast.success(`Success! ${results.data.message}`);
        }
        catch(error){
            console.error(error);
        }
        finally{
            setLoadingState(prev => ({
                ...prev,
                bookingSubmitLoadState: false
            }));
        }

        
    };

    return (
        <>
            <ToastContainer position="bottom-right" autoClose={3000} />
            <PersonalDetailsForm 
                submitHandler={personalDetailSubmitHandler}
                nationalities={nationalities} 
                occupations={occupations}
                token={token}
                userInfo={userInfo}
                loadingState={loadingState.personalDetailLoadState}
                inValidInputs={inValidInputs}
                returnUrl={getCurrentUrl()}
                isLoggedIn={isLoggedIn}
             />
            <PaymentDetailForm />
            <BookingConfirmationForm 
                loadingState={loadingState.bookingSubmitLoadState}
                submitHandler={bookingSubmitHandler}
            />
        </>
    )
};

export default BookingFormWrapper;