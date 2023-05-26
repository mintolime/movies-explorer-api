const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Данное поле обязательно к заполнению'],
  },
  director: {
    type: String,
    required: [true, 'Данное поле обязательно к заполнению'],
  },
  duration: {
    type: Number,
    required: [true, 'Данное поле обязательно к заполнению'],
  },
  year: {
    type: String,
    required: [true, 'Данное поле обязательно к заполнению'],
  },
  description: {
    type: String,
    required: [true, 'Данное поле обязательно к заполнению'],
  },
  image: {
    type: String,
    required: [true, 'Данное поле обязательно к заполнению'],
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Неправильный формат URL',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Данное поле обязательно к заполнению'],
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Неправильный формат URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Данное поле обязательно к заполнению'],
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'Неправильный формат URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Данное поле обязательно к заполнению'],
  },
  movieId: {
    type: Number,
    required: [true, 'Данное поле обязательно к заполнению'],
  },
  nameRU: {
    type: String,
    required: [true, 'Данное поле обязательно к заполнению'],
  },
  nameEN: {
    type: String,
    required: [true, 'Данное поле обязательно к заполнению'],
  },
}, { versionKey: false }); // для скрытия версий в момент создания

module.exports = mongoose.model('movie', movieSchema);
