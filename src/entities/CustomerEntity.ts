import { CustomerProps } from "../types/CustomerProps";
import { Entity } from "./Entity";

export class CustomerEntity extends Entity {
  getProps() {
    return this.props;
  }
  constructor() {
    super();
    this.id = "id";
    this.props = new CustomerProps();
  }
}
