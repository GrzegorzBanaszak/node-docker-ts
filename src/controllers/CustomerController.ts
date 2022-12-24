import { CustomerProps } from "./../types/CustomerProps";
import { Request, Response } from "express";
import { Controller } from "./Controller";
import { CustomerEntity } from "../entities/CustomerEntity";
import { QueryMaker } from "../db/QueryMaker";

export class CustomerController extends Controller {
  constructor() {
    super(new CustomerEntity());
    this.queryMaker = new QueryMaker(
      this.entity.getId(),
      this.entity.getPropsArray(),
      "customers"
    );
  }

  getAll() {
    return async (req: Request, res: Response) => {
      const customer = await this.client.query(this.queryMaker.getAllQuery());
      res.status(200).json(customer);
    };
  }
  get() {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      const customer = await this.client.query(
        this.queryMaker.getByIdQuery(id)
      );

      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ message: "Customer dont exist" });
      }
    };
  }
  add() {
    return async (req: Request, res: Response) => {
      const { firstName, lastName, email } = req.body;
      const addQuery = this.queryMaker.addQuery<CustomerProps>({
        firstName,
        lastName,
        email,
      });

      const response = await this.client.singleQuery(addQuery);

      if (!response.insertId) {
        res.status(404).json({ message: "Failed to add a new customer" });
      } else {
        const customer = await this.client.query(
          this.queryMaker.getByIdQuery(String(response.insertId))
        );
        res.status(200).json(customer);
      }
    };
  }
}
