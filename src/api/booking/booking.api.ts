import axios from "axios";
import BaseApi, { HttpRequestConfig } from "../base.api";

class BookingApi extends BaseApi {

    constructor(){
        super('bookings', axios)
    }

    public async httpCreateBooking(token: string, data = {}, ){

        if(!token) return;

        const url = this.findHostName();

        const isSS = this.isServerSide();

        const reqObj: HttpRequestConfig = {
            url: `${url}/create`,
            method: 'POST',
            body: data,
            accessToken: token
        };

        if (isSS) {

            const result = await this.ssHttpRequest(reqObj);

            return result
        }

        const res = await this.httpRequest({ requestConfig: reqObj });

        return res
    }

    public async httpCheckAvalibility(listingId = '', moveIn = '', moveOut = ''){
        
        if(!listingId || !moveIn || !moveOut) return false;

        const url = this.findHostName();
        const isSS = this.isServerSide();

        const reqObj: HttpRequestConfig = {
            url: `${url}/check-availability/${listingId}?moveIn=${moveIn}&moveOut=${moveOut}`,
            method: 'GET',
        };

        if (isSS) {

            const result = await this.ssHttpRequest(reqObj);

            return result
        }

        const res = await this.httpRequest({ requestConfig: reqObj });

        return res

    }
};

const bookingApi = new BookingApi();

export default bookingApi;