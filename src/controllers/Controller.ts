import { Request, Response } from "express";

export abstract class Controller {
  abstract getAll(req: Request, res: Response);
  abstract get(req: Request, res: Response);
  abstract add(req: Request, res: Response);
}
