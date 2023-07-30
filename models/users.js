const mongoose = require('mongoose');

// name — имя пользователя, строка от 2 до 30 символов, обязательное поле;
// about — информация о пользователе, строка от 2 до 30 символов, обязательное поле;
// avatar — ссылка на аватарку, строка, обязательное поле. В следующем спринте вы напишите собственное решение для валидации этого поля.
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);