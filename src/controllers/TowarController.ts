import { Towar } from "../classes/Towar";
import { Controller } from "./Controller";
import { Request, Response } from "express";
export class TowarController extends Controller {
  getAll(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const commodites = await this.client.firma.findMany();

      res.status(200).json(commodites);
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

      const commodity = await this.client.towar.findUnique({
        where: {
          idTowaru: parsedId,
        },
      });

      if (!commodity) {
        res.status(404);
        throw new Error("Company don't find");
      }

      res.status(200).json(commodity);
    };
  }
  add(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const data = req.body;

      if (!Towar.isValid(data)) {
        res.status(404);
        throw new Error("Not every field are valid");
      }

      const newCommodity = await this.client.towar.create({
        data,
      });

      res.status(201).json(newCommodity);
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

      if (!Towar.isValid(data)) {
        res.status(404);
        throw new Error("Not every field are valid");
      }

      const updatedCommodity = await this.client.towar.update({
        where: {
          idTowaru: parsedId,
        },
        data,
      });

      res.status(201).json(updatedCommodity);
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

      if (!Towar.isValid(data)) {
        res.status(404);
        throw new Error("Not every field are valid");
      }

      const company = await this.client.towar.findUnique({
        where: {
          idTowaru: parsedId,
        },
      });

      if (!company) {
        res.status(404);
        throw new Error("There is not company on this id");
      }

      const deletedCommodity = await this.client.towar.delete({
        where: {
          idTowaru: parsedId,
        },
      });

      res.status(201).json(deletedCommodity);
    };
  }
}
