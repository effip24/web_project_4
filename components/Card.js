export default class Card {
  /** constructor of Card class
   * @param {object} data - new card data, text and a link to the image.
   * @param {string} cardSelector - the selector of the template elemnt of a card.
   */
  constructor({title, link}, cardSelector, handleCardClick) {
    this._title = title;
    this._src = link;
    this._alt = "picture of " + title;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  /** this function returns new template card */
  _getTemplate() {
    const cardTemplate = document.querySelector(`#${this._cardSelector}`).content;
    const card = cardTemplate.querySelector(`.${this._cardSelector}`).cloneNode(true);

    return card;
  }

  /** this function generates a new card */
  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector(".place__title").textContent = this._title;
    this._card.querySelector(".place__image").src = this._src;
    this._card.querySelector(".place__image").alt = this._alt;

    return this._card;
  }

  /** this function installs event listener to a new card */
  _setEventListeners() {
    this._card.addEventListener("click", (evt) => {
      this._handleCardClick(evt);
    });
  }

  /** this function deletes a card from DOM */
  _deleteCard() {
    this._card.remove();
    this._card = null;
  }

  /** this function toggles the liked button's theme
   * @param evt - the element that triggered the event.
   */
  _toggleLikeCard(evt) {
    evt.target.classList.toggle("place__like_theme_like");
    evt.target.classList.toggle("place__like_theme_unlike");
  }
}
