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
const openPopup = (popup) => {
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
  editForm.reset();
  fillEditForm();
  openPopup(editPopup);
};

const submitEditForm = (evt) => {
  evt.preventDefault();
  nameEl.textContent = nameField.value;
  aboutEl.textContent = aboutField.value;
  closePopup(editPopup);
};

const closeEditPopup = () => {
  editForm.reset();
  closePopup(editPopup);
};

editButton.addEventListener("click", openEditPopup);
closeEditPopupBtn.addEventListener("click", closeEditPopup);
editForm.addEventListener("submit", submitEditForm);

// лайк карточки
const handleLike = (evt) => {
  if (evt.target.classList.contains("button_type_like")) {
    evt.target.classList.toggle("button_type_like_active");
  }
};

// создание карточки

const cardTemplate = document.querySelector("#card-template").content;

const createCardElement = (template, title, link, imageAlt = title) => {
  const cardElement = template.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardTitle.textContent = title;
  cardImage.src = link;
  cardImage.alt = imageAlt;

  cardElement.addEventListener("click", handleLike);

  // открытие попапа картинки
  cardImage.addEventListener("click", () => openImagePopup(title, link));

  // удаление карточки
  const deleteButton = cardElement.querySelector(".button_type_delete");
  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
};

// попап с картинкой
const imagePopup = document.querySelector(".image-popup");
const imagePopupCloseBtn = imagePopup.querySelector(".button_type_close");
const imagePopupImg = imagePopup.querySelector(".image-popup__image");
const imagePopupTitle = imagePopup.querySelector(".image-popup__title");

// открытие попапа с картинкой
const openImagePopup = (title, link, imageAlt = title) => {
  imagePopupImg.src = link;
  imagePopupImg.alt = imageAlt;

  imagePopupTitle.textContent = title;

  openPopup(imagePopup);
};

// закрытие попапа с картинкой
imagePopupCloseBtn.addEventListener("click", () => closePopup(imagePopup));

// удаление карточки
const deleteCard = (evt) => {
  const cardToDelete = evt.target.closest("li.card"); // элемент карточки
  cardToDelete.remove();
};

// создание новой карточкиы

const closeAddPopupBtn = addPopup.querySelector(".button_type_close");
const addButton = document.querySelector(".button_type_add");

const addForm = document.forms["add-form"];
const titleField = addForm.elements["field__title"];
const linkField = addForm.elements["field__link"];

const openAddPopup = () => {
  addForm.reset();
  openPopup(addPopup);
};

const closeAddPopup = () => {
  addForm.reset();
  closePopup(addPopup);
};

const submitAddForm = (evt) => {
  evt.preventDefault();
  cardList.prepend(
    createCardElement(cardTemplate, titleField.value, linkField.value)
  );
  closeAddPopup();
};

addButton.addEventListener("click", openAddPopup);
closeAddPopupBtn.addEventListener("click", closeAddPopup);
addForm.addEventListener("submit", submitAddForm);

// начальный набор карточек
initialCards.forEach((cardContent) =>
  cardList.append(
    createCardElement(cardTemplate, cardContent.name, cardContent.link)
  )
);

enableValidation(validationConfig);
