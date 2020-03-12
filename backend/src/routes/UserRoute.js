import express from "express";
import UserController from "../controllers/UserController.js";

let router = express.Router();
let userController = new UserController();

router.get("/", userController.getAll);
router.post("/", userController.create);
router.post("/authenticate", userController.authenticate);
router.put("/:userId", userController.updateByName);
router.delete("/:userId", userController.deleteByName);

export default router;
