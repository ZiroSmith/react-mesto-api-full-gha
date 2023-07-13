export class Api {
  constructor({ address }) {
    this._address = address;
  }

   //обработка запроса
   _request(url, options) {
    const fetchAddress = `${this._address}/${url}`

    return fetch(fetchAddress, options).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  }


  //Метод для запроса информации о пользователе с сервера
  getUserInfo() {
    const token = localStorage.getItem('token');
    return this._request(`users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  }

  //Метод для загрузки массива карточек с сервера
  getInitialCards() {
    const token = localStorage.getItem('token');
    return this._request(`cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
    )
  }

  //Метод для редактирования информации в профиле
  editUserInfo({ name, about }) {
    const token = localStorage.getItem('token');
    return this._request(`users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about })
    })
  }

  //Метод для изменения аватара пользователя
  editAvatar(data){
    const token = localStorage.getItem('token');
    return this._request(`users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  }

  //Метод для добавления новой карточки (отправляет данные на сервер)
  addCard(data) {
    const token = localStorage.getItem('token');
    return this._request(`cards`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  }

  ///Метод для удаления карточки (запрашивает удаление данных с сервера)
  removeCard(cardId) {
    const token = localStorage.getItem('token');
    return this._request(`cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  }

  //Метод для добавления Like на карточке (запрашивает изменение данных на сервере)
  addLike(cardId) {
    const token = localStorage.getItem('token');
    return this._request(`cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  }

   //Метод для удаления Like на карточке (запрашивает изменение данных на сервере)
  deleteLike(cardId) {
    const token = localStorage.getItem('token');
    return this._request(`cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
  }

  //Метод-переключатель лайка
  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.deleteLike(cardId) : this.addLike(cardId)
  }

}

export const api = new Api({
  address: 'https://api.zeromesto.nomoredomains.work',
});

