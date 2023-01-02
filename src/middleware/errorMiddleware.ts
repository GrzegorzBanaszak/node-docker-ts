import { NextFunction, Request, Response } from "express";

export class ErrorMiddleware {
  static errorHandle(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode);

    res.json({
      message: err.message,
    });
  }
}
