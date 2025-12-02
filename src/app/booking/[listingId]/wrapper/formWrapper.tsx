'use client';

import userApi from "@/api/user/user.api";
import PaymentDetailForm from "@/components/ui/payment/payment";
import PersonalDetailsForm from "@/components/ui/personalDetails/personalDetail";
import { useAuthContext } from "@/context/auth.context";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

interface ComponentProps {
    nationalities: Array<any>,
    occupations: Array<any>
};

const BookingFormWrapper: React.FC<ComponentProps> = ({ nationalities, occupations }) => {

    const { userInfo, isLoading, token } = useAuthContext();

    if(isLoading) return <>Loading...</>

    const personalDetailSubmitHandler = async (formState: {}) => {

        const results = await userApi.httpPatchUpdateUserProfile(token || '', formState);

        if (!results.success){
            return toast.error(`Error occurred | "${results.message}" | Status code ${results.statusCode}`)
        }

        return toast.success('Saved Successfully!');
    };

    const paymentDetailSubmitHandler = async () => {};

    return (
        <>
            <ToastContainer position="bottom-right" autoClose={3000} />
            <PersonalDetailsForm 
                submitHandler={personalDetailSubmitHandler}
                nationalities={nationalities} 
                occupations={occupations}
                token={token}
                userInfo={userInfo}
             />
            <PaymentDetailForm />
        </>
    )
};

export default BookingFormWrapper