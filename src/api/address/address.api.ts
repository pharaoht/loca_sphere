import axios from "axios";
import BaseApi from "../base.api";
import { Address } from "@/components/ui/map/map";

class AddressApi extends BaseApi {

    constructor(){

        super('listings/address', axios)
    };

    formatFilterString(searchParams = {}){
        
        if(Object.keys(searchParams).length === 0 || !searchParams) return ''

        let str = '?'

        Object.entries(searchParams).forEach(([key, value], idx) => idx === 0 ? str += `${key}=${value}` : str += `&${key}=${value}`)

        return str;
    }

    async getAddressesByCoordinates(searchParams = {}): Promise<Address[] | null>{

        const url = this.findHostName();

        const paramStr = this.formatFilterString(searchParams)

        const reqObj = {
            url: `${url}/coordinates${paramStr}`,
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