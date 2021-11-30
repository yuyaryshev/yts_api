import { ApiDefinition } from "./ApiDefinition.js";
import type { AxiosInstance } from "axios";
import { validationSettings } from "./validationSettings.js";

/**
 * Calls api. Verifies request and response data.
 * @param axios - your Axios instance
 * @param apiDefinition - api definition
 * @param requestData - api arguments
 * const r = await callApi(axios, apiExample, {x:1});
 */
export async function callApi<TLiteral extends string, TApiRequest, TApiResponse>(
    axios: AxiosInstance,
    apiDefinition: ApiDefinition<TLiteral, TApiRequest, TApiResponse>,
    requestData: TApiRequest,
): Promise<TApiResponse> {
    if (apiDefinition.requestDecoder && validationSettings.validateRequestsOnClient) {
        apiDefinition.requestDecoder.runWithException(requestData);
    }
    const response = await axios({
        url: apiDefinition.url,
        method: apiDefinition.httpMethod,
    });
    const responseData = response.data;

    if (apiDefinition.responseDecoder && validationSettings.validateResponsesOnClient) {
        apiDefinition.responseDecoder.runWithException(responseData);
    }
    return responseData;
}
