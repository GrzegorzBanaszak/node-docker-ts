import { Router } from "express";
import { Controller } from "../controllers/Controller";
import asyncHandelr from "express-async-handler";

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
    this.router.get("/", asyncHandelr(this.controller.getAll()));
    this.router.get("/:id", asyncHandelr(this.controller.get()));
    this.router.post("/add", asyncHandelr(this.controller.add()));
    this.router.put("/:id", asyncHandelr(this.controller.update()));
    this.router.delete("/:id", asyncHandelr(this.controller.delete()));
  }

  getRouterName(): string {
    return this.routerName;
  }

  getRouter(): Router {
    return this.router;
  }
}
