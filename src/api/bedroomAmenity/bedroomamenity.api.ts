import BaseApi from '../base.api';
import axios from 'axios';

class BedroomAmenityApi extends BaseApi {   

    constructor(){

        super('bedroom-amenity', axios)
    }

        public async httpGetBedRoomAmenitiesByListingId(listingId: string){

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
    }
};

const bedroomAmenityApi = new BedroomAmenityApi();

export default bedroomAmenityApi;