// API Class
// token
const jwt = localStorage.getItem("token") || 'No Token';
//делаю экспорт по умолчанию
class Api {
//к baseURL добавил URL api по - умолчанию
  constructor({ baseURL='https://api.murtazaev-mesto.nomoredomains.monster', headers }) {
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
  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  // получение начальных карточек мест
  getInitialCards() {
    return fetch(`${this.url}/cards`, { headers: this.headers }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  // обновить данные порфиля
  updateProfileInfo(name, about) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  // обновить аватарку
  updateProfileAvatar(avatar) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({ avatar }),
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  // добавить новую краточку
  sendNewCard({ name, link }) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ name, link }),
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  // удалить карточку
  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  // отправить лайк
  sendLike(id, likes) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({ likes }),
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  // удалить лайк
  deleteLike(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }
}

const api = new Api({
  baseURL: 'https://api.murtazaev-mesto.nomoredomains.monster',
    headers: {
    //Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFkNGExY2NkN2JhMTdjZWNhNjljOTQiLCJpYXQiOjE2ODkwOTE5ODQsImV4cCI6MTY4OTY5Njc4NH0.AH5-BxRB9hW-Wa-xyVUsA7weT0-lTToW4aFeoHBEQB0',
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  },
});

export default api;
