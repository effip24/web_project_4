const formSetting = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_inactive",
  inputError: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const profile = document.querySelector(".profile");
const editAvatarBtn = profile.querySelector(".profile__avatar-wrap");
const editProfileBtn = profile.querySelector(".profile__edit");
const addPlaceBtn = profile.querySelector(".profile__add");

const avatarEditPopup = document.querySelector(".popup_window_avatar");
const avatarEditPopupForm = avatarEditPopup.querySelector(".popup__form");

const editPopup = document.querySelector(".popup_window_edit");
const editPopupForm = editPopup.querySelector(".popup__form");
const editPopupName = editPopup.querySelector(".popup__input_type_name");
const editPopupOccupation = editPopup.querySelector(".popup__input_type_occupation");

const addPopup = document.querySelector(".popup_window_add");
const addPopupForm = addPopup.querySelector(".popup__form");

export {
  formSetting,
  editProfileBtn,
  addPlaceBtn,
  editPopupForm,
  editPopupName,
  editPopupOccupation,
  addPopupForm,
  editAvatarBtn,
  avatarEditPopupForm,
};
