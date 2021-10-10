import "../pages/index.css";
import {
  formSetting,
  editProfileBtn,
  addPlaceBtn,
  editPopupForm,
  editPopupName,
  editPopupOccupation,
  addPopupForm,
  editAvatarBtn,
  avatarEditPopupForm,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWidthDelete from "../components/PopupWidthDelete.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "8c2c5758-c6d8-42fc-a2ad-abb452a760a2",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  name: ".profile__name",
  occupation: ".profile__occupation",
  avatar: ".profile__avatar",
});

const avatarEditPopup = new PopupWithForm({
  popupSelector: ".popup_window_avatar",
  formSubmitHandler: (input) => {
    avatarEditPopup.renderLoading(true);
    api
      .updateProfilePicture(input.link)
      .then(() => {
        userInfo.setAvatar(input.link);
      })
      .finally(() => {
        avatarEditPopup.renderLoading(false);
      });
  },
});
const editProfilePopup = new PopupWithForm({
  popupSelector: ".popup_window_edit",
  formSubmitHandler: (data) => {
    editProfilePopup.renderLoading(true);
    api
      .saveUserInfo(data.name, data.occupation)
      .then(() => {
        userInfo.setUserInfo(data);
      })
      .finally(() => {
        editProfilePopup.renderLoading(false);
      });
  },
});
const addPlacePopup = new PopupWithForm({
  popupSelector: ".popup_window_add",
  formSubmitHandler: (data) => {
    addPlacePopup.renderLoading(true);
    api
      .saveCard(data.name, data.link)
      .then((result) => {
        addToPlaces.addItem(createCard(result));
      })
      .finally(() => {
        addPlacePopup.renderLoading(false);
      });
  },
});
const deletePlacePopup = new PopupWidthDelete({
  popupSelector: ".popup_window_delete",
  deleteHandler: (id) => {
    api.deleteCard(id);
  },
});

const imagePopup = new PopupWithImage(".popup_window_image");

const avatarEditFormValidator = new FormValidator(formSetting, avatarEditPopupForm);
const editProfileFormValidator = new FormValidator(formSetting, editPopupForm);
const addPlaceFormValidator = new FormValidator(formSetting, addPopupForm);

/** adds a new place to the places list in the DOM */
const addToPlaces = new Section(
  {
    rendere: (item) => {
      addToPlaces.addItem(createCard(item));
    },
  },
  ".places__list"
);

/** this function creates a new card
 * @param data - contains the link and the name of the new card.
 */
const createCard = (data) => {
  const card = new Card(
    data,
    "place",
    userInfo.getUserInfo().id,
    (evt) => {
      imagePopup.open(evt.target);
    },
    (id, card) => {
      deletePlacePopup.open();
      deletePlacePopup.setDeleteCard(id, card);
    },
    (like) => {
      like
        ? api.removeLike(data._id).then((result) => {
            card.updateLikesCounter(result.likes.length);
          })
        : api.addLike(data._id).then((result) => {
            card.updateLikesCounter(result.likes.length);
          });
    }
  );
  const newPlace = card.generateCard();

  return newPlace;
};

/** this function handles the opening of the edit popup. */
const openEditPopUp = () => {
  // once the form opened the input name and the about me are filled with the profile info.
  editPopupName.value = userInfo.getUserInfo().name;
  editPopupOccupation.value = userInfo.getUserInfo().occupation;
};

// initializing user's info from the server.
api.getUserInfo().then((result) => {
  userInfo.setUserInfo({ name: result.name, occupation: result.about, id: result._id });
  userInfo.setAvatar(result.avatar);
});

// inizializing places from the server.
api.getInitialCards().then((result) => {
  result.reverse().forEach((place) => {
    addToPlaces.addItem(createCard(place));
  });
});

// popups listeners.
avatarEditPopup.setEventListeners();
editProfilePopup.setEventListeners();
addPlacePopup.setEventListeners();
deletePlacePopup.setEventListeners();
imagePopup.setEventListeners();

// enable all forms validation.
avatarEditFormValidator.enableValidation();
editProfileFormValidator.enableValidation();
addPlaceFormValidator.enableValidation();

// buttons listeners.
editAvatarBtn.addEventListener("click", () => {
  avatarEditFormValidator.resetFormValidation();
  avatarEditPopup.open();
});

editProfileBtn.addEventListener("click", () => {
  editProfileFormValidator.resetFormValidation();
  openEditPopUp();
  editProfilePopup.open();
});

addPlaceBtn.addEventListener("click", () => {
  addPlaceFormValidator.resetFormValidation();
  addPlacePopup.open();
});
