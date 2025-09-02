import { DalFactory } from '@/dal/dal.factory';
import BaseApi from '../base.api';
import axios from 'axios';

class ListingsApi extends BaseApi {   

    constructor(){
    
        super('listings', axios)
    }

    public async httpGetDetailsForListing(queryString: string, listId: string){

        const url = this.findHostName();

        const isSS = this.isServerSide();

        const reqObj = {
            url: `${url}/${listId}?includes=${queryString}`,
            method: 'GET'
        };

        if(isSS){

            const result = await this.ssHttpRequest(reqObj);

            return result;
        }
        else {
            const result = await this.httpRequest({
                requestConfig: reqObj,
            });

            return result;
        }
    };

    public async httpPostCreateListing(step: string, formData = {}, staticFiles = undefined){
        
        const url = this.findHostName();
    
        const reqObj = {
            url: `${url}/${step}`,
            method: 'POST',
            body: !staticFiles ? formData : staticFiles
        };

        const result = await this.ssHttpRequest(reqObj);

        return result;

    }

    public async httpGetListingOptions(option: string, cb?: (...args: any) => void ){

        const url = this.findHostName();

        const isSS = this.isServerSide();
    
        const reqObj = {
            url: `${url}/options/${option}`,
            method: 'GET'
        };

        const optionsDal = DalFactory.create(option);
    
        if(isSS){

            const result = await this.ssHttpRequest(reqObj);
            console.log(result)
            const dal = optionsDal.fromDto(result);

            return dal;
        }
        else {
            const result = await this.httpRequest({
                requestConfig: reqObj,
                cb: (data) => {
                    const transformed = optionsDal.fromDto(data);
                    cb?.(transformed);
                }
            });

            return result;
        }
    };

    public async httpGetListingByListingId(listId: string){
        
        const url = this.findHostName();

        const isSS = this.isServerSide();

        const reqObj = {
            url: `${url}`,
            method: 'GET'
        }
    };
};

const listingsApi = new ListingsApi();

export default listingsApi;