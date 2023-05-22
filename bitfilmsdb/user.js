const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, 'Данное поле обязательно к заполнению'],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: [true, 'Данное поле обязательно к заполнению'],
    select: false,
  },
}, { versionKey: false }); // для скрытия версий в момент создания

module.exports = mongoose.model('user', userSchema);
