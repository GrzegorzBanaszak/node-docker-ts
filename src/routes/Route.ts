import { Router } from "express";
import { Controller } from "../controllers/Controller";

export abstract class Route {
  protected router: Router;
  protected routerName: string;
  protected controller: Controller;

  constructor(controller: Controller, routeName: string) {
    this.router = Router();
    this.controller = controller;
    this.initRoutes();
    this.routerName = routeName;
  }

  private initRoutes() {
    this.router.get("/", this.controller.getAll());
    this.router.get("/:id", this.controller.get());
    this.router.post("/", this.controller.add());
  }

  getRouterName(): string {
    return this.routerName;
  }

  getRouter(): Router {
    return this.router;
  }
}
