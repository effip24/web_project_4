import "../pages/index.css";
import {

  formSetting,
  profile,
  places,
  editPopupForm,
  editPopupName,
  editPopupOccupation,
  addPopupForm,
  addPopupSubmit

} from '../utils/constants.js';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";

const userInfo = new UserInfo({
  name: '.profile__name',
  occupation: '.profile__occupation'
});

const editPopup = new Popup('.popup_window_edit');
const addPopup = new Popup('.popup_window_add');
const imagePopup = new PopupWithImage('.popup_window_image');

const editFormValidator = new FormValidator(formSetting, editPopupForm);
const addFromValidator = new FormValidator(formSetting, addPopupForm);

/** this function initializes the default places when the page loads. */
const defalutPlaces = new Section({
  items: places,
  renderer: (item) => {
    const card = new Card(item, 'place', (evt) => {
      if (evt.target.classList.contains("place__delete")) {
        card._deleteCard();
      } else if (evt.target.classList.contains("place__like")) {
        card._toggleLikeCard(evt);
      } else if (evt.target.classList.contains("place__image")) {
        imagePopup.open(evt.target);
      }
    });
    const newPlace = card.generateCard();
    defalutPlaces.addItem(newPlace);
  }
}, '.places__list');
defalutPlaces.renderItems();

/** this function handles the opening of the edit popup. */
const openEditPopUp = () => {
  // once the form opened the input name and the about me are filled with the profile info.
  editPopupName.value = userInfo.getUserInfo().name;
  editPopupOccupation.value = userInfo.getUserInfo().occupation;
};

/** this function handles the opening of the add popup. */
const openAddPopUp = () => {
  // disable the submit button (input fields are empty).
  addPopupSubmit.classList.add("popup__submit_inactive");
};

const editFormHandler = new PopupWithForm({
  popupSelector: '.popup_window_edit',
  formSubmitHandler: (data) => {
    userInfo.setUserInfo(data[0]);
  }
});

const addFormHandler = new PopupWithForm({
  popupSelector: '.popup_window_add',
  formSubmitHandler: (data) => {
    const place = new Section({
      items: data,
      renderer: (item) => {
        const card = new Card(item, 'place', (evt) => {
          if (evt.target.classList.contains("place__delete")) {
            card._deleteCard();
          } else if (evt.target.classList.contains("place__like")) {
            card._toggleLikeCard(evt);
          } else if (evt.target.classList.contains("place__image")) {
            imagePopup.open(evt.target);
          }
        });
        const newPlace = card.generateCard();
        place.addItem(newPlace);
      }
    }, '.places__list');
    place.renderItems();
  }
});

// popups listeners
editPopup.setEventListeners();
addPopup.setEventListeners();
imagePopup.setEventListeners();

editFormValidator.enableValidation();
addFromValidator.enableValidation();

// profile buttons listeners
profile.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("profile__edit")) {
    editFormValidator.resetFormValidation();
    openEditPopUp();
    editPopup.open();
  } else if (evt.target.classList.contains("profile__add")) {
    addFromValidator.resetFormValidation();
    openAddPopUp();
    addPopup.open();
  }
});

// form listeners
editFormHandler.setEventListeners();
addFormHandler.setEventListeners();
