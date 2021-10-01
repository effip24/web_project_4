export default class Popup {
  /** constructor of Card class
   * @param popupSelector - Css selector of a popup.
   */
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  /** this function opens the popup */
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  /** this function closes the popup */
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  /** stores the logic for closing the popup by pressing the Esc key.
   * @param evt - the key that triggered the event.
   */
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  /** this function adds a click event listener to the close icon of the popup */
  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      /* if the user clicks on closing button */
      if (evt.target.classList.contains("popup__close")) {
        this.close();
      } else if (!evt.target.classList.contains("popup__container") && evt.target.classList.contains("popup")) {
        /* if the user clicks outside the popup container */
        this.close();
      }
    });
  }
}
