import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";

const pageElement = document.querySelector(".page");
const cardList = document.querySelector(".elements");

const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__text-field",
  submitButtonSelector: ".button_type_save",
  inactiveButtonClass: "button_type_save_disabled",
  inputErrorClass: "form__text-field_type_error",
};

const addPopup = document.querySelector(".add-popup");
const editPopup = document.querySelector(".edit-popup");

const closeOnOverlayClick = (evt, popup) => {
  if (evt.target === popup) {
    closePopup(popup);
  }
};

const popups = document.querySelectorAll(".popup");
Array.from(popups).forEach((popup) => {
  // закрытие попапов по клику на оверлей
  popup.addEventListener("click", (evt) => closeOnOverlayClick(evt, popup));
});

const closeOnEscape = (evt) => {
  const popup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(popup);
  }
};

// очистка полей формы
export const openPopup = (popup) => {
  // закрытие попапов по Esc
  document.addEventListener("keydown", closeOnEscape);

  popup.classList.add("popup_opened");
  // класс, который убирает прокрутку body при открытом попапе
  pageElement.classList.add("page_no-overflow");
};

const closePopup = (popup) => {
  // закрытие попапов по Esc
  document.removeEventListener("keydown", closeOnEscape);

  popup.classList.remove("popup_opened");
  // класс, который убирает прокрутку body при открытом попапе
  pageElement.classList.remove("page_no-overflow");
};

// редактирование профиля
const editButton = document.querySelector(".button_type_edit");
const closeEditPopupBtn = editPopup.querySelector(".button_type_close");
const nameEl = document.querySelector(".profile-info__name");
const aboutEl = document.querySelector(".profile-info__about");

const editForm = document.forms["edit-form"];
const nameField = editForm.elements["field__name"];
const aboutField = editForm.elements["field__about"];

const fillEditForm = () => {
  nameField.value = nameEl.textContent;
  nameField.dispatchEvent(new InputEvent("input"));
  aboutField.value = aboutEl.textContent;
  aboutField.dispatchEvent(new InputEvent("input"));
};

const openEditPopup = () => {
  fillEditForm();
  openPopup(editPopup);
};

const submitEditForm = (evt) => {
  evt.preventDefault();
  nameEl.textContent = nameField.value;
  aboutEl.textContent = aboutField.value;
  closeEditPopup();
};

const closeEditPopup = () => {
  editForm.reset();
  closePopup(editPopup);
};

editButton.addEventListener("click", openEditPopup);
closeEditPopupBtn.addEventListener("click", closeEditPopup);
editForm.addEventListener("submit", submitEditForm);

const closeAddPopupBtn = addPopup.querySelector(".button_type_close");
const addButton = document.querySelector(".button_type_add");

const addForm = document.forms["add-form"];
const titleField = addForm.elements["field__title"];
const linkField = addForm.elements["field__link"];

const openAddPopup = () => {
  openPopup(addPopup);
};

const closeAddPopup = () => {
  addForm.reset();
  closePopup(addPopup);
};

const imagePopup = document.querySelector(".image-popup");
const imagePopupCloseBtn = imagePopup.querySelector(".button_type_close");

// закрытие попапа с картинкой
imagePopupCloseBtn.addEventListener("click", () => closePopup(imagePopup));

const submitAddForm = (evt) => {
  evt.preventDefault();
  const card = new Card(
    "#card-template",
    titleField.value,
    linkField.value,
    imagePopup
  );
  cardList.prepend(card.generateCard());
  closeAddPopup();
};

addButton.addEventListener("click", openAddPopup);
closeAddPopupBtn.addEventListener("click", closeAddPopup);
addForm.addEventListener("submit", submitAddForm);

initialCards.forEach((cardContent) => {
  const card = new Card(
    "#card-template",
    cardContent.name,
    cardContent.link,
    imagePopup
  );
  cardList.append(card.generateCard());
});

const formElements = Array.from(document.forms);

formElements.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});
