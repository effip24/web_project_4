let profileEditButton = document.querySelector('.button_action_edit'); 
let profileName = document.querySelector('.profile__name'); 
let profileOccupation = document.querySelector('.profile__occupation'); 
let profileEditExitButton = document.querySelector('.button_action_close-edit') 
 
let popupEdit = document.querySelector('.popup_type_edit'); 
let popupForm = document.querySelector('.popup__form'); 
let popUpName = document.querySelector('.popup__input_type_name'); 
let popUpOccupation = document.querySelector('.popup__input_type_occupation'); 
 
function openEditPopUp() { 
  popupEdit.setAttribute('class', 'popup popup_type_edit popup_opened'); 
  popUpName.value = profileName.textContent; 
  popUpOccupation.value = profileOccupation.textContent; 
} 
 
function closeEditPopUp() { 
  popupEdit.setAttribute('class', 'popup popup_type_edit'); 
} 
 
function profileEditFormSubmit(evt) { 
  evt.preventDefault(); 
 
  profileName.textContent = popUpName.value; 
  profileOccupation.textContent = popUpOccupation.value; 
  closeEditPopUp(); 
} 
 
profileEditButton.addEventListener('click', openEditPopUp); 
profileEditExitButton.addEventListener('click', closeEditPopUp); 
popupForm.addEventListener('submit', profileEditFormSubmit); 