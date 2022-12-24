import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { Controller } from "./Controller";
import { CompanyEntity } from "../entities/CompanyEntity";
import { QueryMaker } from "../db/QueryMaker";

export class CompanyController extends Controller {
  constructor() {
    super(new CompanyEntity());
    this.queryMaker = new QueryMaker(
      this.entity.getId(),
      this.entity.getPropsArray(),
      "firmy"
    );
  }

  getAll(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const companies = await this.client.query(this.queryMaker.getAllQuery());
      res.status(200).json(companies);
    };
  }
  get(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      const company = await this.client.query(this.queryMaker.getByIdQuery(id));

      if (company) {
        res.status(200).json(company);
      } else {
        res.status(404).json({ message: "Customer dont exist" });
      }
    };
  }
  add(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {};
  }
}
