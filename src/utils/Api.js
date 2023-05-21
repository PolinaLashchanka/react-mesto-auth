class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkError(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }

  editProfile(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkError(res));
  }

  addNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkError(res));
  }

  deleteCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT" ,
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }

  getLikesCount(id) {
    return fetch(`${this._url}cards/${id}/likes`, {
      method: "PATCH",
      headers: this._headers,
    }).then((res) => this._checkError(res));
  }

  editAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._checkError(res));
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-62/",
  headers: {
    authorization: "e2f559fb-ddf4-4c99-8ad8-fe195d8e449b",
    "content-type": "application/json",
  },
});

export default api;
