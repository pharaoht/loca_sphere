import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface HttpRequestConfig extends AxiosRequestConfig {
    signal?: AbortSignal
    url: string,
    body?: any
    method?: string
    accessToken?: string
    refreshToken?: string
    withCredentials?: boolean
}

export type httpConfigType = {
    requestConfig: HttpRequestConfig
    cb?: (...args: any) => void | null
}

class BaseApi {

    protected devBackendDomain: string;
    protected prodDomain: string;
    protected resource: string;

    private _isLoading: boolean;
    private error: string;
    private abortController: AbortController;
    private httpClient: AxiosInstance;
    private environment: string;

    constructor(resource: string, httpClient: AxiosInstance ){
        this.devBackendDomain = 'localhost:8000';
        this.prodDomain = 'https://locaspherebackend-locasphere.up.railway.app';
        this.resource = resource;
        this.httpClient = httpClient;
        this._isLoading = false;
        this.error = '';
        this.abortController = new AbortController();
        this.environment = process.env.NEXT_PUBLIC_ENV || '';
    }

    public get isLoading(): boolean {
        return this._isLoading;
    }

    isServerSide(): boolean {

        if(typeof window === 'undefined'){
            return true
        }

        return false
    }

    findHostName(): string{

        if(this.environment === 'dev') return `http://${this.devBackendDomain}/api/${this.resource}`;

        return `${this.prodDomain}/api/${this.resource}`;
    };

    private generateHeaders(requestObject: HttpRequestConfig): Record<string, string> {

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        if (requestObject.accessToken) {
            headers.Authorization = `Bearer ${requestObject.accessToken}`
        }

        if (requestObject.refreshToken) {
            headers.Cookie = `refresh_token=${requestObject.refreshToken}`
        }

        return headers;
    }

    public async sshttpMultiPartRequest(reqObj: HttpRequestConfig, cb?: (...args: any) => void) {

        try {
            const response = await fetch(reqObj.url, {
                headers: {
                },
                method: 'POST',
                body: reqObj.body
            });

            const contentType = response.headers.get('Content-Type');
            const isJson = contentType && contentType.includes('application/json');
            const data = isJson ? await response.json() : await response.text();

            if (!response.ok) {

                throw {
                    message: data?.message || 'Unknown error',
                    name: data?.error.name || 'ServerError',
                    statusCode: data?.error.statusCode || response.status,
                    data: data?.error.data || {},
                    type: data?.type || 'Unknown'
                };
            }

            if (cb) return cb(data);

            return data;
        }

        catch (error: any) {

            console.error('[ssHttpRequest Error]', error?.statusCode);

            return {
                success: false,
                statusCode: error?.statusCode ?? 400,
                message: error?.name ?? error.message ?? 'Unknown error',
                invalidInputs: error?.data ?? {}
            };
        }
    }

    public async ssHttpRequest(reqObj: HttpRequestConfig, cb?: (...args: any) => void ){

        try {

            const headers = this.generateHeaders(reqObj);
            
            const response = await fetch(reqObj.url, {
                headers,
                credentials: reqObj.withCredentials ? 'include' : 'omit',
                method: reqObj.method || 'GET',
                body: reqObj.body && JSON.stringify(reqObj.body)
            });

            const contentType = response.headers.get('Content-Type');
            const isJson = contentType && contentType.includes('application/json');
            const data = isJson ? await response.json() : await response.text();

            if (!response.ok) {
  
                throw {
                    success: false,
                    message: data?.message || 'Unknown error',
                    name: data?.error?.name || 'ServerError',
                    statusCode: data?.error?.statusCode || response.status,
                    data: data?.error?.data || {},
                    type: data?.type || 'Unknown'
                };
            }

            if(cb) return cb(data);

            return data;

        }
        catch(error: any){

            console.error(error);
    
            console.error('[ssHttpRequest Error]', error?.statusCode);

            return {
                success: false,
                statusCode: error?.statusCode ?? 400,
                message: error?.name ?? error.message ?? 'Unknown error',
                invalidInputs: error?.data ?? {}
            };
        }
    }

    public async httpRequest({ requestConfig, cb }: httpConfigType){

        try {

            this._isLoading = true;
            this.error = '';

            const headers = this.generateHeaders(requestConfig);

            const response = await this.httpClient({
                ...requestConfig,
                signal: this.abortController.signal,
                headers
            });
           
            if(response.status !== 200) throw new Error('Request failed');

            if(cb) return cb(response?.data);

            return response?.data
        }
        catch (err: any) {

            const error = err?.response?.data.error || undefined;

            if(axios.isCancel(err)) return;

            if(err instanceof Error) this.error = error || err.message;

        }
        finally {
            this._isLoading = false;
            this.abortController = new AbortController();
        }
    }
}

export default BaseApi