import { Request, Response } from "express";
import { Entity } from "../entities/Entity";
import { Client } from "../db/Client";
import { QueryMaker } from "../db/QueryMaker";
import { Props } from "../types/Props";
export abstract class Controller {
  protected entity: Entity;
  protected props: Array<string>;
  protected client: Client;
  protected queryMaker: QueryMaker;
  abstract getAll(): (req: Request, res: Response) => Promise<void>;
  abstract get(): (req: Request, res: Response) => Promise<void>;
  abstract add(): (req: Request, res: Response) => Promise<void>;

  constructor(entity: Entity) {
    this.client = Client.getInstancion();
    this.entity = entity;
  }
}
