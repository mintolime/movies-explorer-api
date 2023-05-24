const moviesRouter = require('express').Router();

const {
  createMovie,
  getAllMovies,
  deleteMovie,
} = require('../controllers/movies');
const { movieIdValidation, createMovieValidation } = require('../validation/validation');

// возвращает все сохранённые текущим  пользователем фильмы
moviesRouter.get('/', getAllMovies);
// создаёт фильм с переданными в теле
// country, director, duration, year, description, image, trailer, nameRU и т.д
moviesRouter.post('/', createMovieValidation, createMovie);
// удаляет сохранённый фильм по id
moviesRouter.delete('/:_id', movieIdValidation, deleteMovie);

module.exports = moviesRouter;
