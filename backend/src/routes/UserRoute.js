import { UserController } from "../controllers/UserController";

export class UserRoute {
  userController = new UserController();

  routes(app) {
    app
      .route("/user")
      .get(this.userController.selectAll)
      .post(this.userController.insert)
      .delete(this.userController.deleteAll);

    app
      .route("/user/:id")
      .get(this.userController.selectById)
      .put(this.userController.updateById)
      .delete(this.userController.deleteById);
  }
}
