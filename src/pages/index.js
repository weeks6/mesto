import "./index.css";

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/utils/FormValidator.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/utils/Api.js";
import {
  initialCards,
  validationConfig,
  formElements,
  aboutField,
  addButton,
  editButton,
  editForm,
  linkField,
  nameField,
  titleField,
  baseUrl,
  authToken,
} from "../scripts/utils/constants.js";

/* валидация форм */
formElements.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});

const imagePopup = new PopupWithImage(".image-popup");

const createCard = ({ name, link, likes }) => {
  const cardData = {
    title: name,
    src: link,
    likes: likes,
  };

  return new Card(cardData, "#card-template", () => {
    imagePopup.open(cardData);
  }).generateCard();
};

const api = new Api({
  baseUrl,
  headers: {
    authorization: authToken,
    "Content-Type": "application/json",
  },
});

const cardList = new Section(
  {
    items: [],
    renderer: (item) => cardList.addItem(createCard(item)),
  },
  ".elements"
);

api.getInitialCards().then((cards) => {
  cards.forEach((card) => cardList.addItem(createCard(card)));
});

/* инициализация попапов */
const submitAddForm = () => {
  api
    .createCard({ name: titleField.value, link: linkField.value })
    .then((card) => {
      cardList.addItem(createCard(card));
    });
};
const addFormPopup = new PopupWithForm(".add-popup", submitAddForm);
addButton.addEventListener("click", addFormPopup.open);

// setup user info
const userInfo = new UserInfo({
  nameSelector: ".profile-info__name",
  aboutSelector: ".profile-info__about",
  imageSelector: ".avatar",
});

api.getUserInfo().then((data) => {
  userInfo.setUserInfo({
    name: data.name,
    about: data.about,
    src: data.avatar,
  });
});

const submitEditForm = () => {
  const nameField = editForm.elements["field__name"];
  const aboutField = editForm.elements["field__about"];

  api.updateUserInfo(nameField.value, aboutField.value).then((user) => {
    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
    });
  });
};

const openEditPopup = () => {
  const editFormData = userInfo.getUserInfo();
  editFormPopup.open();
  nameField.value = editFormData.name;
  nameField.dispatchEvent(new InputEvent("input"));
  aboutField.value = editFormData.about;
  aboutField.dispatchEvent(new InputEvent("input"));
};
const editFormPopup = new PopupWithForm(".edit-popup", submitEditForm);
editButton.addEventListener("click", openEditPopup);
