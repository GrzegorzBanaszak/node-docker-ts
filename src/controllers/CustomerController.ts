import { Request, Response } from "express";
import { Controller } from "./Controller";
import { CustomerEntity } from "../entities/CustomerEntity";
import { CustomerProps } from "../types/CustomerProps";

export class CustomerController extends Controller {
  constructor() {
    super();
    this.entity = new CustomerEntity();
  }

  getAll() {
    return async (req: Request, res: Response) => {
      const customer = await this.client.getAll(
        this.entity.getPropsAndId(),
        "customers"
      );
      res.status(200).json(customer);
    };
  }
  get() {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      const customer = await this.client.getById(
        id,
        this.entity.getId(),
        this.entity.getPropsAndId(),
        "customers"
      );

      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ message: "Customer dont exist" });
      }
    };
  }
  add() {
    const props = this.entity.getProps();

    return async (req: Request, res: Response) => {
      const { firstName, lastName, email } = req.body;

      console.log(
        `INSERT INTO customers (${props}) VALUES ('${firstName}','${lastName}','${email}')`
      );

      const response = await this.client.query(
        `INSERT INTO customers (${props}) VALUES ('${firstName}','${lastName}','${email}')`
      );

      console.log(response[0]);

      // const customer = await this.client.query(
      //   `SELECT ${props} FROM customers WHERE id=${response[0].insertId}`
      // );

      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "Failed to add a new customer" });
      }
    };
  }
}
