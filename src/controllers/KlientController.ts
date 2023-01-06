import { Request, Response } from "express";
import { Controller } from "./Controller";
import { Klient } from "../classes/Klient";

export class KlientController extends Controller {
  getAll(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const customers = await this.client.klient.findMany({
        select: {
          idKlienta: true,
          nazwisko: true,
          imie: true,
          numerTelefonu: true,
          email: true,
          Firma: true,
        },
      });

      res.status(200).json(customers);
    };
  }
  get(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      const parsedId: number = Number(id);

      if (Number.isNaN(parsedId)) {
        res.status(400);
        throw new Error("Id must by a number");
      }

      const customer = await this.client.klient.findUnique({
        where: {
          idKlienta: parsedId,
        },
        select: {
          idKlienta: true,
          nazwisko: true,
          imie: true,
          numerTelefonu: true,
          email: true,
          Firma: true,
        },
      });

      if (!customer) {
        res.status(404);
        throw new Error("Customer don't find");
      }
      res.status(200).json(customer);
    };
  }
  add(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const data: unknown = req.body;

      if (!Klient.isValid(data)) {
        res.status(400);
        throw new Error("Data is not valid");
      }

      const customer = await this.client.klient.create({
        data,
      });

      res.status(200).json(customer);
    };
  }
  update(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const data: unknown = req.body;
      const { id } = req.params;

      const parsedId = Number(id);

      if (Number.isNaN(parsedId)) {
        res.status(400);
        throw new Error("Id must by a number");
      }

      if (!Klient.isValid(data)) {
        res.status(404);
        throw new Error("Not every field are valid");
      }

      const updatedCustmer = await this.client.klient.update({
        where: {
          idKlienta: parsedId,
        },
        data,
        select: {
          idKlienta: true,
          nazwisko: true,
          imie: true,
          numerTelefonu: true,
          email: true,
          Firma: true,
        },
      });

      res.status(201).json(updatedCustmer);
    };
  }
  delete(): (req: Request, res: Response) => Promise<void> {
    return async (req: Request, res: Response) => {
      const data: unknown = req.body;
      const { id } = req.params;

      const parsedId = Number(id);

      if (Number.isNaN(parsedId)) {
        res.status(400);
        throw new Error("Id must by a number");
      }

      if (!Klient.isValid(data)) {
        res.status(404);
        throw new Error("Not every field are valid");
      }

      const customer = await this.client.klient.findUnique({
        where: {
          idKlienta: parsedId,
        },
      });

      if (!customer) {
        res.status(404);
        throw new Error("There is not customer on this id");
      }

      const deletedCustomer = await this.client.klient.delete({
        where: {
          idKlienta: parsedId,
        },
      });

      res.status(201).json(deletedCustomer);
    };
  }
}
