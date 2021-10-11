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

const userInfoPromise = api.getUserInfo();
const initialCardsPromise = api.getInitialCards();

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
        avatarEditPopup.close();
      })
      .catch((err) => {
        console.log(`There was a problem updating the avatar ${err}`);
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
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(`There was a problem updating profile information ${err}`);
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
        addPlacePopup.close();
      })
      .catch((err) => {
        console.log(`There was a problem adding this place ${err}`);
      })
      .finally(() => {
        addPlacePopup.renderLoading(false);
      });
  },
});
const deletePlacePopup = new PopupWidthDelete({
  popupSelector: ".popup_window_delete",
  deleteHandler: (id, card) => {
    api
      .deleteCard(id)
      .then(() => {
        card.remove();
        card = null;
        deletePlacePopup.close();
      })
      .catch((err) => {
        console.log(`There was a problem deleteing this place ${err}`);
      });
  },
});

const imagePopup = new PopupWithImage(".popup_window_image");

const avatarEditFormValidator = new FormValidator(formSetting, avatarEditPopupForm);
const editProfileFormValidator = new FormValidator(formSetting, editPopupForm);
const addPlaceFormValidator = new FormValidator(formSetting, addPopupForm);

/** adds a new place to the places list in the DOM. */
const addToPlaces = new Section(
  {
    renderer: (item) => {
      addToPlaces.addItem(createCard(item));
    },
  },
  ".places__list"
);

/** this function creates a new card.
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
    (like, evt) => {
      !like
        ? api
            .removeLike(data._id)
            .then((result) => {
              card.updateLikes(result.likes.length, evt);
            })
            .catch((err) => {
              console.log(`There was a problem removing the like ${err}`);
            })
        : api
            .addLike(data._id)
            .then((result) => {
              card.updateLikes(result.likes.length, evt);
            })
            .catch((err) => {
              console.log(`There was a problem adding the like ${err}`);
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

// initializing user's info and places from the server.
Promise.all([userInfoPromise, initialCardsPromise])
  .then((result) => {
    userInfo.setUserInfo({ name: result[0].name, occupation: result[0].about, id: result[0]._id });
    userInfo.setAvatar(result[0].avatar);

    addToPlaces.renderItems(result[1]);
  })
  .catch((err) => {
    console.log(`failed to load data from the server ${err}`);
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
