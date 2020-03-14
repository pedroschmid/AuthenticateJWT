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
    await MovieModel.findById(request.params.movieId, (error, result) => {
      if (error) {
        throw error;
      } else {
        response.json({
          status: "SUCCESS",
          message: "MOVIE FOUND SUCCESSFULLY",
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
    let data = request.body;

    await MovieModel.findByIdAndUpdate(
      request.params.movieId,
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
    await MovieModel.findByIdAndDelete(
      request.params.movieId,
      (error, result) => {
        if (error) {
          throw error;
        } else {
          response.json({
            status: "SUCCESS",
            message: "MOVIE DELETED SUCCESSFULLY",
            data: result
          });
        }
      }
    );
  }
}
