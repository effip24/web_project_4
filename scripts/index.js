/* Buttons */
const profileEditButton = document.querySelector('.profile__edit'); 
const addPlaceButton = document.querySelector('.profile__add');
const deletePlaceButton = document.getElementsByClassName('place__delete');
const closeButton = document.querySelectorAll('.popup__close');
const likeButton = document.getElementsByClassName('place__like');
const imagePlaceButton = document.getElementsByClassName('place__image');

/* popup edit box variables */
const popupEdit = document.querySelector('.popup_window_edit');
const popupEditForm = document.querySelector('.popup__form_type_edit');

/* popup Add box variables */
const popupAdd = document.querySelector('.popup_window_add');
const popupAddForm = document.querySelector('.popup__form_type_add');
const popupImage = document.querySelector('.popup_window_image');

let openedPopUp;

/* this function initializes the cards when the page loads */
function initialPlaces() {
  const cards = [
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
  cards.forEach((placeItem) => {
    addPlace(placeItem.name, placeItem.link);
  });
}

/* this function add a new place to places list 
  parameter placeTitle - contains the name of the new place
  parameter placeLink - contains the link of the new place
*/
function addPlace(placeTitle, placeLink) {
  const placesList = document.querySelector('.places__list');
  const placeTemplate = document.querySelector('#place').content;
  let place = placeTemplate.querySelector('.place').cloneNode(true);
  place.querySelector('.place__title').textContent = placeTitle;
  place.querySelector(".place__image").src = placeLink;
  place.querySelector(".place__image").alt = "picture of " + placeTitle;
  placesList.prepend(place);
}

/* this function delete given place from the places list 
  parameter evt - the place to be deleted
*/
function deletePlace(evt) {
  const place = evt.closest('.place');
  place.remove();
}
 
/* this function opens popup window
  parameter evt - a button, the function checks if it's edit add or imaged pressed
*/ 
function openPopUp(evt) {
  /* checking if the pressed button opens the edit popup */
  if(evt.target.classList.contains('profile__edit')) {
    const popUpEditName = document.querySelector('.popup__input_type_name'); 
    const popUpEditOccupation = document.querySelector('.popup__input_type_occupation');
    const profileName = document.querySelector('.profile__name'); 
    const profileOccupation = document.querySelector('.profile__occupation');
    popupEdit.classList.add('popup_opened');
    /* once the form opened the input name and the about me are filled with the profile info */ 
    popUpEditName.value = profileName.textContent; 
    popUpEditOccupation.value = profileOccupation.textContent;
    openedPopUp = popupEdit;
  }
  /* checking if the pressed button opens the add popup */
  else if(evt.target.classList.contains('profile__add')) {
    popupAdd.classList.add('popup_opened');
    openedPopUp = popupAdd;
  }
  /* opening the image popup */
  else {
    let src = evt.target.src;
    let title = evt.target.closest('.place').querySelector('.place__title');
    let image = document.querySelector('.popup__image');
    let description = document.querySelector('.popup__description');
    image.src = src;
    description.textContent = title.textContent;
    popupImage.classList.add('popup_opened');
    openedPopUp = popupImage;
  }
} 

/* this function closes the edit box popup */ 
function closePopUp() {
  openedPopUp.classList.remove('popup_opened');
  openedPopUp = "";
}

/* this function edits the like button 
  when the user presses on the like button if the button is unliked the button changes to black heart theme
  if the button is liked the button changes to emty heart theme
*/
function like(evt) {
  let compStyles = window.getComputedStyle(evt);
  let backgroundImageSrc = compStyles.getPropertyValue('background-image');

  /* checking if the button is unliked */
  if(backgroundImageSrc.includes('disabled')) {
    console.log("here");
    evt.classList.remove('place__like_theme_unlike');
    evt.classList.add('place__like_theme_like');
  }
  /* if the button liked */
  else {
    evt.classList.remove('place__like_theme_like');
    evt.classList.add('place__like_theme_unlike');
  }
}

/* edit form submit handler */
function editFormHnadler(evt) { 
  evt.preventDefault(); 
  const profileName = document.querySelector('.profile__name'); 
  const profileOccupation = document.querySelector('.profile__occupation');
  const popUpEditName = document.querySelector('.popup__input_type_name'); 
  const popUpEditOccupation = document.querySelector('.popup__input_type_occupation');
  /* once the user click save or enter the new text input of input name and input about me 
  are inserted to the user profile info on the page*/
  profileName.textContent = popUpEditName.value; 
  profileOccupation.textContent = popUpEditOccupation.value; 
  closePopUp(); 
}

/* add form submit handler */
function addFormHandler(evt) {
  evt.preventDefault(); 
  const title = document.querySelector('.popup__input_type_title');
  const link = document.querySelector('.popup__input_type_link');
  addPlace(title.value, link.value);
  closePopUp(); 
}

/* initializing the startup places */
initialPlaces();

/* buttons listeners */
profileEditButton.addEventListener('click', function(evt) {
  openPopUp(evt);
});
addPlaceButton.addEventListener('click', function(evt) {
  openPopUp(evt);
});
closeButton.forEach(item => {
  item.addEventListener('click', closePopUp)
});
Array.from(likeButton).forEach((btn) => {
  btn.addEventListener('click', function() {
    like(btn);
  });
});
Array.from(deletePlaceButton).forEach((btn) => {
  btn.addEventListener('click', function() {
    deletePlace(btn);
  });
});
Array.from(imagePlaceButton).forEach((btn) => {
  btn.addEventListener('click', function(evt) {
    openPopUp(evt);
  });
});

/* form listeners */
popupEditForm.addEventListener('submit', editFormHnadler);
popupAddForm.addEventListener('submit', addFormHandler);