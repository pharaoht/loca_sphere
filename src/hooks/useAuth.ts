import authApi from "@/api/auth/auth.api";
import userApi from "@/api/user/user.api";
import { useCallback, useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";

export type UserInfo = {
    id: string,
    displayName: string,
    pfp: string,
    givenName: string,
    surName: string,
    birthday: string,
    email: string,
    gender: string,
    countryCode: number | undefined,
    phoneNumber: number | undefined,
    nationality: number | undefined,
    occupation: number | undefined,
}

const useAuth = () => {

    const [token, setToken] = useState<string | null>(''); 
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [ isLoading, setIsLoading ] = useState(true);

    const getToken = useCallback(async () => {

        const res = await authApi.httpGetToken();

        const tk = res?.data?.data?.accessToken;

        if(tk){

            setToken(tk);
        
            const response = await getUserInfo(tk);

            setUserInfo(response.data);

        }
        else {
            console.warn(`Error occured | ${res.message} | Status code ${res.statusCode}`)
        }
       
        setIsLoading(false);

    }, [token]);

    const getUserInfo = async (token: string) => {

        if (!token) return;

        const response = await userApi.httpGetUserInfo(token);

        return response

    }

    useEffect(() => {
    
        const fetchToken = async () => {
            await getToken()
     
        };

        fetchToken();
    
    }, []);

    //Schedule a refresh ahead of expiry
    useEffect(() => {

        if(!token) return;
        
        const c = setTimeout(async () => {
            await getToken()
        }, 15 * 60000);

        return () => clearTimeout(c)

    }, [ token ]);

    return {
        userInfo,
        token,
        isLoading
    }
};

export default useAuth;