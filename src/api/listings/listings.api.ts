import { DalFactory } from '@/dal/dal.factory';
import BaseApi from '../base.api';
import axios from 'axios';
import { Step11State } from '@/app/landlord/types';

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

    public async httpPostCreateListing(step: string, formData = {}, multipartForm: boolean = false, listId: string | null = ''){
        
        const url = this.findHostName();
    
        const reqObj = {
            url: `${url}/${step}?listId=${listId}`,
            method: 'POST',
            body: formData,
        };

        const result = multipartForm ? await this.sshttpMultiPartRequest(reqObj) : await this.ssHttpRequest(reqObj);

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

    public transformToFormData(data: Step11State){

        const formData = new FormData();
        
        data.images.forEach((item, index) => {
            formData.append('files', item.fileData);
            formData.append(`files[${index}][isPrimary]`, String(+item.isPrimary));
            formData.append(`files[${index}][tag]`, item.tag);
            formData.append(`files[${index}][listingId]`, item.listingId);
        });

        return formData;
    }
};

const listingsApi = new ListingsApi();

export default listingsApi;