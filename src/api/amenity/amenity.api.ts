import axios from "axios";
import BaseApi from "../base.api";

class AmenityApi extends BaseApi {

    constructor(){
        super('amenity', axios)
    }

    public async getAmenityByListingId(listingId: string){

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
}

const amenityApi = new AmenityApi();

export default amenityApi;