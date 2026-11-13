import axios from "axios";
import BaseApi, { HttpRequestConfig } from "../base.api";
import { cookies } from "next/headers";

class UserApi extends BaseApi{

    constructor(){
        super('users', axios)
    }

    public async httpGetUserInfo(){

        const isServerSide = this.isServerSide();

        const hostName = this.findHostName();

        const cookieStore = await cookies();

        const reqObj: HttpRequestConfig = {
            url: hostName + '/me',
            withCredentials: true,
            _cookies: cookieStore.toString(),
            _cache: 'no-store'
        };
        console.count('Requests')
        const results = await this.ssHttpRequest(reqObj);

        return {
            userInfo: results.data
        }
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
    
        return results

    }

    public async httpPatchUpdateUserProfile(accessToken: string | undefined = '', userObj = {}){

        const url = this.findHostName();

        const isServerSide = this.isServerSide();
        
        const reqObj: HttpRequestConfig = {
            url: url,
            method: 'PATCH',
            withCredentials: true,
            accessToken: accessToken,
            data: userObj
        };

        const results = isServerSide ? 
            await this.ssHttpRequest(reqObj, undefined) 
            : await this.httpRequest({ requestConfig: reqObj, cb: () => undefined });

        return results;
    }
};


const userApi = new UserApi();

export default userApi;