import axios from "axios";
import BaseApi from "../base.api";

class AddressApi extends BaseApi {

    constructor(){

        super('address', axios)
    };

    async getAddressesByCoordinates(lat: string, long: string, radius: string){

        const url = this.findHostName();

        const reqObj = {
            url: `${url}/coordinates?lat=${lat}&long=${long}&radius=${radius}`,
            method: 'GET'
        };
       
        const result = await this.httpRequest({
            requestConfig: reqObj,  
        });

        return result;
    };
};

const addressApi = new AddressApi();

export default addressApi