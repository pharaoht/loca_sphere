import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface HttpRequestConfig extends AxiosRequestConfig {
    signal?: AbortSignal
    body?: any
}

type httpConfigType = {
    requestConfig: HttpRequestConfig
    cb: (...args: any) => void
}

class BaseApi {

    protected devBackendDomain: string;
    protected prodDomain: string;
    protected resource: string;

    private isLoading: boolean;
    private error: string;
    private abortController: AbortController;
    private httpClient: AxiosInstance;
    private environment: string;

    constructor(resource: string, httpClient: AxiosInstance ){
        this.devBackendDomain = 'localhost:8000';
        this.prodDomain = '';
        this.resource = resource;
        this.httpClient = httpClient;
        this.isLoading = false;
        this.error = '';
        this.abortController = new AbortController();
        this.environment = process.env.NEXT_PUBLIC_ENV || '';
    }

    findHostName(): string{

        if(this.environment === 'dev') return `http://${this.devBackendDomain}/${this.resource}`;

        return `${this.prodDomain}/${this.resource}`;
    };

    public async httpRequest({ requestConfig, cb }: httpConfigType){

        try {

            this.isLoading = true;
            this.error = '';

            const response = await this.httpClient({
                ...requestConfig,
                signal: this.abortController.signal,
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if(response.status !== 200) throw new Error('Request failed');

            if(cb !== null){

                return cb(response?.data);
            }

            return response?.data
        }
        catch (err: any) {

            const error = err?.response?.data.error || undefined;

            if(axios.isCancel(err)) return;

            if(err instanceof Error) this.error = error || err.message;

        }
        finally {
            this.isLoading = false;
            this.abortController = new AbortController();
        }
    }
}