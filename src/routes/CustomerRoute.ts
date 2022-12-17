import { CustomerController } from "./../controllers/CustomerController";
import { Route } from "./Route";

export class CustomerRoute extends Route {
  constructor() {
    super(new CustomerController());
    this.routerName = "/customer";
  }
}
