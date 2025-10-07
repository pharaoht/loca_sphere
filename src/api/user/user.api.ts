import axios from "axios";
import BaseApi, { HttpRequestConfig } from "../base.api";
import { url } from "inspector";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

class UserApi extends BaseApi{

    constructor(){
        super('users', axios)
    }

    public async httpGetUserInfo(token: string | RequestCookie, cb?: (...args: any) => void){

        if(!token) return {};

        const isServerSide = this.isServerSide();

        const hostName = this.findHostName();

        const reqObj: HttpRequestConfig = {
            accessToken: String(token),
            url: hostName + '/me',
            withCredentials: true
        };
        
        const data = !isServerSide ? await this.httpRequest({ requestConfig: reqObj, cb}) 
        : await this.ssHttpRequest(reqObj);

        return data;
    }
};


const userApi = new UserApi();

export default userApi;