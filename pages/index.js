const pageElement = document.querySelector(".page");
const cardList = document.querySelector(".elements");

const addPopup = document.querySelector(".add-popup");
const editPopup = document.querySelector(".edit-popup");

const popups = document.querySelectorAll(".popup");
Array.from(popups).forEach((popup) => {
  // закрытие попапов по клику на оверлей
  const closeOnOverlayClick = (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  };
  popup.addEventListener("click", closeOnOverlayClick);

  // закрытие попапов по Esc
  const closeOnEsc = (evt) => {
    if (evt.key === "Escape") {
      closePopup(popup);
    }
  };
  document.addEventListener("keydown", closeOnEsc);
});

// очистка полей формы
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  // класс, который убирает прокрутку body при открытом попапе
  pageElement.classList.add("page_no-overflow");
};

const closePopup = (popup) => {
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
  aboutField.value = aboutEl.textContent;
};
fillEditForm();

const openEditPopup = () => {
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

// создание карточки

const cardTemplate = document.querySelector("#card-template").content;

const createCardElement = (template, title, link, imageAlt = title) => {
  const cardElement = template.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardTitle.textContent = title;
  cardImage.src = link;
  cardImage.alt = imageAlt;

  // лайк карточки
  const handleLike = (evt) => {
    if (evt.target.classList.contains("button_type_like")) {
      evt.target.classList.toggle("button_type_like_active");
    }
  };
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
  openPopup(addPopup);
};

const closeAddPopup = () => {
  closePopup(addPopup);
  addForm.reset();
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
const initialCards = [
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

initialCards.forEach((cardContent) =>
  cardList.append(
    createCardElement(cardTemplate, cardContent.name, cardContent.link)
  )
);

enableValidation({
  formSelector: "#add-form",
  inputSelector: ".form__text-field",
  submitButtonSelector: ".button_type_save",
  inactiveButtonClass: "button_type_save_disabled",
});

enableValidation({
  formSelector: "#edit-form",
  inputSelector: ".form__text-field",
  submitButtonSelector: ".button_type_save",
  inactiveButtonClass: "button_type_save_disabled",
});
