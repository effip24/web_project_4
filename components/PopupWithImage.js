import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  /** constructor of PopupWithImage class.
   * @param popupSelector - Css selector of a popup.
   */
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._description = this._popup.querySelector(".popup__description");
  }

  /** this function opens the popup.
   * @param image - the image to be displayed.
   */
  open(image) {
    super.open();
    this._image.src = image.src;
    this._description.textContent = image.closest(".place").querySelector(".place__title").textContent;
  }
}
