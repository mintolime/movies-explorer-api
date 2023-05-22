const moviesRouter = require('express').Router();
const {
  createMovie,
  getAllMovies,
  deleteMovie,
} = require('../controllers/movies');
// const { moviesIdValidation, createMoviesValidation } = require('../validation/validation');

// возвращает все сохранённые текущим  пользователем фильмы
moviesRouter.get('/', getAllMovies);
// создаёт фильм с переданными в теле
// country, director, duration, year, description, image, trailer, nameRU,
// nameEN и thumbnail, movieId
moviesRouter.post('/', createMovie);
// удаляет сохранённый фильм по id
moviesRouter.delete('/:moviesId', deleteMovie);

module.exports = moviesRouter;
