import axios from "axios";
import BaseApi from "../base.api";

class AuthApi extends BaseApi {

    constructor(){
        super('auth', axios)
    }

    public async httpGetToken(){
        
    }
};

const authApi = new AuthApi();

export default authApi;