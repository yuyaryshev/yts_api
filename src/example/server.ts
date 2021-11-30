import { implementApi } from "../index.js"; // import {implementApi} from "ytypescript_api";
import express from "express";
import bodyParser from "body-parser";
import { exampleApi } from "./api/index.js";

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

implementApi(
    app,
    exampleApi,
    (requestData: typeof exampleApi.request /* uncomment if needed: , req: Request, res: Response*/): typeof exampleApi.response => {
        const responseData = { y: Number(requestData.x) * 2 };
        console.log({ m: exampleApi.httpMethod, url: exampleApi.url, requestData, responseData });
        return responseData;
    },
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
