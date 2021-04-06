export const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const validationConfig = {
  inputSelector: ".form__text-field",
  submitButtonSelector: ".button_type_save",
  inactiveButtonClass: "button_type_save_disabled",
  inputErrorClass: "form__text-field_type_error",
};

export const authToken = "bedcf061-ec3c-4659-8ef2-ecacae078c05";
export const baseUrl = "https://mesto.nomoreparties.co/v1/cohort-22";

export const formElements = Array.from(document.forms);

export const editButton = document.querySelector(".button_type_edit");

export const editForm = document.forms["edit-form"];
export const nameField = editForm.elements["field__name"];
export const aboutField = editForm.elements["field__about"];

export const addButton = document.querySelector(".button_type_add");

export const addForm = document.forms["add-form"];
export const titleField = addForm.elements["field__title"];
export const linkField = addForm.elements["field__link"];
