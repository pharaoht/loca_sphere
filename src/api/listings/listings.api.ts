import BaseApi from '../base.api';
import axios from 'axios';

class ListingsApi extends BaseApi {   

    constructor(){

        super('listings', axios)
    }

    public httpGetListings(){

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
};

export default ListingsApi;