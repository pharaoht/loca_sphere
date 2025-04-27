import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface HttpRequestConfig extends AxiosRequestConfig {
    signal?: AbortSignal
    body?: any
}

type httpConfigType = {
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
        this.prodDomain = '';
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

    findHostName(): string{

        if(this.environment === 'dev') return `http://${this.devBackendDomain}/api/${this.resource}`;

        return `${this.prodDomain}/api/${this.resource}`;
    };

    public async httpRequest({ requestConfig, cb }: httpConfigType){

        try {

            this._isLoading = true;
            this.error = '';
            
            const response = await this.httpClient({
                ...requestConfig,
                signal: this.abortController.signal,
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            console.log('hiiiiiiii')
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