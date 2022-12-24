import { CompanyController } from "../controllers/CompanyController";
import { Route } from "./Route";

export class CompanyRoute extends Route {
  constructor() {
    super(new CompanyController(), "/company");
  }
}
