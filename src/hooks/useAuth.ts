import authApi from "@/api/auth/auth.api";
import userApi from "@/api/user/user.api";
import { useCallback, useEffect, useState } from "react";

type UserInfo = {
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

    const getToken = useCallback(async () => {

        const tk = await authApi.httpGetToken();
        
        if(tk){
            setToken(tk.accessToken)
            await getUserInfo(tk.accessToken, setUserInfo);
        }
       

    }, [token]);

    const getUserInfo = async (token: string, cb: (...args: any) => void) => {

        if (!token) return;

        await userApi.httpGetUserInfo(token, cb);

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
    }
};

export default useAuth;