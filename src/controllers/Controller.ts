import { Request, Response } from "express";
import { Entity } from "../entities/Entity";
import { Client } from "../db/Client";
export abstract class Controller {
  protected entity: Entity;
  protected props: Array<string>;
  protected client: Client;
  abstract getAll(): (req: Request, res: Response) => Promise<void>;
  abstract get(): (req: Request, res: Response) => Promise<void>;
  abstract add(): (req: Request, res: Response) => Promise<void>;

  constructor() {
    this.client = Client.getInstancion();
  }
}
