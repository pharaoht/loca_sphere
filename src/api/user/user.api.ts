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
        
        const results = !isServerSide ? await this.httpRequest({ requestConfig: reqObj, cb}) 
        : await this.ssHttpRequest(reqObj);
   
        if (results?.success) return results.data;

        return results;
    }
    
    public async httpGetUserOptions(optionsParam: string = ''){

        if(!optionsParam) {

            console.warn('You tried making a request but required argument as undefined');

            return undefined;
        }

        const isServerSide = this.isServerSide();

        const hostName = this.findHostName();

        const reqObj: HttpRequestConfig = {
            url: hostName + '/options/' + optionsParam,
            method: 'GET'
        }

        const results = !isServerSide ? await this.httpRequest({ requestConfig: reqObj }) :
            await this.ssHttpRequest(reqObj);

        if(results?.success) return results.data;

        return results

    }

    public async httpPatchUpdateUserProfile(accessToken: string | undefined = '', userObj = {}){

        if(!accessToken) return false;

        const url = this.findHostName();

        const isServerSide = this.isServerSide();
        
        const reqObj: HttpRequestConfig = {
            url: url,
            method: 'PATCH',
            accessToken: accessToken,
            data: userObj
        };

        const results = isServerSide ? 
            await this.ssHttpRequest(reqObj, undefined) 
            : await this.httpRequest({ requestConfig: reqObj, cb: () => undefined });

        console.log(results);
        
        return results;
    }
};


const userApi = new UserApi();

export default userApi;