import { Request, Response } from "express";

import { Controller } from "./Controller";
import { Firma } from "../classes/Firma";

export class FirmaController extends Controller {
  getAll(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const companies = await this.client.firma.findMany();

      res.status(200).json(companies);
    };
  }
  get(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      const parsedId = Number(id);

      if (Number.isNaN(parsedId)) {
        res.status(400);
        throw new Error("Id must by a number");
      }

      const company = await this.client.firma.findUnique({
        where: {
          idFirmy: parsedId,
        },
      });

      if (!company) {
        res.status(404);
        throw new Error("Company don't find");
      }

      res.status(200).json(company);
    };
  }
  add(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const data = req.body;

      if (!Firma.isCompany(data)) {
        res.status(404);
        throw new Error("Not every field are valid");
      }

      const newCompany = await this.client.firma.create({
        data,
      });
      res.status(201).json(newCompany);
    };
  }

  update(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const data = req.body;
      const { id } = req.params;

      const parsedId = Number(id);

      if (Number.isNaN(parsedId)) {
        res.status(400);
        throw new Error("Id must by a number");
      }

      if (!Firma.isCompany(data)) {
        res.status(404);
        throw new Error("Not every field are valid");
      }

      const updatedCompany = await this.client.firma.update({
        where: {
          idFirmy: parsedId,
        },
        data,
      });

      res.status(201).json(updatedCompany);
    };
  }

  delete(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const data = req.body;
      const { id } = req.params;

      const parsedId = Number(id);

      if (Number.isNaN(parsedId)) {
        res.status(400);
        throw new Error("Id must by a number");
      }

      if (!Firma.isCompany(data)) {
        res.status(404);
        throw new Error("Not every field are valid");
      }

      const company = await this.client.firma.findUnique({
        where: {
          idFirmy: parsedId,
        },
      });

      if (!company) {
        res.status(404);
        throw new Error("There is not company on this id");
      }

      const deletedCompany = await this.client.firma.delete({
        where: {
          idFirmy: parsedId,
        },
      });

      res.status(201).json(deletedCompany);
    };
  }
}
