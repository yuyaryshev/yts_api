import { Decoder, DecoderObject, number, object } from "@mojotech/json-type-validation";

export type MustBeTypedStringLiteral<T extends string> = string extends T ? never : T;
export type CantHaveFieldUrl<DecoderObj> = DecoderObj extends { url: infer T; [key: string]: any } ? { url: never } : {};
export type DecoderArg<DecoderObj> = DecoderObj extends Decoder<infer T> ? T : never;
export type HttpMethod = "get" | "put" | "post" | "delete";

export interface ApiRequestBase {
    httpMethod: HttpMethod;
}

// <TLiteral extends string, TApiRequest, TApiResponse> ApiDefinition<TLiteral, TApiRequest, TApiResponse>
export interface ApiDefinition<TLiteral extends string, TApiRequest, TApiResponse> {
    url: TLiteral;
    httpMethod: HttpMethod;
    request: TApiRequest;
    response: TApiResponse;
    requestDecoder: Decoder<TApiRequest>;
    responseDecoder: Decoder<TApiResponse>;
}
export function isApiDefinition(v: any): v is ApiDefinition<any, any, any> {
    return typeof v === "object" && v.url && v.requestDecoder;
}

export function apiDefinition<TLiteral extends string, TApiRequestDecoderObj, TApiResponseDecoderObj>(
    url: MustBeTypedStringLiteral<TLiteral>,
    httpMethod: HttpMethod,
    request: DecoderObject<TApiRequestDecoderObj & CantHaveFieldUrl<TApiRequestDecoderObj>>,
    response: DecoderObject<TApiResponseDecoderObj>,
): ApiDefinition<TLiteral, TApiRequestDecoderObj, TApiResponseDecoderObj> {
    if ((request as any).url) {
        throw new Error(
            `CODE00000003 Request can't have 't' field! as this name is reserved for request type! 't' should be passed as the first parameter!`,
        );
    }
    return {
        url,
        httpMethod,
        request: undefined as any,
        response: undefined as any,
        requestDecoder: object(request),
        responseDecoder: object(response),
    };
}

// Example:
export const exampleApi = apiDefinition(
    "/example",
    "get",
    {
        //t:"example",
        x: number(),
    },
    {
        y: number(),
    },
);

const x1: typeof exampleApi.url = "/example";
const x2: typeof exampleApi.request = { x: 1 };
const x3: typeof exampleApi.response = { y: 2 };

// optional:
// export type ExampleApiT = typeof exampleApi.t;
// export type ExampleApiRequest = typeof exampleApi.request;
// export type ExampleApiResponse = typeof exampleApi.response;
