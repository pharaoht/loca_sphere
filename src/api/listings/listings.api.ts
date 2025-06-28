import { ListingDetails } from '@/components/wrappers/accommodations/about/about';
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
};

const listingsApi = new ListingsApi();

export default listingsApi;