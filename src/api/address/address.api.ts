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

    async getAddressesByCoordinates(searchParams = {}) {

        const url = this.findHostName();

        const isServerSide = this.isServerSide()

        const paramStr = this.formatFilterString(searchParams);

        const reqObj = {
            url: `${url}/coordinates${paramStr}`,
            method: 'GET'
        };
     
        const result = isServerSide ? await this.ssHttpRequest(reqObj) : await this.httpRequest({
            requestConfig: reqObj,
        });

        return result;
    };

    async httpFetGeoCodingAddress(queryString: string, cb?: (...args: any) => void, type: boolean = false) {

        const url = this.findHostName();

        const qs = type ? `${url}/geocoding?q=${queryString}&type=retrieve` : `${url}/geocoding?q=${queryString}`;

        const reqObj = {
            url: qs,
            method: 'GET'
        };

        const result = await this.httpRequest({
            requestConfig: reqObj,
            cb: (data) => { 

                if(cb == undefined) return data;

                if(type){
                    return cb?.(data.features[0].properties)
                }

                return cb?.(data.suggestions)
            }
        });

        return result
    }
};

const addressApi = new AddressApi();

export default addressApi