/* profile block variables */ 
let profileEditButton = document.querySelector('.button_action_edit'); 
let profileName = document.querySelector('.profile__name'); 
let profileOccupation = document.querySelector('.profile__occupation'); 
let profileEditExitButton = document.querySelector('.button_action_close-edit') 
/* popup edit box variables */
let popupEdit = document.querySelector('.popup'); 
let popupForm = document.querySelector('.popup__form'); 
let popUpName = document.querySelector('.popup__input_type_name'); 
let popUpOccupation = document.querySelector('.popup__input_type_occupation'); 
 
/* this function opens the edit popup */ 
function openEditPopUp() { 
  popupEdit.setAttribute('class', 'popup popup_window_edit popup_opened');
  /* once the form opened the input name and the about me are filled with the profile info */ 
  popUpName.value = profileName.textContent; 
  popUpOccupation.value = profileOccupation.textContent; 
} 

/* this function closes the edit box popup */ 
function closeEditPopUp() { 
  popupEdit.setAttribute('class', 'popup popup_window_edit'); 
} 

/* form submit handler function */
function profileEditFormSubmit(evt) { 
  evt.preventDefault(); 
  
  /* once the user click save or enter the new text input of input name and input about me 
  are inserted to the user profile info on the page*/
  profileName.textContent = popUpName.value; 
  profileOccupation.textContent = popUpOccupation.value; 
  closeEditPopUp(); 
} 
 
profileEditButton.addEventListener('click', openEditPopUp); 
profileEditExitButton.addEventListener('click', closeEditPopUp); 
popupForm.addEventListener('submit', profileEditFormSubmit); 