// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://api.mintolime-movies.nomoredomains.rocks',
  'http://api.mintolime-movies.nomoredomains.rocks',
  'https://mintolime-movies.nomoredomains.rocks',
  'http://mintolime-movies.nomoredomains.rocks',
  'https://localhost:3000',
  'http://localhost:3000',
];

module.exports = allowedCors;
