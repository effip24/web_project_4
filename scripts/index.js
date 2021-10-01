import "../pages/index.css";
import {
  formSetting,
  editProfileBtn,
  addPlaceBtn,
  places,
  editPopupForm,
  editPopupName,
  editPopupOccupation,
  addPopupForm,
  addPopupSubmit,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import FormValidator from "../components/FormValidator.js";

const userInfo = new UserInfo({
  name: ".profile__name",
  occupation: ".profile__occupation",
});

const editPopup = new PopupWithForm({
  popupSelector: ".popup_window_edit",
  formSubmitHandler: (data) => {
    userInfo.setUserInfo(data);
  },
});

const addPopup = new PopupWithForm({
  popupSelector: ".popup_window_add",
  formSubmitHandler: (data) => {
    defalutPlaces.addItem(createCard(data));
  },
});
const imagePopup = new PopupWithImage(".popup_window_image");

const editFormValidator = new FormValidator(formSetting, editPopupForm);
const addFromValidator = new FormValidator(formSetting, addPopupForm);

/** this function initializes the default places when the page loads. */
const defalutPlaces = new Section(
  {
    items: places,
    renderer: (item) => {
      defalutPlaces.addItem(createCard(item));
    },
  },
  ".places__list"
);

/** this function creates a new card
 * @param data - contains the link and the name of the new card.
 */
const createCard = (data) => {
  const card = new Card(data, "place", (evt) => {
    imagePopup.open(evt.target);
  });
  const newPlace = card.generateCard();

  return newPlace;
};

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

defalutPlaces.renderItems();

// popups listeners
editPopup.setEventListeners();
addPopup.setEventListeners();
imagePopup.setEventListeners();

editFormValidator.enableValidation();
addFromValidator.enableValidation();

editProfileBtn.addEventListener("click", () => {
  editFormValidator.resetFormValidation();
  openEditPopUp();
  editPopup.open();
});

addPlaceBtn.addEventListener("click", () => {
  addFromValidator.resetFormValidation();
  openAddPopUp();
  addPopup.open();
});
