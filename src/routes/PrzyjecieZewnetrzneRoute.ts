import { PrzyjecieZewnetrzneController } from "../controllers/PrzyjecieZewnetrzneController";
import { Route } from "./Route";

export class PrzyjecieZewnetrzneRoute extends Route {
  constructor() {
    super(new PrzyjecieZewnetrzneController(), "/good-received-note");
  }
}
