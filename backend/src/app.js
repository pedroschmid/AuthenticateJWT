import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { UserRoute } from "./routes/UserRoute";

class App {
  PORT = process.env.PORT || 8080;
  userRoute = new UserRoute();

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.server();
  }

  middlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  routes() {
    this.userRoute.routes(this.app);
  }

  server() {
    this.app.listen(this.PORT, () => {
      console.log(`Server running on 127.0.0.1:${this.PORT}/`);
    });
  }
}

new App();
