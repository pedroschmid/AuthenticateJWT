import UserController from "../controllers/UserController.js";

export default class UserRoute {
  userController = new UserController();

  routes(app) {
    app
      .route("/user")
      .get(this.userController.read)
      .post(this.userController.create);

    app
      .route("/user/:name")
      .put(this.userController.update)
      .delete(this.userController.delete);

    app.route("/user/authenticate").get(this.userController.authenticate);
  }
}
