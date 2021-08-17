
let profileEditButton = document.querySelector('.button_action_edit');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');
let profileEditExitButton = document.querySelector('.button_action_close-edit')

let popupEdit = document.querySelector('.popup_type_edit');
let popupForm = document.querySelector('.popup__form');
let popUpName = document.querySelector('.popup__input_type_name');
let popUpOccupation = document.querySelector('.popup__input_type_occupation');

function togglePopUpEdit() {
  if(popupEdit.classList.contains("popup_opened"))
  {
    popupEdit.setAttribute('class', 'popup popup_type_edit');
  }
  else{
    popupEdit.setAttribute('class', 'popup popup_type_edit popup_opened');
    popUpName.value = profileName.textContent;
    popUpOccupation.value = profileOccupation.textContent;
  }
}

function profileEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = popUpName.value;
  profileOccupation.textContent = popUpOccupation.value;
  togglePopUpEdit();
}

profileEditButton.addEventListener('click', togglePopUpEdit);
profileEditExitButton.addEventListener('click', togglePopUpEdit);
popupForm.addEventListener('submit', profileEditFormSubmit);