import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import UserRoute from "./routes/UserRoute.js";

class App {
  userRoute = new UserRoute()
  constructor() {
    this.app = express();
    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
  }

  database() {
    mongoose.Promise = global.Promise;
    mongoose.connect(
      "mongodb+srv://root:root@powertrip-zp9uk.mongodb.net/imgone?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    );
  }

  routes() {
    this.userRoute.routes(this.app)
  }
}

export default new App().app;
