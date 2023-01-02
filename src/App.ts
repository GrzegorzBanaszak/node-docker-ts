import express, { Express } from "express";
import { Route } from "./routes/Route";
import { PrismaLocalClient } from "./prisma/Prisma";
import { FirmaRoute } from "./routes/FrimaRoute";
import { ErrorMiddleware } from "./middleware/errorMiddleware";

export class App {
  app: Express;
  routes: Array<Route> = [new FirmaRoute()];
  port: Number = Number(process.env.PORT) || 3000;

  constructor() {
    this.app = express();

    //Initialisation client container to create connection with Mysql
    PrismaLocalClient.getInstancion();

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

    //Adding error handler
    this.app.use(ErrorMiddleware.errorHandle);
  }
}
