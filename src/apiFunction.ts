import { ApiDefinition } from "./ApiDefinition.js";
import type { AxiosInstance } from "axios";
import { callApi } from "./callApi.js";

/**
 * Creates a function for specified api to call it through supplied socket
 * @param axios - your Axios instance
 * @param apiDefinition - api definition
 * const callApiExample = apiFunction(axios, apiExample);
 */
export function apiFunction<TLiteral extends string, TApiRequest, TApiResponse>(
    axios: AxiosInstance,
    apiDefinition: ApiDefinition<TLiteral, TApiRequest, TApiResponse>,
) {
    return (requestData: TApiRequest) => {
        return callApi(axios, apiDefinition, requestData);
    };
}
