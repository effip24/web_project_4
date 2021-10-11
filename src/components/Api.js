export default class Api {
  /** constructor of API class.
   * @param  baseUrl - the URL to make the request to.
   * @param headers  contain information about the resource to be fetched.
   */
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  /** this function returns the name and the about information from the server. */
  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", { headers: this._headers }).then((res) => {
      return this._checkResponse(res);
    });
  }

  /** this function returns the cards from the server. */
  getInitialCards() {
    return fetch(this._baseUrl + "/cards", { headers: this._headers }).then((res) => {
      return this._checkResponse(res);
    });
  }

  /** this function saves new user info on the server(name, about).
   * @param  name - the new name to be saved.
   * @param about - the new about to be saved.
   */
  saveUserInfo(name, about) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: name, about: about }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  /** this function saves new card on the server.
   * @param  name - the name of the new card.
   * @param link - link to the card's image.
   */
  saveCard(name, link) {
    return fetch(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: name, link: link }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  /** this function deletes a card from the server.
   * @param  cardId - the id of the deleted card.
   */
  deleteCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  /** this function add a like to a card.
   * @param  cardId - the id of the liked card.
   */
  addLike(cardId) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  /** this function removes a like from a card.
   * @param  cardId - the id of the unliked card.
   */
  removeLike(cardId) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  /** this function saves a user's avatar on the server.
   * @param  link - link to the new avatar's image.
   */
  updateProfilePicture(link) {
    return fetch(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: link }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
}
