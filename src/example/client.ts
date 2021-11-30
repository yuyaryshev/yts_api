import { callApi, apiFunction } from "../index.js"; // import {callApi, apiFunction} from "ytypescript_api";
import axiosLib from "axios";
import {exampleApi, example2Api} from "./api/index.js";

const axios = axiosLib.create({ baseURL: "http://localhost:3000" });

(async () => {
    // Make a function to represent API in client code:
    const callExampleApi = await apiFunction(axios, exampleApi);
    const r1 = await callExampleApi({ x: "1" });
    console.log({ r1 });

    // If you need to call an api just once:
    const r2 = await callApi(axios, exampleApi, { x: "1" });
    console.log({ r2 });

    // Example call to post api
    const r3 = await callApi(axios, example2Api, { x: 1 });
    console.log({ r3 });
})();
