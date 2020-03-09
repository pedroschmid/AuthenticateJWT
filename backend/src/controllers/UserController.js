import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class UserController {
  async create(request, response) {
    let newUser = new UserModel(request.body);

    await newUser.save((error, result) => {
      if (error) {
        throw error;
      } else {
        response.json({
          status: "SUCCESS",
          message: "USER ADDED SUCCESSFULLY",
          data: result
        });
      }
    });
  }

  async read(request, response) {
    await UserModel.find({}, (error, result) => {
      if (error) {
        throw error;
      } else {
        response.json({
          status: "SUCCESS",
          message: "LISTING USERS",
          data: result
        });
      }
    });
  }

  async update(request, response) {
    let filter = {
      name: request.params.name
    };
    let data = request.body;

    await UserModel.findOneAndUpdate(
      filter,
      data,
      {
        new: true
      },
      (error, result) => {
        if (error) {
          throw error;
        } else {
          response.json({
            status: "SUCCESS",
            message: "USER UPDATED SUCCESSFULLY",
            data: result
          });
        }
      }
    );
  }

  async delete(request, response) {
    let filter = { name: request.params.name };

    await UserModel.findOneAndDelete(filter, (error, result) => {
      if (error) {
        throw error;
      } else {
        response.json({
          status: "SUCCESS",
          message: "USER DELETED SUCCESSFULLY",
          data: result
        });
      }
    });
  }

  async authenticate(request, response) {
    let { email, password } = request.body;

    UserModel.findOne({ email: email }, (error, result) => {
      if (error) {
        throw error;
      } else {
        if (bcrypt.compareSync(password, result.password)) {
          let token = jwt.sign(
            { id: result._id },
            request.app.get("secretKey"),
            { expiresIn: "1h" }
          );

          response.json({
            status: "success",
            message: "user found!",
            data: {
              user: result,
              token: token
            }
          });
        } else {
          response.json({
            status: "error",
            message: "invalid email/password!",
            data: null
          });
        }
      }
    });
  }
}
