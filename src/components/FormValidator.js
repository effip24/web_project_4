export default class FormValidator {
  /** constructor of FormValidator class
   * @constructor
   * @param {object} settings - stores selectors and form classes.
   * @param {element} formElement - the form elemnt to be validated.
   */
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputError = settings.inputError;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
    this._inputList = this._formElement.querySelectorAll(this._inputSelector);
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  /** this function starts a form validation. */
  enableValidation() {
    this._setEventListeners();
  }

  /** this function shows an error message.
   * @param inputElement - the input element that has an error.
   */
  _showInputError(inputElement) {
    // getting the errorElement from HTML.
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.add(this._inputError);
    // set the error message to the user.
    errorElement.textContent = inputElement.validationMessage;
    // display the error message to the user.
    errorElement.classList.add(this._errorClass);
  }

  /** this function hides an error message.
   * @param inputElement - the input element that has an error.
   */
  _hideInputError(inputElement) {
    // getting the errorElement from HTML.
    const errorElement = this._getErrorElement(inputElement);
    // removing the error highlight from input
    inputElement.classList.remove(this._inputError);
    // remove the error message to the user.
    errorElement.classList.remove(this._errorClass);
    // clear the error message.
    errorElement.textContent = "";
  }

  /** this function returns an error element which an error message will be displayed in.
   * @param inputElement - the input element that has an error.
   */
  _getErrorElement(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    return errorElement;
  }

  /** this function checks if a given input field is valid.
   * @param inputElement - the input to be checked.
   */
  _isValid(inputElement) {
    // checking if the current input is now invalid.
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  /** this function checks a list of input fields.
   * @param inputList - the list of input fields to be checked.
   */
  _hasInvalidInput() {
    return Array.from(this._inputList).some((input) => {
      //if at least one element has invalid input function returns true
      return !input.validity.valid;
    });
  }

  /** this function enables or disables a form's buttons according to the validity of the form's input fields. */
  _toggleButtonState() {
    // if one of the form's input field is invalid.
    if (this._hasInvalidInput()) {
      // setting the button to be inactive.
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      // all the field of the given form are valid, the button is active.
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  /* this function installs input event listeners to the form. */
  _setEventListeners() {
    // iterating through inputList
    this._inputList.forEach((inputElement) => {
      // setting input listener to each input field in inputList
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  }

  /* this function resets the input fields of the form. */
  resetFormValidation() {
    // iterating through the list.
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      // reseting the submit button of the given form.
      this._buttonElement.classList.add(this._inactiveButtonClass);
    });
  }
}
