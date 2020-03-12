import express from "express";

import UserController from "../controllers/UserController.js";

export default class UserRoute {
  userController = new UserController();

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  routes() {
    this.router.get("/", this.userController.getAll);
    this.router.post("/", this.userController.create);
    this.router.post("/authenticate", this.userController.authenticate);
    this.router.put("/:userName", this.userController.updateByName);
    this.router.delete("/:userName", this.userController.deleteByName);
  }
}
