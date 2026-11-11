import axios from "axios";
import BaseApi, { HttpRequestConfig } from "../base.api";
import { cookies } from "next/headers";

class SessionApi extends BaseApi {

    constructor(){
        super('auth', axios)
    }

    private async httpRetryRequest(){

        const isServerSide = this.isServerSide();

        const hostName = this.findHostName();

        const cookieStore = await cookies();

        const reqObj: HttpRequestConfig = {
            url: hostName + '/refresh',
            withCredentials: true,
            method: 'GET',
            _cookies: cookieStore.toString(),
            _cache: 'no-store'
        };

        const data = !isServerSide ? await this.httpRequest({ requestConfig: reqObj, })
            : await this.ssHttpRequest(reqObj);

        console.log(data)

    }
}

const sessionApi = new SessionApi();

export default sessionApi;



