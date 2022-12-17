import { Request, Response } from "express";
import { Controller } from "./Controller";
import { customers } from "../mockData";

export class CustomerController extends Controller {
  async getAll(req: Request, res: Response) {
    res.status(200).json(customers);
  }
  async get(req: Request, res: Response) {
    const { id } = req.params;

    const customer = customers.find((c) => c.id === Number(id));

    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ message: "Customer dont exist" });
    }
  }
  async add(req: Request, res: Response) {
    throw new Error("Method not implemented.");
  }
}
