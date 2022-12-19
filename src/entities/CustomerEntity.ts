import { Entity } from "./Entity";

export class CustomerEntity extends Entity {
  constructor() {
    super();
    this.id = "id";
    this.props = ["first_name", "last_name", "email"];
  }
}
