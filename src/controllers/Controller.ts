import { Request, Response } from "express";

export abstract class Controller {
  abstract getAll(): (req: Request, res: Response) => Promise<void>;
  abstract get(): (req: Request, res: Response) => Promise<void>;
  abstract add(): (req: Request, res: Response) => Promise<void>;

  constructor() {}
}
