const keys = require('../keys/index');


module.exports = function(email, token) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Сброс пароля',
    html: `
      <h1>Вы забыли ваш пароль?</h1>
      <p>Если нет - проигнорируйте данное письмо</p>
      <p>В противном случае воспользуйтесь ссылкой ниже: </p>
      <p><a href="${keys.BASE_URL}/auth/password/${token}">сброс пароля</a></p>
      <hr />
      <a href="${keys.BASE_URL}">bloodborne-shop.ru</a>
    `
  };
};