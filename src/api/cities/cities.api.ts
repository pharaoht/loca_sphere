import axios, { AxiosInstance } from "axios";
import BaseApi from "../base.api";

class CitiesApi extends BaseApi {

    constructor(resource: string, httpClient: AxiosInstance){
        super(resource, httpClient);
    }

    async httpGetCities(location: string){

        const url = this.findHostName();

        const reqObj = {
            url: `${url}?location=${location}`,
            method: 'GET'
        }

        const data = await this.httpRequest({
            requestConfig: reqObj,
        })

        return data
    }
};

const citiesApi = new CitiesApi('cities', axios);

export default citiesApi