import Popup from "./Popup.js";

export default class PopupWidthDelete extends Popup {
  /** constructor of PopupWithForm class.
   * @param popupSelector - Css selector of a popup.
   * @param deleteHandler - a callback of the confirm button.
   */
  constructor({ popupSelector, deleteHandler }) {
    super(popupSelector);
    this._deleteHandler = deleteHandler;
  }

  /** this function installs click event listener to the yes button of the popup. */
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("click", (evt) => {
      if (evt.target.textContent == "Yes") {
        super.close();
        this._deleteHandler(this._id);
        this._card.remove();
        this._card = null;
      }
    });
  }

  /** this function sets information about the deleted card.
   * @param id - the id of the card to be deleted.
   * @param card - the card element to be deleted.
   */
  setDeleteCard(id, card) {
    this._id = id;
    this._card = card;
  }
}
