import { Request, Response } from "express";
import { Controller } from "./Controller";
import { CustomerEntity } from "../entities/CustomerEntity";

export class CustomerController extends Controller {
  constructor() {
    super();
    this.entity = new CustomerEntity();
  }

  getAll() {
    const props = this.entity.getPropsAndId();

    return async (req: Request, res: Response) => {
      const items = await this.client.query(`SELECT ${props} FROM customers`);
      res.status(200).json(items);
    };
  }
  get() {
    const props = this.entity.getPropsAndId();

    return async (req: Request, res: Response) => {
      const { id } = req.params;

      const customer = await this.client.query(
        `SELECT ${props} FROM customers WHERE id=${id}`
      );

      if (customer[0]) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ message: "Customer dont exist" });
      }
    };
  }
  add() {
    const props = this.entity.getPropsAndId();

    return async (req: Request, res: Response) => {
      const { firstName, lastName, email } = req.body;

      const customer = await this.client.query(
        `INSERT INTO customers (firstName,lastName,email) VALUES ('${firstName}','${lastName}','${email}')`
      );

      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ message: "Failed to add a new customer" });
      }
    };
  }
}
