
/* profile variables */
const profileName = document.querySelector('.profile__name'); 
const profileOccupation = document.querySelector('.profile__occupation');

/* place variables */
const placesList = document.querySelector('.places__list');
const placeTemplate = document.querySelector('#place').content;
const places = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

/* edit popup variables */
const editPopup = document.querySelector('.popup_window_edit');
const editPopupForm = editPopup.querySelector('.popup__form');
const editPopupName = document.querySelector('.popup__input_type_name'); 
const editPopupOccupation = document.querySelector('.popup__input_type_occupation');

/* add popup variables */
const addPopup = document.querySelector('.popup_window_add');
const addPopupForm = addPopup.querySelector('.popup__form');
const addPopupTitle = document.querySelector('.popup__input_type_title');
const addPopupLink = document.querySelector('.popup__input_type_link');

/* image popup variables */
const imagePopup = document.querySelector('.popup_window_image');
const image = imagePopup.querySelector('.popup__image');
const description = imagePopup.querySelector('.popup__description');

/* Buttons */
const profileEditButton = document.querySelector('.profile__edit'); 
const addPlaceButton = document.querySelector('.profile__add');
const closeButtons = document.querySelectorAll('.popup__close');

/* the current open popup (if there is one)*/
let openedPopUp;

/* this function initializes the cards when the page loads */
function initialPlaces() {
  places.forEach((placeItem) => {
    addPlace(placeItem.name, placeItem.link);
  });
}

/* this function creates a new place 
  parameter placeTitle - contains the name of the new place
  parameter placeLink - contains the link of the new place
*/
function createPlace(placeTitle, placeLink) {
  const place = placeTemplate.querySelector('.place').cloneNode(true);

  place.querySelector('.place__title').textContent = placeTitle;
  place.querySelector(".place__image").src = placeLink;
  place.querySelector(".place__image").alt = "picture of " + placeTitle;
  
  /* setting listeners to the delete, like and image buttons of the new place */
  place.querySelector('.place__delete').addEventListener('click', (evt) => {
    deletePlace(evt);
  });
  place.querySelector('.place__like').addEventListener('click', (evt) => {
    likePlace(evt);
  });
  place.querySelector('.place__image').addEventListener('click', (evt) => {
    imagePopUp(evt);
  });
  return place;
}

/* this function adds a new place to places list */
function addPlace(placeTitle, placeLink) {
  const place = createPlace(placeTitle, placeLink);
  placesList.prepend(place);
}

/* this function deletes a given place from the places list 
  parameter evt - the place to be deleted
*/
function deletePlace(evt) {
  const place = evt.target.closest('.place');
  place.remove();
}

/* this function handles the opening of the edit popup */
function editPopUp() {
  openPopUp(editPopup);
  /* once the form opened the input name and the about me are filled with the profile info */ 
  editPopupName.value = profileName.textContent; 
  editPopupOccupation.value = profileOccupation.textContent;
}

/* this function handles the opening of the add popup */
function addPopUp() {
  openPopUp(addPopup);
  /* removes any previous added data */
  addPopupTitle.value = "";
  addPopupLink.value = "";
}

/* this function handles the opening of the image popup 
  parameter img - contains the image to be displayed
*/
function imagePopUp(img) {
  openPopUp(imagePopup);
  let src = img.target.src;
  let title = img.target.closest('.place').querySelector('.place__title');
  image.src = src;
  description.textContent = title.textContent;
}
 
/* this function a given popup window
parameter popup - the popup to be opened
*/ 
function openPopUp(popup) {
  popup.classList.add('popup_opened');
  openedPopUp = popup;
} 

/* this function closes the the current opened popup box */ 
function closePopUp() {
  openedPopUp.classList.remove('popup_opened');
  openedPopUp = "";
}

/* this function edits the like button 
  when the user presses on the like button if the button is unliked the button changes to black heart theme
  if the button is liked the button changes to emty heart theme
*/
function likePlace(evt) {
  let compStyles = window.getComputedStyle(evt.target);
  let backgroundImageSrc = compStyles.getPropertyValue('background-image');

  /* checking if the place is unliked */
  if(backgroundImageSrc.includes('disabled')) {
    evt.target.classList.remove('place__like_theme_unlike');
    evt.target.classList.add('place__like_theme_like');
  }
  /* if the place is liked */
  else {
    evt.target.classList.remove('place__like_theme_like');
    evt.target.classList.add('place__like_theme_unlike');
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
  evt.preventDefault(); 
  addPlace(addPopupTitle.value, addPopupLink.value);
  closePopUp(); 
}

/* initializing the startup places */
initialPlaces();

/* buttons listeners */
profileEditButton.addEventListener('click', editPopUp);
addPlaceButton.addEventListener('click', addPopUp);
closeButtons.forEach(item => {
  item.addEventListener('click', closePopUp)
});

/* form listeners */
editPopupForm.addEventListener('submit', editFormHnadler);
addPopupForm.addEventListener('submit', addFormHandler);