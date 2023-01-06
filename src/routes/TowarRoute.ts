import { TowarController } from "../controllers/TowarController";
import { Route } from "./Route";

export class TowarRoute extends Route {
  constructor() {
    super(new TowarController(), "/commodity");
  }
}
