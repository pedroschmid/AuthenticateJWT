import MovieModel from "../models/MovieModel";

export default class MovieController {
  async getAll(request, response) {
    await MovieModel.find({}, (error, result) => {
      if (error) {
        throw error;
      } else {
        response.json({
          status: "SUCCESS",
          message: "LISTING MOVIES",
          data: result
        });
      }
    });
  }

  async getByName(request, response) {
    let filter = { name: request.params.movieName };

    await MovieModel.findOne(filter, (error, result) => {
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

  async create(request, response) {
    let newMovie = new MovieModel(request.body);

    await newMovie.save((error, result) => {
      if (error) {
        throw error;
      } else {
        response.json({
          status: "SUCCESS",
          message: "MOVIE ADDED SUCCESSFULLY",
          data: result
        });
      }
    });
  }

  async updateByName(request, response) {
    let filter = { name: request.params.movieName };
    let data = request.body;

    await MovieModel.findOneAndUpdate(
      filter,
      data,
      { new: true },
      (error, result) => {
        if (error) {
          throw error;
        } else {
          response.json({
            status: "SUCCESS",
            message: "MOVIE UPDATED SUCCESSFULLY",
            data: result
          });
        }
      }
    );
  }

  async deleteByName(request, response) {
    let filter = { name: request.body.movieName };

    await MovieModel.findOneAndDelete(filter, (error, result) => {
      if (error) {
        throw error;
      } else {
        response.json({
          status: "SUCCESS",
          message: "MOVIE DELETED SUCCESSFULLY",
          data: result
        });
      }
    });
  }
}
