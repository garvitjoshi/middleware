import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as errorHandler from "./helpers/errorHandler";
import * as express from "express";
import * as helmet from "helmet";
import * as morgan from "morgan";
import * as session from "express-session";
import * as swaggerUi from "swagger-ui-express";

import CONFIG from "./config/config";
import apiV1 from "./apiV1/index";
import { stream } from "./config/winston";

const swaggerDocument = require("./../swagger.json");

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(morgan("combined", { stream }));
    this.express.use(
      session({
        secret: CONFIG.EXPRESS_SESSION,
        saveUninitialized: true,
        resave: true
      })
    );
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(helmet());
  }

  private setRoutes(): void {
    this.express.use("/api/v1", apiV1);
    this.express.use("/api-docs", swaggerUi.serve);
    this.express.get("/api-docs", swaggerUi.setup(swaggerDocument));
  }

  private catchErrors(): void {
    this.express.use(errorHandler.notFound);
    this.express.use(errorHandler.internalServerError);
  }
}

export default new App().express;
