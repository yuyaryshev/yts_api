import { ApiDefinition } from "./ApiDefinition.js";
import type { AxiosInstance } from "axios";
import { callApi } from "./callApi.js";

/**
 * Creates a function for specified api to call it through supplied socket
 * @param axios - your axios instance. Don't forget to initialize it. Use axios.config to set baseURL with port.
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
