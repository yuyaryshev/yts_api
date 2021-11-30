import { RequestHandler } from "./RequestHandler.js";
import { ApiDefinition } from "./ApiDefinition.js";
import type { Application, Request, Response } from "express";
import { validationSettings } from "./validationSettings.js";

export function implementApi<TLiteral extends string, TApiRequest, TApiResponse>(
    expressApp: Application,
    apiDefinition: ApiDefinition<TLiteral, TApiRequest, TApiResponse>,
    requestHandler: RequestHandler<TApiRequest, TApiResponse>,
) {
    const callback = async (req: Request, res: Response): Promise<Response> => {
        try {
            const requestData = apiDefinition.requestDecoder.runWithException(req.body);
            const r = await requestHandler(requestData, req, res);

            if (validationSettings.validateResponsesOnServer) {
                apiDefinition.responseDecoder.runWithException(r);
            }
            return res.status(200).send(r);
        } catch (e: any) {
            const error: any = {
                code: e.code,
                message: e.message,
                stack: e.stack,
            };
            for (const k in e) {
                error[k] = e[k];
            }
            return res.status(200).send({ error });
        }
    };
    expressApp[apiDefinition.httpMethod](apiDefinition.url, callback);
}
