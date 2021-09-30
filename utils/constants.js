const formSetting = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputError: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileOccupation = profile.querySelector(".profile__occupation");

const placesList = document.querySelector(".places__list");
const places = [
  {
    title: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    title: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    title: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    title: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    title: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    title: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

const popups = document.querySelectorAll(".popup");

const editPopup = document.querySelector('.popup_window_edit');
const editPopupForm = editPopup.querySelector(".popup__form");
const editPopupName = editPopup.querySelector(".popup__input_type_name");
const editPopupOccupation = editPopup.querySelector(".popup__input_type_occupation");

const addPopup = document.querySelector('.popup_window_add');
const addPopupForm = addPopup.querySelector(".popup__form");
const addPopupTitle = addPopup.querySelector(".popup__input_type_title");
const addPopupLink = addPopup.querySelector(".popup__input_type_link");
const addPopupSubmit = addPopup.querySelector(".popup__submit");

const imagePopup = document.querySelector(".popup_window_image");
const image = imagePopup.querySelector(".popup__image");
const description = imagePopup.querySelector(".popup__description");

export  { 
  formSetting, 
  profile, 
  profileName, 
  profileOccupation, 
  placesList, 
  places, 
  popups,  
  editPopupForm, 
  editPopupName, 
  editPopupOccupation, 
  addPopupForm, 
  addPopupTitle, 
  addPopupLink, 
  addPopupSubmit,
  image, 
  description, 
}