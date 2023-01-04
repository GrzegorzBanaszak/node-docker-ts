import { KlientController } from "../controllers/KlientController";
import { Route } from "./Route";

export class KlientRoute extends Route {
  constructor() {
    super(new KlientController(), "/customer");
  }
}
