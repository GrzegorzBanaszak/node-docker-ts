import { CustomerProps } from "../types/CustomerProps";
import { Entity } from "./Entity";

export class CustomerEntity extends Entity {
  constructor() {
    super();
    this.id = "id";
    this.props = new CustomerProps();
  }
}
