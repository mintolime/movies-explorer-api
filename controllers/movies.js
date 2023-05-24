const Movie = require('../bitfilmsdb/movie');
const { handleSucsessResponse } = require('../utils/handleSucsessResponse');

const BadRequest = require('../utils/errors/BadRequest');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const NotFoundError = require('../utils/errors/NotFoundError');

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
        return next(new BadRequest('Переданы некорректные данные '));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const movieId = req.params.moviesId;

  Movie.findById({ _id: movieId })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Чужую карточку удалить нельзя');
      } else {
        return Movie.deleteOne({ _id: movieId })
          .then((data) => { handleSucsessResponse(res, 200, data); });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequest('Переданы некорректные данные '));
      }
      return next(err);
    });
};

module.exports = {
  createMovie, getAllMovies, deleteMovie,
};