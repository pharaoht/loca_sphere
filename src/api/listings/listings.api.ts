import BaseApi from '../base.api';
import axios from 'axios';

class ListingsApi extends BaseApi {   

    constructor(){

        super('listings', axios)
    }

    public httpGetListings(long: string, lat: string){

        const url = this.findHostName();

        const reqObj = {
            url: url,
            method: 'GET'
        }

        this.httpRequest({
            requestConfig: reqObj,
            cb: () => {}
        })
    };

    public async httpGetListingbyId(listingId: string){

        const url = this.findHostName();

        const isSS = this.isServerSide();

        const reqObj = {
            url: `${url}/${listingId}`,
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

    public async httpGetBedRoomAmenitiesByListingId(listingId: string){

        const url = this.findHostName();

        const isSS = this.isServerSide();

        const reqObj = {
            url: `${url}/bedroom-amenity${listingId}`,
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
    }

    public async httpGetListingDetails(listingId: string){
        
        const url = this.findHostName();
        const isSS = this.isServerSide();

        const reqObj = {
            url: `${url}/host-details/${listingId}`,
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
    }
};

const listingsApi = new ListingsApi();

export default listingsApi;