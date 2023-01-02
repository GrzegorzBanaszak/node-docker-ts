import { FirmaController } from "../controllers/FirmaController";
import { Route } from "./Route";

export class FirmaRoute extends Route {
  constructor() {
    super(new FirmaController(), "/company");
  }
}
