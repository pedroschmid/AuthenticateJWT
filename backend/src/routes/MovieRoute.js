import express from "express";
import MovieController from "../controllers/MovieController.js";

let router = express.Router();
let movieController = new MovieController();

router.get("/", movieController.getAll);
router.get("/:movieId", movieController.getByName);
router.post("/", movieController.create);
router.put("/:movieId", movieController.updateByName);
router.delete("/:movieId", movieController.deleteByName);

export default router;
