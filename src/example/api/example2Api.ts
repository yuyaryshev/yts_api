import { apiDefinition } from "../../index.js"; // import {apiDefinition} from "ytypescript_api";
import { Decoder, DecoderObject, number, object, string } from "@mojotech/json-type-validation";

// Define API
export const example2Api = apiDefinition(
    "/example2", // url
    "post", // httpMethod
    {
        x: number(), // requestData
    },
    {
        y: number(), // responseData
    },
);
