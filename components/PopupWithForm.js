import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  /** constructor of PopupWithForm class
   * @param popupSelector - Css selector of a popup.
   * @param formSubmitHandler - a callback of the form submission.
   */
  constructor({ popupSelector, formSubmitHandler }) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector('.popup__form');
  }

  /** this function collects data from all the input fields. */
  _getInputValues() {
    const inputList = this._popup.querySelectorAll('.popup__input');
    let data = [];
    let obj = {}

    inputList.forEach( (input) => {
      obj[input.name] = input.value;
    });
    data.push(obj);

    return data;
  }

  /** this function adds a submit event listener */
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._formSubmitHandler(this._getInputValues());
      this.close();
    })
  }

  /** this function resets the form once the popup is closed */
  close() {
    super.close();
    this._form.reset();
  }
}