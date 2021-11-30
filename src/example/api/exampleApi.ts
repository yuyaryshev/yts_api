import { apiDefinition } from "../../index.js"; // import {apiDefinition} from "ytypescript_api";
import { Decoder, DecoderObject, number, object, string } from "@mojotech/json-type-validation";

// Define API
export const exampleApi = apiDefinition(
    "/example", // url
    "get", // httpMethod
    {
        x: string(), // requestData
    },
    {
        y: number(), // responseData
    },
);
