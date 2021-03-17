import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";

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

const imagePopup = document.querySelector(".image-popup");
const imagePopupImage = imagePopup.querySelector(".image-popup__image");
const imagePopupTitle = imagePopup.querySelector(".image-popup__title");
const imagePopupCloseBtn = imagePopup.querySelector(".button_type_close");

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

/* закрытие попапа с картинкой */
imagePopupCloseBtn.addEventListener("click", () => closePopup(imagePopup));

const handleCardClick = (title, src) => {
  imagePopupImage.src = src;
  imagePopupTitle.textContent = title;
  openPopup(imagePopup);
};

const createCard = (cardContent) => {
  return new Card(
    {
      title: cardContent.name,
      src: cardContent.link,
    },
    "#card-template",
    handleCardClick
  ).generateCard();
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

const closeOnOverlayClick = (evt, popup) => {
  if (evt.target === popup) {
    closePopup(popup);
  }
};

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

// редактирование профиля
const fillEditForm = () => {
  nameField.value = nameEl.textContent;
  nameField.dispatchEvent(new InputEvent("input"));
  aboutField.value = aboutEl.textContent;
  aboutField.dispatchEvent(new InputEvent("input"));
};

const openEditPopup = () => {
  /* не думаю, что тут есть смысл отчищать форму,
  т.к. fillEditForm() заполянет все поля формы */

  fillEditForm();
  openPopup(editPopup);
};

const closeEditPopup = () => {
  closePopup(editPopup);
};

const submitEditForm = (evt) => {
  evt.preventDefault();
  nameEl.textContent = nameField.value;
  aboutEl.textContent = aboutField.value;
  closeEditPopup();
};

editButton.addEventListener("click", openEditPopup);
closeEditPopupBtn.addEventListener("click", closeEditPopup);
editForm.addEventListener("submit", submitEditForm);

const openAddPopup = () => {
  addForm.reset();
  openPopup(addPopup);
};

const closeAddPopup = () => {
  closePopup(addPopup);
};

const submitAddForm = (evt) => {
  evt.preventDefault();
  cardList.prepend(
    createCard({ name: titleField.value, link: linkField.value })
  );
  closeAddPopup();
};

addButton.addEventListener("click", openAddPopup);
closeAddPopupBtn.addEventListener("click", closeAddPopup);
addForm.addEventListener("submit", submitAddForm);

initialCards.forEach((cardContent) => {
  cardList.append(createCard(cardContent));
});
