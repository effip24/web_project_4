import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';

const cardSelectors = {
  card: 'place',
  list: 'places__list'
}

const formSetting = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputError: "popup__input_type_error",
  errorClass: "popup__input-error_active"
}

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name'); 
const profileOccupation = profile.querySelector('.profile__occupation');

const placesList = document.querySelector('.places__list');
const places = [
  {
    title: "Yosemite Valley",
    src: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    title: "Lake Louise",
    src: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    title: "Bald Mountains",
    src: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    title: "Latemar",
    src: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    title: "Vanoise National Park",
    src: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    title: "Lago di Braies",
    src: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

const popups = document.querySelectorAll('.popup');

const editPopup = document.querySelector('.popup_window_edit');
const editPopupForm = editPopup.querySelector('.popup__form');
const editFormValidator = new FormValidator(formSetting, editPopupForm);
const editPopupName = editPopup.querySelector('.popup__input_type_name'); 
const editPopupOccupation = editPopup.querySelector('.popup__input_type_occupation');

const addPopup = document.querySelector('.popup_window_add');
const addPopupForm = addPopup.querySelector('.popup__form');
const addFromValidator = new FormValidator(formSetting, addPopupForm);
const addPopupTitle = addPopup.querySelector('.popup__input_type_title');
const addPopupLink = addPopup.querySelector('.popup__input_type_link');
const addPopupSubmit = addPopup.querySelector('.popup__submit');

const imagePopup = document.querySelector('.popup_window_image');
const image = imagePopup.querySelector('.popup__image');
const description = imagePopup.querySelector('.popup__description');

let openedPopUp;

/* this function initializes the cards when the page loads. */
function initialPlaces() {
  places.forEach((data) => {
    const card = new Card(data, cardSelectors);
    card.generateCard();
  });
}

/* this function handles the opening of the edit popup. */
function editPopUp() {
  openPopUp(editPopup);
  // once the form opened the input name and the about me are filled with the profile info. 
  editPopupName.value = profileName.textContent; 
  editPopupOccupation.value = profileOccupation.textContent;
}

/* this function handles the opening of the add popup. */
function addPopUp() {
  openPopUp(addPopup);
  // removes any previous added data.
  addPopupTitle.value = "";
  addPopupLink.value = "";
  // disable the submit button (input fieldds are empty).
  addPopupSubmit.classList.add('popup__submit_inactive');
}

/* this function handles the opening of the image popup */
function imagePopUp(img) {
  openPopUp(imagePopup);
  const src = img.target.src;
  const title = img.target.closest('.place').querySelector('.place__title');
  image.src = src;
  description.textContent = title.textContent;
}
 
/* this function opens a given popup window */ 
function openPopUp(popup) {
  addFromValidator.resetFormValidation();
  editFormValidator.resetFormValidation();
  popup.classList.add('popup_opened');
  openedPopUp = popup;
  // setting event listener to Esc key.
  document.addEventListener('keydown', esc);
} 

/* this function closes the current opened popup box */ 
function closePopUp() {
  openedPopUp.classList.remove('popup_opened');
  openedPopUp = "";
  // removing event listener to Esc key.
  document.removeEventListener('keydown', esc);
}

/* this function closes any opened popup if the user pressed "esc" button. */
function esc(evt) {
  // if the pressed key is esc.
  if (evt.key === "Escape") {
      closePopUp();
    }
}

/* edit form submit handler */
function editFormHnadler(evt) { 
  evt.preventDefault(); 

  /* once the user click save or enter the new text input of input name and input about me 
  are inserted to the user profile info on the page*/
  profileName.textContent = editPopupName.value; 
  profileOccupation.textContent = editPopupOccupation.value; 
  closePopUp(); 
}

/* add form submit handler */
function addFormHandler(evt) {
  const data = {
    title: addPopupTitle.value,
    src: addPopupLink.value,
  };
  
  const card = new Card(data, cardSelectors);
  card.generateCard();
  evt.preventDefault();
  
  closePopUp(); 
}

/* initializing the startup places */
initialPlaces();

editFormValidator.enableValidation();
addFromValidator.enableValidation();

/* profile buttons listeners */
profile.addEventListener('click', function(evt){
  if(evt.target.classList.contains('profile__edit'))editPopUp();
  else if(evt.target.classList.contains('profile__add'))addPopUp();
});

/* cards images listeners */
placesList.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('place__image')) imagePopUp(evt);
})

/* popups close buttons listeners */
popups.forEach((popup) => {
  popup.addEventListener('click', function(evt) {
    /* if the user clicks on closing button */
    if(evt.target.classList.contains('popup__close'))
      {
        closePopUp();
      }
    /* if the user clicks outside the popup container */
    else if(!evt.target.classList.contains('popup__container') && evt.target.classList.contains('popup'))
    {
      closePopUp();
    }
  });
});

/* form listeners */
editPopupForm.addEventListener('submit', editFormHnadler);
addPopupForm.addEventListener('submit', addFormHandler);