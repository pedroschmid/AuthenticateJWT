import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import MovieModel from "../models/MovieModel.js";

export default class UserController {
  // Get all users
  async getAll(request, response) {
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

  async getById(request, response) {
    await MovieModel.findById(request.params.movieId, (error, result) => {
      if (error) {
        throw error;
      } else {
        response.json({
          status: "SUCCESS",
          message: "USER FOUND SUCCESSFULLY",
          data: result
        });
      }
    });
  }

  // Create user
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

  // Update user by name
  async updateById(request, response) {
    let data = request.body;

    await UserModel.findByIdAndUpdate(
      request.params.userId,
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

  // Delet user by name
  async deleteById(request, response) {
    await UserModel.findByIdAndDelete(
      request.params.movieId,
      (error, result) => {
        if (error) {
          throw error;
        } else {
          response.json({
            status: "SUCCESS",
            message: "USER DELETED SUCCESSFULLY",
            data: result
          });
        }
      }
    );
  }

  // Authenticate user and generate a jwt token
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
