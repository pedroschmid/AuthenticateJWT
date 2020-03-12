import express from "express";

import MovieController from "../controllers/MovieController.js";

export default class MovieRoute {
  movieController = new MovieController();

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  routes() {
    this.router.get("/", this.movieController.getAll);
    this.router.get("/:movieName", this.movieController.getByName);
    this.router.post("/", this.movieController.create);
    this.router.put("/:movieName", this.movieController.updateByName);
    this.router.delete("/:movieName", this.movieController.deleteByName);
  }
}
