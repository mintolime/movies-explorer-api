const Movie = require('../models/movie');
const { handleSucsessResponse } = require('../utils/constants/handleSucsessResponse');

const BadRequest = require('../utils/errors/BadRequest');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const NotFoundError = require('../utils/errors/NotFoundError');

const { BAD_REQUEST, FILM_NOT_FOUND_MESSAGE, DELETE_NOT_OWN_FILM_MESSAGE } = require('../utils/constants/errorsMessage');

const getAllMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movie) => {
      handleSucsessResponse(res, 200, movie);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((newMovie) => {
      handleSucsessResponse(res, 201, newMovie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest(BAD_REQUEST));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById({ _id: req.params.moviesId })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(FILM_NOT_FOUND_MESSAGE);
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(DELETE_NOT_OWN_FILM_MESSAGE);
      } else {
        return Movie.deleteOne({ _id: req.params.moviesId })
          .then((data) => { handleSucsessResponse(res, 200, data); });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest(BAD_REQUEST));
      }
      return next(err);
    });
};

module.exports = {
  createMovie, getAllMovies, deleteMovie,
};
