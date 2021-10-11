export default class Card {
  /** constructor of Card class.
   * @param {object} data - new card data, text and a link to the image.
   * @param {string} cardSelector - the selector of the template elemnt of a card.
   */
  constructor(
    { name, link, likes, _id, owner },
    cardSelector,
    userId,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._title = name;
    this._src = link;
    this._alt = "picture of " + name;
    this._likes = likes;
    this._id = _id;
    this._owner = owner;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  /** this function returns a new template card. */
  _getTemplate() {
    const cardTemplate = document.querySelector(`#${this._cardSelector}`).content;
    const card = cardTemplate.querySelector(`.${this._cardSelector}`).cloneNode(true);

    return card;
  }

  /** this function generates a new card. */
  generateCard() {
    this._card = this._getTemplate();
    this._setEventListeners();

    this._card.querySelector(".place__title").textContent = this._title;
    this._card.querySelector(".place__image").src = this._src;
    this._card.querySelector(".place__image").alt = this._alt;
    this._card.querySelector(".place__like-counter").textContent = this._likes.length;

    // checking if the card is already like and toggle the like button state accordingly.
    if (this._checkIfCardLiked(this._likes)) {
      this._toggleLikeCard(this._card.querySelector(".place__like"));
    }

    // if the card was not created by the user the delete button will be hidden.
    this._hideDeleteBtn();

    return this._card;
  }

  /** this function installs event listener to a new card. */
  _setEventListeners() {
    this._card.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("place__delete")) {
        this._handleDeleteClick(this._id, this._card);
      } else if (evt.target.classList.contains("place__like")) {
        evt.target.classList.contains("place__like_theme_like")
          ? this._handleLikeClick(false, evt.target)
          : this._handleLikeClick(true, evt.target);
      } else if (evt.target.classList.contains("place__image")) {
        this._handleImageClick(evt);
      }
    });
  }

  /** this function hides the delete button if the current card was not created by the user. */
  _hideDeleteBtn() {
    if (this._owner._id !== this._userId) {
      this._card.querySelector(".place__delete").style.display = "none";
    }
  }

  /** this function toggles the like button's theme.
   * @param likeBtn - the element that triggered the event.
   */
  _toggleLikeCard(likeBtn) {
    likeBtn.classList.toggle("place__like_theme_like");
    likeBtn.classList.toggle("place__like_theme_unlike");
  }

  /** this function checks if the card is alredy liked. */
  _checkIfCardLiked() {
    return this._likes.some((like) => {
      return like._id === this._userId;
    });
  }

  /** this function updates the number of likes of the card.
   * @param likes - up to date card's likes.
   */
  updateLikes(likes, evt) {
    this._toggleLikeCard(evt);
    this._card.querySelector(".place__like-counter").textContent = likes;
  }
}
