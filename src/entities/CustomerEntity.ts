import { CustomerProps } from "../types/CustomerProps";
import { Entity } from "./Entity";

export class CustomerEntity extends Entity {
  constructor() {
    super("id", new CustomerProps());
  }
}
