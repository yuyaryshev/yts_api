# ytypescript_api
ytypescript_api library gives a 'standard' way to define, implement and call API in Typescript. See Examples.

# Usage

## Define API
Use `apiDefinition` to define an API like this. Put it into separate file into 'api' folder and share that folder between client and server.
```typescript
import {apiDefinition} from "ytypescript_api";
import {Decoder, DecoderObject, number, object, string} from "@mojotech/json-type-validation";

export const exampleApi = apiDefinition(
    "/example",         // url
    "get",              // httpMethod
    {
        x: string(),    // requestData
    },
    {
        y: number(),    // responseData
    },
);
```

## Implement API on server
Use `implementApi` to implement API on server.
```typescript
import {implementApi} from "ytypescript_api";
import express from "express";
import bodyParser from "body-parser";
import { exampleApi } from "./api/index.js";

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

implementApi(app, exampleApi, (requestData: typeof exampleApi.request /* uncomment if needed: , req: Request, res: Response*/): typeof exampleApi.response => {
    const responseData = { y: Number(requestData.x) * 2 };
    console.log({ m: exampleApi.httpMethod, url: exampleApi.url, requestData, responseData });
    return responseData;
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
```

## Call API from client
Use `apiFunction` to make a conveniet function to call API.
Or use `callApi` to call it.
```typescript
import {callApi, apiFunction} from "ytypescript_api";
import axiosLib from "axios";
import { exampleApi } from "./api/index.js";


const axios = axiosLib.create({baseURL:"http://localhost:3000"});

(async () => {
    // Make a function to represent API in client code:
    const callExampleApi = await apiFunction(axios, exampleApi);
    const r1 = await callExampleApi({ x: '1' });
    console.log({ r1 });

    // If you need to call an api just once:
    const r2 = await callApi(axios, exampleApi, { x: '1' });
    console.log({ r2 });
})();

```