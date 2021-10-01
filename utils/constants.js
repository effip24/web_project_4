const formSetting = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputError: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const profile = document.querySelector(".profile");
const editProfileBtn = profile.querySelector(".profile__edit");
const addPlaceBtn = profile.querySelector(".profile__add");

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

const editPopup = document.querySelector(".popup_window_edit");
const editPopupForm = editPopup.querySelector(".popup__form");
const editPopupName = editPopup.querySelector(".popup__input_type_name");
const editPopupOccupation = editPopup.querySelector(".popup__input_type_occupation");

const addPopup = document.querySelector(".popup_window_add");
const addPopupForm = addPopup.querySelector(".popup__form");
const addPopupSubmit = addPopup.querySelector(".popup__submit");

export {
  formSetting,
  editProfileBtn,
  addPlaceBtn,
  places,
  editPopupForm,
  editPopupName,
  editPopupOccupation,
  addPopupForm,
  addPopupSubmit,
};
