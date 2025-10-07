import axios from "axios";
import BaseApi, { HttpRequestConfig } from "../base.api";

class AuthApi extends BaseApi {

    constructor(){
        super('auth', axios)
    }

    public async httpGetToken(rf?: string){
        
        const isServerSide = this.isServerSide();

        const hostName = this.findHostName();

        const reqObj: HttpRequestConfig = {
            url: hostName + '/refresh',
            withCredentials: true,
            method: 'GET',
            refreshToken: rf
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
            : await this.ssHttpRequest(reqObj);

        return data
    }
};

const authApi = new AuthApi();

export default authApi;