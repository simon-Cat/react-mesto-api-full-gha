// API Class
class Api {
//к baseURL добавил URL api по - умолчанию
  constructor({ baseURL, headers }) {
    this.url = baseURL;
    this.headers = headers;
  }

  // проверить статус запроса
  _checkResponseStatus(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject('Ошибка запроса!');
    }
  }

  // получить данные пользователя
  getUserInfo(headers) {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: headers,
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  // получение начальных карточек мест
  getInitialCards(headers) {
    return fetch(`${this.url}/cards`, { headers: headers }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  // обновить данные порфиля
  updateProfileInfo(name, about, headers) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  // обновить аватарку
  updateProfileAvatar(avatar, headers) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({ avatar }),
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  // добавить новую краточку
  sendNewCard({ name, link }, headers) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ name, link }),
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  // удалить карточку
  deleteCard(id, headers) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: headers,
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  // отправить лайк
  sendLike(id, likes, headers) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({ likes }),
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  // удалить лайк
  deleteLike(id, headers) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: headers,
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }
}

const api = new Api({
  // baseURL: 'https://api.murtazaev-mesto.nomoredomains.monster',
  baseURL: 'http://localhost:3001',
});

export default api;
