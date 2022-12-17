import express, { Express } from "express";
import { CustomerRoute } from "./routes/CustomerRoute";
import { Route } from "./routes/Route";

export class App {
  app: Express;
  routes: Array<Route> = [new CustomerRoute()];
  port: Number = Number(process.env.PORT) || 3000;

  constructor() {
    this.app = express();

    this.config();

    this.applyRoutes();

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  applyRoutes(): void {
    this.routes.forEach((route) => {
      this.app.use(route.getRouterName(), route.getRouter());
    });
  }
}