import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import jwt from "jsonwebtoken";

import UserRoute from "./routes/UserRoute.js";
import MovieRoute from "./routes/MovieRoute.js";

class App {
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
    this.app.use(morgan("dev"));

    this.app.set("secretKey", "nodeRestApi"); // Secret token/key
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
    this.app.use("/users", UserRoute);
    this.app.use("/movies", this.validateUser, MovieRoute);
  }

  // Function to validate user
  validateUser(request, response) {
    jwt.verify(
      request.headers["x-access-token"],
      request.app.get("secretKey"),
      function(error, decoded) {
        if (error) {
          response.json({
            status: "error",
            message: error.message,
            data: null
          });
        } else {
          // add user id to request
          request.body.userId = decoded.id;
        }
      }
    );
  }
}

export default new App().app;
