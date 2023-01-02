import { PrismaClient } from "@prisma/client";
import { PrismaLocalClient } from "./../prisma/Prisma";
import { Request, Response } from "express";

export abstract class Controller {
  client: PrismaClient;
  abstract getAll(): (req: Request, res: Response) => Promise<void>;
  abstract get(): (req: Request, res: Response) => Promise<void>;
  abstract add(): (req: Request, res: Response) => Promise<void>;

  constructor() {
    this.client = PrismaLocalClient.getInstancion();
  }
}
