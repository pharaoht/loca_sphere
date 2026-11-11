import axios from "axios";
import BaseApi, { HttpRequestConfig } from "../base.api";
import { serverApi } from "@/server_actions/cities";
import { cookies } from "next/headers";

class AuthApi extends BaseApi {

    constructor(){
        super('auth', axios)
    }

    public async httpGetToken(){

        const isServerSide = this.isServerSide();

        const hostName = this.findHostName();

        const cookieStore = await cookies();

        const reqObj: HttpRequestConfig = {
            url: hostName + '/refresh',
            withCredentials: true,
            method: 'GET',
            _cookies: cookieStore.toString(),
            _cache: 'no-store'
        }

        const data = !isServerSide ? await this.httpRequest({ requestConfig: reqObj, })
            : await this.ssHttpRequest(reqObj);

        return data
    }

    public async httpOwnerShip(rf: string, listingId: string){

        const isServerSide = this.isServerSide();

        const hostName = this.findHostName();
    
        const reqObj: HttpRequestConfig = {
            url: hostName + '/ownership' + '/' + listingId,
            withCredentials: true,
            method: 'GET',
            refreshToken: rf
        }
        
        const data = !isServerSide ? await this.httpRequest({ requestConfig: reqObj, })
            : await serverApi({ url: reqObj.url })


        return data
    }
};

const authApi = new AuthApi();

export default authApi;