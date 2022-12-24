import express, { Express } from "express";
import { CustomerRoute } from "./routes/CustomerRoute";
import { Route } from "./routes/Route";
import { Client } from "./db/Client";
import { CompanyRoute } from "./routes/CompanyRoute";

export class App {
  app: Express;
  routes: Array<Route> = [new CustomerRoute(), new CompanyRoute()];
  port: Number = Number(process.env.PORT) || 3000;

  constructor() {
    this.app = express();

    //Initialisation client container to create connection with Mysql
    Client.getInstancion();

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
