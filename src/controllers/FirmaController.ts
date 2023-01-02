import { Request, Response } from "express";

import { Controller } from "./Controller";

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

      if (!Number.isNaN(parsedId)) {
        const company = await this.client.firma.findUnique({
          where: {
            idFirmy: parsedId,
          },
        });

        if (!company) {
          res.status(404).json({ message: "Not find" });
        } else {
          res.status(200).json(company);
        }
      } else {
        res.status(400).json({ message: "Wrong id" });
      }
    };
  }
  add(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {};
  }
}
