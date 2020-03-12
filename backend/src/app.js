import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import jwt from "jsonwebtoken";

import UserRoute from "./routes/UserRoute.js";
import MovieRoute from "./routes/MovieRoute.js";

class App {
  userRoute = new UserRoute();
  movieRoute = new MovieRoute();

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
    this.app.use("/users", this.userRoute.routes);
    this.app.use("/movies", this.validateUser, this.movieRoute.routes);
  }

  validateUser(req, res, next) {
    jwt.verify(
      req.headers["x-access-token"],
      req.app.get("secretKey"),
      function(err, decoded) {
        if (err) {
          res.json({ status: "error", message: err.message, data: null });
        } else {
          // add user id to request
          req.body.userName = decoded.name;
          next();
        }
      }
    );
  }
}

export default new App().app;
