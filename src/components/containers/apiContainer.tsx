import React, { ReactElement, ReactNode } from "react";

interface Props {
    apiReqMethod: (...args: any) => Promise<any>,
    children: ReactElement
}

const apiRequest = async (apiRequest: () => Promise<any> ) => {

  
    const data = await apiRequest();

    return data
}

const ApiContainer: React.FC<Props> = async ({ children, apiReqMethod }) => {

    const apiData = await apiRequest(apiReqMethod);
    
    const props = { apiData: apiData };

    return (
        <>
            {
                React.Children.map(children, (child) => {

                    if(React.isValidElement(child)){

                        return React.cloneElement(child, props)
                    }

                    return child
                })
            }
        </>
    )
};

export default ApiContainer;