import "./index.css";

import { Card } from "../scripts/components/Card.js";
import { FormValidator } from "../scripts/utils/FormValidator.js";
import { initialCards } from "../scripts/utils/constants.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";

const pageElement = document.querySelector(".page");
const cardList = document.querySelector(".elements");
const formElements = Array.from(document.forms);
const popups = document.querySelectorAll(".popup");

const addPopup = document.querySelector(".add-popup");
const editPopup = document.querySelector(".edit-popup");
const editButton = document.querySelector(".button_type_edit");
const closeEditPopupBtn = editPopup.querySelector(".button_type_close");
const nameEl = document.querySelector(".profile-info__name");
const aboutEl = document.querySelector(".profile-info__about");

const editForm = document.forms["edit-form"];
const nameField = editForm.elements["field__name"];
const aboutField = editForm.elements["field__about"];

const closeAddPopupBtn = addPopup.querySelector(".button_type_close");
const addButton = document.querySelector(".button_type_add");

const addForm = document.forms["add-form"];
const titleField = addForm.elements["field__title"];
const linkField = addForm.elements["field__link"];

const validationConfig = {
  inputSelector: ".form__text-field",
  submitButtonSelector: ".button_type_save",
  inactiveButtonClass: "button_type_save_disabled",
  inputErrorClass: "form__text-field_type_error",
};

/* валидация форм */
formElements.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});

/* инициализация попапов классами */
const imagePopup = new PopupWithImage(".image-popup");
function handleCardClick(evt, { title, src }) {
  imagePopup.open({ title, src });
}

const addFormPopup = new PopupWithForm(".add-popup", submitAddForm);
addButton.addEventListener("click", addFormPopup.open.bind(addFormPopup));

const editFormPopup = new PopupWithForm(".edit-popup", submitEditForm);
editButton.addEventListener("click", editFormPopup.open.bind(editFormPopup));

const submitAddForm = () => {
  cardList.prepend(
    createCard({ name: titleField.value, link: linkField.value })
  );
};

const createCard = (cardContent) => {
  const cardData = {
    title: cardContent.name,
    src: cardContent.link,
  };

  return new Card(cardData, "#card-template", () => {
    imagePopup.open(cardData);
  }).generateCard();
};

// редактирование профиля
const fillEditForm = () => {
  nameField.value = nameEl.textContent;
  nameField.dispatchEvent(new InputEvent("input"));
  aboutField.value = aboutEl.textContent;
  aboutField.dispatchEvent(new InputEvent("input"));
};

// const openEditPopup = () => {
//   fillEditForm();
//   openPopup(editPopup);
// };

const submitEditForm = (evt) => {
  evt.preventDefault();
  nameEl.textContent = nameField.value;
  aboutEl.textContent = aboutField.value;
  closeEditPopup();
};

editForm.addEventListener("submit", submitEditForm);

initialCards.forEach((cardContent) => {
  cardList.append(createCard(cardContent));
});
