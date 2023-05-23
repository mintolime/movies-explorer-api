const Movie = require('../bitfilmsdb/movie');
const { handleSucsessResponse } = require('../utils/handleSucsessResponse');

const BadRequest = require('../utils/errors/BadRequest');
// const ForbiddenError = require('../utils/errors/ForbiddenError');
const NotFoundError = require('../utils/errors/NotFoundError');

const getAllMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .then((movie) => {
      handleSucsessResponse(res, 200, movie);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  // const { _id } = req.user;
  const {
    country, director, duration, year,
    description, image, trailerLink, nameRU,
    nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((newMovie) => {
      console.log('новый фильм создан', newMovie);
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
  const { movieId } = req.params;
  // console.log("id movie", movieId)
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      return Movie.deleteOne({ _id: movieId })
        .then((data) => { handleSucsessResponse(res, 200, data); });
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
