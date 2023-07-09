// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://murtazaev-mesto.nomoredomains.monster',
  'http://murtazaev-mesto.nomoredomains.monster',
  'localhost:3000',
];

// разрешенные методы
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const requestHeaders = req.headers['access-control-request-headers'];
  const { method } = req;
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  next();
};
