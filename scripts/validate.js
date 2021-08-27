/* this function shows the error element in order to notify the user. 
parameter formElement - used to get the errorElement from the html file.
parameter inputElement - used to get the errorElement id. 
parameter errorMessage - the error message to be displayed to the user.
parameter settings - object contains all classes for querySelectors.
*/
function showInputError(formElement, inputElement, errorMessage, settings) {
  // getting the errorElement from HTML.
  const errorElement = getErrorElement(formElement, inputElement);
  inputElement.classList.add(settings.inputError);
  // set the error message to the user.
  errorElement.textContent = errorMessage;
  // display the error message to the user.
  errorElement.classList.add(settings.errorClass);
}

/* this function hides the error element if the input is valid. 
parameter formElement - used to get the errorElement from the html file.
parameter inputElement - used to get the errorElement id.
parameter settings - object contains all the necessary classes.
*/
function hideInputError(formElement, inputElement, settings) {
  // getting the errorElement from HTML.
  const errorElement = getErrorElement(formElement, inputElement);
   // remove the error message to the user.
   errorElement.classList.remove(settings.errorClass);
   // clear the error message.
   errorElement.textContent = "";
}

/* this function returns an error element which the error will be displayed in
parameter formElement - the form which the error element nested in.
parameter inputElement - the input field that has an error.
*/
function getErrorElement(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  return errorElement;
}

/* this function checks if a given input field is valid then calls showInputError or hideInputError. 
parameter formElement - the form to be passed to showInputError or hideInputError.
parameter inputElement - the input field to be checked and be passed to showInputError or hideInputError.
parameter settings - object contains all the necessary classes.
*/
function isValid(formElement, inputElement, settings) {
  // checking if the current input is now invalid.
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } 
  else {
    hideInputError(formElement, inputElement, settings);
  }
}

/* this function checks a list of input fields, if the list contains invalid input the function returns true.
parameter inputList - the list of input field to be checked.
*/
function hasInvalidInput(inputList) {
  let invalid = false;
  // iterating through the list of input.
   inputList.forEach((inputElement) => {
     // if an input is invalid
     if(!inputElement.validity.valid) invalid = true;
   })
   return invalid;
}

/* this function sets a button of a form to be active if both field of the for has valid input
   or in active if one of it's fields invalid.
parameter inputList - list of a form input fields to be checked, passed to hasInvalidInput function.
parameter buttonElement - a button to set active of inactive.
parameter settings - object contains all the necessary classes.
*/
function toggleButtonState(inputList, buttonElement, settings) {
  // if one of the form's input field is invalid.
  if(hasInvalidInput(inputList)) {
    // setting the button to be inactive.
    buttonElement.classList.add(settings.inactiveButtonClass);
  }
  else {
    // all the field of the given form are valid, the button is active.
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}

/* this function sets evenListeners to a given form's input fields 
parameter formElement - the form to set the listeners.
parameter settings - object contains all the necessary classes.
*/
function setEventListeners(formElement, settings) {
   /* a list of input field inside formElement */
  const inputList = formElement.querySelectorAll(settings.inputSelector);
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  /* iterating through inputList */
  inputList.forEach((inputElement) => {
    /* setting input listener to each input field in inputList */
    inputElement.addEventListener("input", function(){
      isValid(formElement, inputElement, settings)
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

/* this function will process all of our forms with the popup__form class. 
parameter settings - object contains all the necessary classes.
*/
function enableValidation(settings) {
  // contains all the forms.
  const forms = document.querySelectorAll(settings.formSelector);
  // iterating through the forms to set liseners to all the input fields.
  forms.forEach(formElement => {
    setEventListeners(formElement, settings);
  })
}

/* this function resets all input fields error messages in a given form
parameter form - the form to reset the error message in.
*/
export default function resetFormValidation(form) {
  // contains a list of input fields of a from.
  const inputList = form.querySelectorAll('.popup__input');
  // iterating through the list.
  inputList.forEach((inputElement => {
    // the error element of a given input field.
    const errorElement = getErrorElement(form, inputElement);
    inputElement.classList.remove('popup__input_type_error')
    // removing the current error message.
    errorElement.textContent = '';
  }));
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputError: "popup__input_type_error",
  errorClass: "popup__input-error_active"
}); 