const keys = require('../keys');

module.exports = function(email) {
  return {
    to: email,
    from: keys.EMAIL_FROM,
    subject: 'Аккаунт создан',
    html: `
    <h1>Добро пожаловать в Ярнам!</h1>
    <p>Ваш аккаунт был успешно создан. Email: ${email}</p>
    <hr />
    <a href="${keys.BASE_URL}">bloodborne-shop.ru</a>
    `
  }
}