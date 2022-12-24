import { CompanyProps } from "../types/CompanyProps";
import { Entity } from "./Entity";

export class CompanyEntity extends Entity {
  constructor() {
    super("idFirmy", new CompanyProps());
  }
}
