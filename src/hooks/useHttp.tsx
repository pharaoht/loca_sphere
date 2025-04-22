import axios from "axios";
import { useCallback, useState } from "react";

interface useHttpProps {
    
}

interface requestProps {
    requestConfig: {
        url: string,
        method?: string,
        body?: any,
        headers?: {
            [key: string]: string
        },
        signal?: AbortSignal,
    },
    callback?: (...args: any) => void | null
}

const environment = process.env.NEXT_PUBLIC_ENV;

const useHttp = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [error, setError] = useState<string>('');

    const devBackendDomain = 'localhost:8000';

    function findHostName(resource: string): string {

        if(environment === 'dev'){

            return `http://${devBackendDomain}/api/${resource}`
        }

        return ''
    }

    const sendRequest = useCallback(async ({ requestConfig, callback }: requestProps) => {

        try{

            setIsLoading(true);

            setError('');
        
            const response = await axios({
                ...requestConfig,
                url: findHostName(requestConfig.url),
                signal: requestConfig.signal,
                headers: requestConfig.headers || {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: requestConfig.method || 'GET'
            });

            if (response.status !== 200) {

                setError(`Unexpected status: ${response.status}`);
                return;
            }

            if(callback) {

                return callback(response?.data);
            }

            return response?.data;
            
        }
        catch(err: any){

            const error = err?.message || undefined;
            const status = err?.status;

            if(axios.isCancel(err)) return;

            if(err instanceof Error) setError(`${error} Status code ${status}`);

        }
        finally {

            setIsLoading(false);
        }
    }, []);


    return {
        isLoading,
        error, 
        sendRequest
    }
};

export default useHttp;