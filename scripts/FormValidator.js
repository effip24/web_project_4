export default class FormValidator {

  /* constructor of FormValidator class */
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputError = settings.inputError;
    this._errorClass = settings.errorClass;
    this._formElement = formElement;
  }

  /* this function starts a form validation. */
  enableValidation() {
    this._setEventListeners();
  } 

  /* this function shows an input error message. */
  _showInputError(inputElement) {
    // getting the errorElement from HTML.
    const errorElement = this._getErrorElement(inputElement);
    inputElement.classList.add(this._inputError);
    // set the error message to the user.
    errorElement.textContent = inputElement.validationMessage;
    // display the error message to the user.
    errorElement.classList.add(this._errorClass);
  }

  /* this function hides an input error message. */
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

  /* this function returns an error element which an error message will be displayed in */
  _getErrorElement(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    return errorElement;
  }

  /* this function checks if a given input field is valid */
  _isValid(inputElement) {
    // checking if the current input is now invalid.
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  /* this function checks a list of input fields */
  _hasInvalidInput(inputList) {
    let invalid = false;
    // iterating through the list of input.
    inputList.forEach((inputElement) => {
      // if an input is invalid
      if (!inputElement.validity.valid) invalid = true;
    })
    return invalid;
  }

  /* this function enables or disables a form's buttons according to the validity of the form's input fields */
  _toggleButtonState(inputList, buttonElement) {
    // if one of the form's input field is invalid.
    if (this._hasInvalidInput(inputList)) {
      // setting the button to be inactive.
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      // all the field of the given form are valid, the button is active.
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  /* this function installs input event listeners to the form */
  _setEventListeners() {
    // a list of input field inside formElement 
    const inputList = this._formElement.querySelectorAll(this._inputSelector);
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    // iterating through inputList 
    inputList.forEach((inputElement) => {
      // setting input listener to each input field in inputList
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  /* this function resets the input fields of the form  */
  resetFormValidation() {
    // contains a list of input fields of a from.
    const inputList = this._formElement.querySelectorAll('.popup__input');
    // the submit button of the given form.
    const submit = this._formElement.querySelector('.popup__submit');
    // iterating through the list.
    inputList.forEach((inputElement => {
      // the error element of a given input field.
      const errorElement = this._getErrorElement(inputElement);
      inputElement.classList.remove('popup__input_type_error')
      // removing the current error message.
      errorElement.textContent = '';
      // reseting the submit button of the given form.
      submit.classList.add('popup__submit_inactive');
    }));
  }
}