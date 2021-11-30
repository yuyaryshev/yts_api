import { Request, Response } from "express";

export type RequestHandler<TApiRequest, TApiResponse> = (data: TApiRequest, req: Request, res: Response) => TApiResponse | Promise<TApiResponse>;
