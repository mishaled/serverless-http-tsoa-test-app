import { NextFunction, Request, Response } from "express";


export function forwardedPrefixMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.headers.referer?.endsWith("api-docs") &&
        !req.url.includes("api-docs")) {
        res.redirect(req.headers.referer + req.url);
    }
    next();
}
