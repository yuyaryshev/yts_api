import { ApiDefinition } from "./ApiDefinition.js";
import type { AxiosInstance } from "axios";
import { validationSettings } from "./validationSettings.js";

/**
 * Calls api. Verifies request and response data.
 * @param axios - your axios instance. Don't forget to initialize it. Use axios.config to set baseURL with port.
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
    const axiosConfig: any = {
        url: apiDefinition.url,
        method: apiDefinition.httpMethod,
    };
    if (apiDefinition.httpMethod === "get") {
        axiosConfig.params = requestData;
    } else {
        axiosConfig.data = requestData;
    }

    const response = await axios(axiosConfig);
    const responseData = response.data;

    if (responseData.error) {
        const e = new Error("CODE83758221 Server responded with an error: " + responseData.error.message);
        (e as any).error = responseData.error;
        (e as any).code = responseData.code;
        (e as any).originalMessage = responseData.message;
        (e as any).originalStack = responseData.stack;
        throw e;
    }

    if (apiDefinition.responseDecoder && validationSettings.validateResponsesOnClient) {
        apiDefinition.responseDecoder.runWithException(responseData);
    }
    return responseData;
}
